import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/locales/types";

/** Typical problems and how we solve them (examples, not client case studies). */
export function Examples({ dict }: { dict: Dictionary }) {
  const ex = dict.examples;
  return (
    <Section id={site.anchors.examples} labelledBy="examples-title" variant="muted" spacing="lg">
      <Container>
        <SectionHead id="examples-title" eyebrow={ex.eyebrow} title={ex.title} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {ex.items.map((item, i) => (
            <Reveal key={item.tag} delay={(i + 1) * 70}>
              <Card interactive className="flex h-full flex-col gap-4 p-7">
                <span className="self-start rounded-pill bg-selected px-3 py-1 text-sm font-semibold text-accent-text">{item.tag}</span>
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-content-muted">{ex.problemLabel}</h3>
                  <p className="text-lg font-semibold text-content-primary">{item.problem}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-content-muted">{ex.solutionLabel}</h3>
                  <p className="text-content-secondary">{item.solution}</p>
                </div>
                <p className="mt-auto flex items-center gap-2 border-t border-edge-subtle pt-3.5 font-semibold text-state-success-text">
                  <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden="true" />
                  {item.outcome}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
