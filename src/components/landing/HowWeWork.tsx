import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { site } from "@/config/site";
import { getSectionData } from "@/lib/content/publicContent";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

/** From a business problem to a working solution: six steps. */
export async function HowWeWork({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const process = await getSectionData("process", locale, dict.process);
  return (
    <Section id={site.anchors.process} labelledBy="process-title" variant="base" spacing="lg">
      <Container>
        <SectionHead id="process-title" eyebrow={process.eyebrow} title={process.title} />
        <ol className="mt-12 grid grid-cols-1 gap-x-3 gap-y-7 break-words sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={(i + 1) * 70} className={cn("flex flex-col gap-1.5 border-t-2 pt-5", i === 0 ? "border-action-primary" : "border-edge-subtle")}>
              <span className={cn("text-sm font-bold", i === 0 ? "text-action-primary" : "text-content-muted")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-content-primary">{step.title}</h3>
              <p className="text-sm text-content-secondary">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
