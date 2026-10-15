import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { agentIcons } from "@/config/icons";
import { site } from "@/config/site";
import type { Dictionary } from "@/content/locales/types";

/** The four AI agent roles, each split into "does on its own" / "asks you". */
export function AgentsTeam({ dict }: { dict: Dictionary }) {
  const agents = dict.agents;
  return (
    <Section id={site.anchors.team} labelledBy="team-title" variant="muted" spacing="lg">
      <Container>
        <SectionHead id="team-title" eyebrow={agents.eyebrow} title={agents.title} description={agents.description} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {agents.items.map((agent, i) => {
            const Icon = agentIcons[i] ?? agentIcons[0];
            return (
              <Reveal key={agent.name} delay={(i + 1) * 70}>
                <Card interactive className="h-full p-7">
                  <div className="mb-5 flex items-center gap-4">
                    <IconWrap icon={Icon} variant="accent" className="card-icon h-11 w-11 text-action-primary" />
                    <div>
                      <h3 className="text-xl font-bold tracking-tightest text-content-primary">{agent.name}</h3>
                      <p className="text-sm text-content-muted">{agent.role}</p>
                    </div>
                  </div>
                  <div className="grid gap-3.5 sm:grid-cols-[1.3fr_1fr]">
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-content-muted">{agents.autoLabel}</h4>
                      <ul className="flex flex-col gap-2 text-content-secondary">
                        {agent.auto.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-state-success-text" strokeWidth={3} aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-selected p-3.5">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-action-primary">{agents.askLabel}</h4>
                      <ul className="flex flex-col gap-2 text-content-primary">
                        {agent.ask.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
