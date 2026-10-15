import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "./SectionHead";
import { ControlPanel } from "./ControlPanel";
import { controlIcons } from "@/config/icons";
import type { Dictionary } from "@/content/locales/types";

/** "You are in charge": a sample control dashboard and the promise beside it. Dark in both themes. */
export function YouControl({ dict }: { dict: Dictionary }) {
  const control = dict.control;
  return (
    <Section labelledBy="control-title" variant="spotlight" spacing="lg" className="overflow-hidden">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <ControlPanel panel={control.panel} />
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-col gap-3">
              <Kicker>{control.eyebrow}</Kicker>
              <h2 id="control-title" className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-content-primary sm:text-4xl lg:text-5xl">{control.title}</h2>
            </div>
            <ul className="mt-7 flex flex-col gap-5">
              {control.points.map((point, i) => {
                const Icon = controlIcons[i] ?? controlIcons[0];
                return (
                  <li key={point.title} className="flex gap-3.5">
                    <IconWrap icon={Icon} variant="accent" className="h-11 w-11 border-transparent" />
                    <div>
                      <h3 className="text-lg font-semibold text-content-primary">{point.title}</h3>
                      <p className="text-content-muted">{point.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="text-gradient-accent mt-8 font-display text-xl font-semibold">{control.closing}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
