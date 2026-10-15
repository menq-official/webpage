import { Bot } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { Chip } from "./Chip";
import { Industries } from "./Industries";
import { site } from "@/config/site";
import { getPublishedServiceBlocks } from "@/lib/content/publicContent";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

/** What we build: a bento grid led by AI agents, then the industries we work with. */
export async function ServiceBlocks({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { services } = dict;
  const [lead, ...rest] = (await getPublishedServiceBlocks(locale)) ?? services.blocks;
  return (
    <Section id={site.anchors.solutions} labelledBy="solutions-title" variant="base" spacing="lg">
      <Container>
        <SectionHead id="solutions-title" eyebrow={services.eyebrow} title={services.title} description={services.description} layout="row" />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lead ? (
            <Reveal delay={70} className="md:col-span-2 lg:col-span-1 lg:row-span-2">
              {/* Dark lead tile in both themes. */}
              <div className="section-contrast tile-wash tile-drift premium-card flex h-full flex-col gap-3 rounded-card border border-edge-strong bg-surface-secondary p-7">
                <IconWrap icon={Bot} variant="accent" className="h-11 w-11 border-transparent" />
                <h3 className="font-display text-2xl font-bold tracking-tightest sm:text-3xl">{lead.title}</h3>
                <p className="text-lg text-content-secondary">{lead.goal}</p>
                {lead.services.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {lead.services.map((item) => <Chip key={item} as="li">{item}</Chip>)}
                  </ul>
                ) : null}
                <p className="mt-auto border-t border-edge-subtle pt-3.5 font-semibold text-accent">{lead.value}</p>
              </div>
            </Reveal>
          ) : null}
          {rest.map((block, i) => (
            <Reveal key={block.title} delay={(i + 2) * 70}>
              <Card interactive className="flex h-full flex-col gap-3 p-7">
                <h3 className="text-xl font-bold tracking-tightest text-content-primary">{block.title}</h3>
                <p className="text-content-secondary">{block.goal}</p>
                <p className="mt-auto border-t border-edge-subtle pt-3.5 font-semibold text-action-primary">{block.value}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Industries dict={dict} locale={locale} />
      </Container>
    </Section>
  );
}
