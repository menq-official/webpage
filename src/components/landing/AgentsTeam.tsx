import { CircleCheck, Hand } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { agentIcons } from "@/config/icons";
import type { Dictionary } from "@/content/locales/types";

/** The four AI agent roles, each split into "does on its own" / "asks you". */
export function AgentsTeam({ dict }: { dict: Dictionary }) {
  const agents = dict.agents;
  return (
    <Section variant="base" spacing="lg">
      <Container>
        <SectionHeading eyebrow={agents.eyebrow} title={agents.title} description={agents.description} />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {agents.items.map((agent, i) => {
            const Icon = agentIcons[i] ?? agentIcons[0];
            return (
              <Reveal key={agent.name} delay={(i % 2) * 80}>
                <Card variant="elevated" interactive className="flex h-full flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <IconWrap icon={Icon} variant="accent" className="ai-avatar" />
                    <div>
                      <h3 className="text-xl font-semibold text-content-primary">{agent.name}</h3>
                      <p className="mt-1 leading-relaxed text-content-secondary">{agent.role}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">{agents.autoLabel}</div>
                      <ul className="flex flex-col gap-2">
                        {agent.auto.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-content-secondary">
                            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-state-success" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-edge-strong bg-accent-soft p-4">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-content-muted">{agents.askLabel}</div>
                      <ul className="flex flex-col gap-2">
                        {agent.ask.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm font-medium leading-relaxed text-content-primary">
                            <Hand className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            {item}
                          </li>
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
