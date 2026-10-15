import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/locales/types";

/** Illustrative use cases: possible approaches, not client case studies or promised results. */
export function Examples({ dict }: { dict: Dictionary }) {
  const ex = dict.examples;
  return (
    <Section id={site.anchors.examples} labelledBy="examples-title" variant="base" spacing="lg">
      <Container>
        <SectionHead id="examples-title" eyebrow={ex.eyebrow} title={ex.title} description={ex.intro} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {ex.items.map((item, i) => (
            <Reveal key={item.title} delay={(i + 1) * 70}>
              <Card interactive className="flex h-full flex-col gap-4 p-7">
                <h3 className="text-lg font-bold tracking-tightest text-content-primary">{item.title}</h3>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-content-muted">{ex.problemLabel}</p>
                  <p className="text-content-secondary">{item.problem}</p>
                </div>
                <div className="mt-auto rounded-xl bg-selected p-3.5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-action-primary">{ex.solutionLabel}</p>
                  <p className="text-content-primary">{item.solution}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
