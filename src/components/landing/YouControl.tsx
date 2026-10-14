import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { controlIcons } from "@/config/icons";
import type { Dictionary } from "@/content/locales/types";

/** "You are in charge": the human-approval promise, stated plainly. */
export function YouControl({ dict }: { dict: Dictionary }) {
  const control = dict.control;
  return (
    <Section variant="spotlight" spacing="lg" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading eyebrow={control.eyebrow} title={control.title} description={control.description} />

        <Reveal className="mt-10">
          <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
            {control.flow.map((step, i) => (
              <li key={step} className="flex items-center justify-center gap-2 sm:contents">
                <span className={i === 1 ? "approve-pulse rounded-pill bg-action-primary px-4 py-2 text-sm font-semibold text-content-inverse" : "rounded-pill border border-edge-strong bg-surface-primary px-4 py-2 text-sm font-semibold text-content-primary"}>
                  {step}
                </span>
                {i < control.flow.length - 1 ? (
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-accent sm:block" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {control.points.map((point, i) => {
            const Icon = controlIcons[i] ?? controlIcons[0];
            return (
              <Reveal key={point.title} delay={i * 70}>
                <div className="premium-card h-full rounded-card border border-edge-subtle bg-surface-primary p-6">
                  <IconWrap icon={Icon} variant="accent" />
                  <h3 className="mt-5 text-lg font-semibold text-content-primary">{point.title}</h3>
                  <p className="mt-2 leading-relaxed text-content-secondary">{point.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-10 text-center">
          <p className="font-display text-2xl font-bold text-gradient-accent sm:text-3xl">{control.closing}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
