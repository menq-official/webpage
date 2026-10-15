import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { navItems } from "@/config/navigation";
import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { contact } from "@/config/contact";
import { socialIconPaths } from "@/components/brand/socialIcons";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

export function Footer({
  dict,
  locale,
  year,
}: {
  dict: Dictionary;
  locale: Locale;
  year: number;
}) {
  return (
    <footer className="section-contrast border-t border-edge-subtle">
      <Container className="py-section-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr]">
          {/* Brand + slogan */}
          <div className="flex flex-col gap-4">
            <a
              href={`/${locale}#${site.anchors.top}`}
              className="self-start rounded-pill text-content-primary"
            >
              <BrandMark />
            </a>
            <p className="max-w-xs leading-relaxed text-content-secondary">
              {dict.footer.slogan}
            </p>
            <LanguageSwitcher
              current={locale}
              label={dict.common.languageLabel}
              className="self-start"
            />
          </div>

          {/* Explore */}
          <nav aria-label={dict.footer.exploreTitle} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
              {dict.footer.exploreTitle}
            </h2>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`/${locale}#${item.anchor}`}
                className="text-content-secondary transition-colors duration-base ease-standard hover:text-accent"
              >
                {dict.nav[item.key]}
              </a>
            ))}
          </nav>

          {/* Contact + socials */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-content-muted">
              {dict.footer.contactTitle}
            </h2>
            <a href={contact.phone.href} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
              {contact.phone.label}
            </a>
            {contact.email ? (
              <a href={contact.email.href} className="text-content-secondary transition-colors duration-base ease-standard hover:text-content-primary">
                {contact.email.label}
              </a>
            ) : null}
            <div className="mt-1 flex flex-wrap gap-2">
              {contact.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-edge-subtle text-content-secondary transition duration-base ease-standard hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {socialIconPaths[social.id] ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
                      <path d={socialIconPaths[social.id]} />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium">{social.label}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-edge-subtle pt-6 text-sm text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {dict.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${locale}/privacy`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.privacy}
            </a>
            <a
              href={`/${locale}/terms`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.terms}
            </a>
            <a
              href={`/${locale}/cookies`}
              className="transition-colors duration-base ease-standard hover:text-content-primary"
            >
              {dict.footer.legal.cookies}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
