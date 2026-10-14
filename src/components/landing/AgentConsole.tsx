"use client";

import { useEffect, useState } from "react";
import { Bot, Check, CircleCheck, Pencil, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

type Phase = "incoming" | "thinking" | "drafting" | "approval" | "approved";

const PHASE_MS: Record<Phase, number> = {
  incoming: 1400,
  thinking: 1600,
  drafting: 0, // driven by the typing effect
  approval: 1900,
  approved: 2600,
};
const TYPE_MS = 22;

/**
 * Looping demo of an AI agent that answers a customer but only sends the reply
 * after the owner approves it. Purely illustrative (labelled "Demo"); the
 * whole panel is hidden from assistive tech and summarised by `srSummary`.
 * With reduced motion it shows the final, approved state without animating.
 */
export function AgentConsole({ dict }: { dict: Dictionary }) {
  const c = dict.hero.console;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);

  const scenario = c.scenarios[index % c.scenarios.length];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (phase === "drafting") {
      if (typed < scenario.draft.length) {
        const t = setTimeout(() => setTyped((n) => n + 2), TYPE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("approval"), 500);
      return () => clearTimeout(t);
    }
    const next: Record<Phase, () => void> = {
      incoming: () => setPhase("thinking"),
      thinking: () => {
        setTyped(0);
        setPhase("drafting");
      },
      drafting: () => undefined,
      approval: () => setPhase("approved"),
      approved: () => {
        setIndex((i) => i + 1);
        setTyped(0);
        setPhase("incoming");
      },
    };
    const t = setTimeout(next[phase], PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, typed, reduced, scenario.draft.length]);

  const shown: Phase = reduced ? "approved" : phase;
  const after = (p: Phase) => {
    const order: Phase[] = ["incoming", "thinking", "drafting", "approval", "approved"];
    return order.indexOf(shown) >= order.indexOf(p);
  };
  const draftText = reduced ? scenario.draft : scenario.draft.slice(0, typed);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <p className="sr-only">{c.srSummary}</p>
      <div aria-hidden="true">
        <div className="ai-orb ai-orb-a" />
        <div className="ai-orb ai-orb-b" />
        <div className="premium-panel relative rounded-3xl p-3 sm:p-4">
          {/* Title bar */}
          <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-edge-subtle bg-surface-secondary px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="ai-avatar inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-accent-soft">
                <Bot className="h-4 w-4 text-accent" />
              </span>
              <span className="truncate text-xs font-semibold text-content-primary sm:text-sm">{c.title}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-pill border border-edge-strong px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider text-content-muted">{c.badge}</span>
              <span className="flex items-center gap-1.5 text-2xs text-content-muted">
                <span className="animate-signal h-2 w-2 rounded-pill bg-state-success" />
                <span className="hidden sm:inline">{c.liveLabel}</span>
              </span>
            </div>
          </div>

          <div key={index} className="console-body flex flex-col gap-3">
            {/* Incoming message */}
            <div className="console-step rounded-2xl border border-edge-subtle bg-surface-primary p-4">
              <div className="mb-2 flex items-center justify-between gap-2 text-2xs text-content-muted">
                <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                  <UserRound className="h-3.5 w-3.5" />
                  {c.incomingLabel} · {scenario.channel}
                </span>
                <span>{scenario.time}</span>
              </div>
              <p className="text-sm leading-relaxed text-content-primary">
                <span className="font-semibold">{scenario.customer}:</span> {scenario.message}
              </p>
            </div>

            {/* Thinking */}
            {shown === "thinking" ? (
              <div className="console-step flex items-center gap-2 px-1 text-xs text-content-secondary">
                <Sparkles className="h-4 w-4 text-accent" />
                {c.thinkingLabel}
                <span className="thinking-dots" />
              </div>
            ) : null}

            {/* Auto actions */}
            {after("drafting") ? (
              <div className="console-step flex flex-wrap gap-2">
                {scenario.autoActions.map((action) => (
                  <span key={action} className="inline-flex items-center gap-1.5 rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1 text-2xs text-content-secondary">
                    <CircleCheck className="h-3.5 w-3.5 text-state-success" />
                    <span className="font-semibold text-content-muted">{c.autoLabel}:</span> {action}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Draft */}
            {after("drafting") ? (
              <div className="console-step rounded-2xl border border-edge-strong bg-accent-soft p-4">
                <div className="mb-2 flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-content-muted">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                  {c.draftLabel}
                </div>
                <p className="console-draft text-sm leading-relaxed text-content-primary">
                  {draftText}
                  {shown === "drafting" ? <span className="typing-caret" /> : null}
                </p>
              </div>
            ) : null}

            {/* Approval */}
            {after("approval") ? (
              <div className="console-step mt-auto flex flex-col gap-3 rounded-2xl border border-edge-subtle bg-surface-primary p-4 sm:flex-row sm:items-center sm:justify-between">
                {shown === "approved" ? (
                  <span className="flex items-center gap-2 text-sm font-semibold text-state-success">
                    <CircleCheck className="h-5 w-5" />
                    {c.approvedLabel}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-content-primary">{c.approvalPrompt}</span>
                )}
                {shown === "approval" ? (
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-button border border-edge-strong px-3 py-1.5 text-xs font-semibold text-content-secondary">
                      <Pencil className="h-3.5 w-3.5" />
                      {c.edit}
                    </span>
                    <span className={cn("approve-pulse inline-flex items-center gap-1.5 rounded-button bg-action-primary px-3 py-1.5 text-xs font-semibold text-content-inverse")}>
                      <Check className="h-3.5 w-3.5" />
                      {c.approve}
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
