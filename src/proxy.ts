import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { SESSION_COOKIE } from "@/lib/auth/cookies";

const LOCALE_COOKIE = "menq-locale";

// Every page under /{locale}/ (the part after the locale; "" is the home page).
const KNOWN_PAGES = new Set(["", "privacy", "terms", "cookies"]);

// Admin routes reachable WITHOUT a session (login/reset/invite flows).
const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/accept-invite",
  "/admin/forgot",
  "/admin/reset",
  "/admin/forbidden",
];

function detectLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  const header = req.headers.get("accept-language");
  if (header) {
    const requested = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "");
    for (const lang of requested) {
      const base = lang.split("-")[0];
      const match = locales.find((l) => l === base);
      if (match) return match;
    }
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin gate (defense-in-depth; real authz stays server-side per page/action).
  // No DB here — just a fast session-cookie presence check on the edge.
  if (pathname.startsWith("/admin")) {
    const isPublic = PUBLIC_ADMIN_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );
    if (!isPublic && !req.cookies.get(SESSION_COOKIE)) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const pathLocale = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (pathLocale) {
    // A real 404 for any path the site does not have (QA F13): the localized page, with
    // the status a crawler needs. Everything here is static, so the list is complete.
    const rest = pathname.slice(`/${pathLocale}/`.length).replace(/\/+$/, "");
    if (KNOWN_PAGES.has(rest) || rest.startsWith("opengraph-image")) {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = `/${pathLocale}/page-not-found`;
    return NextResponse.rewrite(url, { status: 404 });
  }

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  // Run on everything except API, Next internals, and files with an extension.
  // `/admin/*` IS included now (for the session gate) but is never
  // locale-redirected — handled explicitly above.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
