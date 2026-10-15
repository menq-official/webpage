import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { DocumentTitle } from "@/components/seo/DocumentTitle";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

// The proxy rewrites every unknown path under a locale here with HTTP 404 (src/proxy.ts).
// A not-found.tsx boundary cannot do it on its own: beside the root layout it is not used,
// and under a loading.tsx the 404 arrived as a 200 (QA F13).
const copy: Record<Locale, { title: string; home: string }> = {
  hy: { title: "Էջը չի գտնվել", home: "Գլխավոր էջ" },
  en: { title: "Page not found", home: "Home" },
  ru: { title: "Страница не найдена", home: "Главная" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  return {
    title: { absolute: `${copy[locale].title} | MenQ` },
    robots: { index: false, follow: false },
  };
}

export default async function PageNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = copy[locale];
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-page px-page-x text-center">
      {/* A 404 served through the proxy rewrite does not get generateMetadata's title, so the
          page sets it itself; React hoists <title> into <head>. */}
      <title>{`${t.title} | MenQ`}</title>
      <DocumentTitle title={`${t.title} | MenQ`} />
      <p className="font-display text-6xl font-bold text-content-muted">404</p>
      <h1 className="font-display text-2xl font-bold text-content-primary">{t.title}</h1>
      <ButtonLink href={`/${locale}`} size="lg">
        {t.home}
      </ButtonLink>
    </main>
  );
}
