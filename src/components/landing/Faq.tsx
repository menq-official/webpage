"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { Kicker, Lead } from "./SectionHead";
import { site } from "@/config/site";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id={site.anchors.faq} labelledBy="faq-title" variant="muted" spacing="lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal className="flex flex-col items-start gap-4">
            <Kicker>{faq.eyebrow}</Kicker>
            <h2 id="faq-title" className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-content-primary sm:text-4xl lg:text-5xl">{faq.title}</h2>
            <Lead>{faq.description}</Lead>
            <a href={`#${site.anchors.contact}`} className={cn(buttonClasses("primary", "md"), "brand-orb-deep")}>{faq.askCta}</a>
          </Reveal>

          <div className="flex flex-col gap-2.5">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <Reveal key={item.q} delay={(i + 1) * 50}>
                  <div className={cn("rounded-xl border bg-surface-primary px-5 transition-colors duration-base ease-standard", isOpen ? "border-edge-strong" : "border-edge-subtle")}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => {
                          if (!isOpen) track(AnalyticsEvent.faqOpen, { position: i + 1 });
                          setOpen(isOpen ? null : i);
                        }}
                        className="flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left font-semibold text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={cn("h-5 w-5 shrink-0 text-content-muted transition-transform duration-base ease-standard", isOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="faq-answer max-w-prose pb-5 text-content-secondary">
                      {item.a}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
