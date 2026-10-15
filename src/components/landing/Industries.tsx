import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Lead } from "./SectionHead";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/locales/types";

/** Who we work with: teams with a process worth improving, and example areas. Dark in both themes. */
export function Industries({ dict }: { dict: Dictionary }) {
  const { industries } = dict;
  return (
    <Section id={site.anchors.industries} labelledBy="industries-title" variant="spotlight" spacing="lg" className="overflow-hidden">
      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 id="industries-title" className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-content-primary sm:text-4xl lg:text-5xl">
              {industries.title}
            </h2>
            <Lead>{industries.body}</Lead>
          </Reveal>
          <Reveal delay={140} className="flex flex-col gap-3.5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-text">{industries.areasLabel}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {industries.items.map((item) => (
                <li key={item} className="rounded-pill border border-edge-strong bg-surface-primary px-4 py-2 text-content-primary">{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
