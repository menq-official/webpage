"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Bot, Briefcase, Cable, Repeat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconWrap } from "@/components/ui/IconWrap";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { prefillLead } from "@/lib/forms/prefill";
import type { Dictionary } from "@/content/locales/types";

const icons = [Bot, Briefcase, Repeat, Cable];

/**
 * Problem first: the visitor picks the situation they recognise (or writes it in one line)
 * and the lead form below starts with that solution and text filled in.
 */
export function ProblemPicker({ problems }: { problems: Dictionary["problems"] }) {
  const [text, setText] = useState("");
  const askId = useId();

  function onAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!text.trim()) return;
    prefillLead({ message: text });
  }

  return (
    <section id="problems" className="relative bg-surface-secondary py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={problems.eyebrow} title={problems.title} description={problems.description} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.items.map((item, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="premium-card group flex h-full flex-col rounded-card border border-edge-subtle bg-surface-primary p-6 transition-transform duration-base ease-standard hover:-translate-y-1 hover:border-accent">
                  <IconWrap icon={Icon} variant="accent" />
                  <span className="mt-5 text-2xs font-semibold uppercase tracking-wider text-accent">{item.category}</span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-content-primary">{item.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-content-secondary">{item.body}</p>
                  <button
                    type="button"
                    onClick={() => prefillLead({ solution: item.solution })}
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-accent hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    {problems.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-base group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={120} className="mx-auto mt-10 max-w-2xl">
          <form onSubmit={onAsk} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor={askId} className="mb-1.5 block text-sm font-medium text-content-primary">
                {problems.askLabel}
              </label>
              <input
                id={askId}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={300}
                placeholder={problems.askPlaceholder}
                className="w-full rounded-lg border border-edge-strong bg-surface-primary px-4 py-3 text-base text-content-primary placeholder:text-content-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              />
            </div>
            <button type="submit" className={buttonClasses("primary", "lg")} disabled={!text.trim()}>
              {problems.askButton}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
