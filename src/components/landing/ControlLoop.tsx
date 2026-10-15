import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

/** Control by design: understand → define (people set the rules) → build and test → launch and improve. */
export function ControlLoop({ dict }: { dict: Dictionary }) {
  const loop = dict.loop;
  return (
    <Section id={site.anchors.how} labelledBy="how-title" variant="base" spacing="lg">
      <Container>
        <SectionHead id="how-title" eyebrow={loop.eyebrow} title={loop.title} description={loop.description} layout="row" />
        <ol className="relative mt-14 grid gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          <span className="loop-line absolute inset-x-[6%] top-7 hidden h-0.5 lg:block" aria-hidden="true">
            <span className="loop-signal" />
          </span>
          {loop.steps.map((step, i) => {
            const you = i === 1;
            return (
              <Reveal as="li" key={step.title} delay={(i + 1) * 70} className="relative flex flex-col gap-2.5">
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-pill font-display font-bold",
                    you
                      ? "step-you brand-orb-deep text-content-inverse shadow-md"
                      : "border-2 border-edge-strong bg-page text-content-muted",
                  )}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className={cn("text-lg font-bold tracking-tightest", you ? "text-action-primary" : "text-content-primary")}>{step.title}</h3>
                <p className="max-w-[26ch] text-content-secondary">{step.body}</p>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="mt-10 max-w-3xl border-l-2 border-action-primary pl-4 text-content-secondary">
          <p>{loop.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
