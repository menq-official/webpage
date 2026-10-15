import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { AnalyticsEvent } from "@/lib/analytics/analytics";
import { AgentConsole } from "./AgentConsole";
import { site } from "@/config/site";
import { getSectionData } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

/** Load sequence: each hero line rises in after the previous one. */
function rise(step: number): CSSProperties {
  return { "--rise-delay": `calc(var(--motion-stagger) * ${step})` } as CSSProperties;
}

export async function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const hero = await getSectionData("hero", locale, dict.hero);
  return (
    <Section id={site.anchors.top} labelledBy="hero-title" variant="contrast" spacing="sm" className="overflow-hidden pb-0 pt-section-sm lg:pt-section-md">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div className="mask-hero-grid pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
          <div className="flex flex-col items-start gap-6">
            <span className="animate-rise-fade glass inline-flex items-center gap-2 rounded-pill border-edge-strong px-4 py-2 text-sm text-content-secondary" style={rise(0)}>
              <span className="live-dot" aria-hidden="true" />
              {hero.eyebrow}
            </span>
            {/* Transform only: the largest paint of the page is never hidden. */}
            <h1 id="hero-title" className="animate-rise text-balance font-display text-4xl font-bold leading-tight tracking-tightest sm:text-5xl xl:text-6xl" style={rise(1)}>
              {hero.title} <span className="text-gradient-accent">{hero.titleAccent}</span>
            </h1>
            <p className="animate-rise-fade max-w-xl text-lg leading-relaxed text-content-secondary sm:text-xl" style={rise(2)}>{hero.subtitle}</p>
            <div className="animate-rise-fade flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap" style={rise(3)}>
              <TrackedLink href={`#${site.anchors.contact}`} className={buttonClasses("primary", "lg")} event={AnalyticsEvent.ctaClick} eventProps={{ location: "hero", cta: "primary" }}>
                {hero.primaryCta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink href={`#${site.anchors.how}`} className={buttonClasses("outline", "lg")} event={AnalyticsEvent.ctaClick} eventProps={{ location: "hero", cta: "secondary" }}>
                {hero.secondaryCta}
              </TrackedLink>
            </div>
            <ul className="animate-rise-fade flex flex-wrap gap-x-5 gap-y-2 text-sm text-content-muted" style={rise(4)}>
              {hero.trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-pill bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise-fade w-full" style={rise(3)}>
            <AgentConsole console={hero.console} />
          </div>
        </div>
      </Container>
      <div className="relative border-t border-edge-subtle">
        <Container>
          <dl className="grid gap-5 py-8 sm:grid-cols-3 sm:gap-6 lg:pb-10">
            {hero.facts.map((fact) => (
              <div key={fact.value} className="flex flex-col gap-1">
                <dt className="text-gradient-accent font-display text-2xl font-bold tracking-tightest">{fact.value}</dt>
                <dd className="text-content-secondary">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </Section>
  );
}
