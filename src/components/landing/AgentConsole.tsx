"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, Bot, Check, CircleCheck, Hand, Pencil, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

type Phase = "incoming" | "thinking" | "drafting" | "approval" | "approved" | "handedOver";

const PHASE_MS: Record<Phase, number> = {
  incoming: 1400,
  thinking: 1600,
  drafting: 0, // driven by the typing effect
  approval: 1900,
  approved: 2600,
  handedOver: 2600,
};
const TYPE_MS = 22;
const ORDER: Phase[] = ["incoming", "thinking", "drafting", "approval", "approved"];

/**
 * An AI agent drafts a reply; it is sent only after a person approves it.
 *
 * Until the visitor touches it, the panel plays on its own (as before). The first
 * interaction stops the autoplay and hands the decision to the visitor: pick a scenario,
 * edit the draft, approve it or answer yourself. It is a scripted example (labelled
 * "Demo" and with a note); nothing is sent. With reduced motion it starts at the decision.
 */
export function AgentConsole({ dict }: { dict: Dictionary }) {
  const c = dict.hero.console;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("incoming");
  const [typed, setTyped] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [editing, setEditing] = useState(false);
  const [drafts, setDrafts] = useState<string[]>(() => c.scenarios.map((s) => s.draft));
  const editId = useId();

  const scenario = c.scenarios[index];
  const draft = drafts[index];

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
      if (typed < draft.length) {
        const t = setTimeout(() => setTyped((n) => n + 2), TYPE_MS);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("approval"), 500);
      return () => clearTimeout(t);
    }
    // Once the visitor has taken over, the panel waits at the decision.
    if (!autoplay && (phase === "approval" || phase === "approved" || phase === "handedOver")) return;
    const next: Record<Phase, () => void> = {
      incoming: () => setPhase("thinking"),
      thinking: () => {
        setTyped(0);
        setPhase("drafting");
      },
      drafting: () => undefined,
      approval: () => setPhase("approved"),
      approved: () => goTo((index + 1) % c.scenarios.length),
      handedOver: () => goTo((index + 1) % c.scenarios.length),
    };
    const t = setTimeout(next[phase], PHASE_MS[phase]);
    return () => clearTimeout(t);
    // goTo is stable enough for this effect: it only sets state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, reduced, draft.length, autoplay, index]);

  function goTo(i: number) {
    setIndex(i);
    setTyped(0);
    setEditing(false);
    setPhase("incoming");
  }

  /** Any click on a control means a person is now in charge: stop the autoplay. */
  function takeOver() {
    setAutoplay(false);
  }

  function choose(i: number) {
    takeOver();
    goTo(i);
  }

  const shown: Phase = reduced && (phase === "incoming" || phase === "thinking" || phase === "drafting") ? "approval" : phase;
  const after = (p: Phase) => {
    const at = shown === "handedOver" ? ORDER.indexOf("approved") : ORDER.indexOf(shown);
    return at >= ORDER.indexOf(p);
  };
  const draftText = reduced || shown !== "drafting" ? draft : draft.slice(0, typed);
  const decided = shown === "approved" || shown === "handedOver";

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <p className="sr-only">{c.srSummary}</p>
      <div className="ai-orb ai-orb-a" aria-hidden="true" />
      <div className="ai-orb ai-orb-b" aria-hidden="true" />
      <div className="premium-panel relative rounded-3xl p-3 sm:p-4">
        {/* Title bar */}
        <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-edge-subtle bg-surface-secondary px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="ai-avatar inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-accent-soft" aria-hidden="true">
              <Bot className="h-4 w-4 text-accent" />
            </span>
            <span className="truncate text-xs font-semibold text-content-primary sm:text-sm">{c.title}</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-pill border border-edge-strong px-2 py-0.5 text-2xs font-semibold uppercase tracking-wider text-content-muted">{c.badge}</span>
            <span className="flex items-center gap-1.5 text-2xs text-content-muted" aria-hidden="true">
              <span className="animate-signal h-2 w-2 rounded-pill bg-state-success" />
              <span className="hidden sm:inline">{c.liveLabel}</span>
            </span>
          </div>
        </div>

        {/* Scenario tabs */}
        <div role="group" aria-label={c.tabsLabel} className="mb-3 flex flex-wrap gap-1.5 px-1">
          {c.scenarios.map((s, i) => (
            <button
              key={s.tab}
              type="button"
              aria-pressed={i === index}
              onClick={() => choose(i)}
              className={cn(
                "min-h-9 rounded-pill border px-3 py-1 text-xs font-semibold transition-colors duration-base",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
                i === index
                  ? "border-accent bg-accent-soft text-content-primary"
                  : "border-edge-subtle text-content-muted hover:border-edge-strong hover:text-content-primary",
              )}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div key={index} className="console-body flex flex-col gap-3">
          {/* Incoming message */}
          <div className="console-step rounded-2xl border border-edge-subtle bg-surface-primary p-4">
            <div className="mb-2 flex items-center justify-between gap-2 text-2xs text-content-muted">
              <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
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
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              {c.thinkingLabel}
              <span className="thinking-dots" aria-hidden="true" />
            </div>
          ) : null}

          {/* Auto actions */}
          {after("drafting") ? (
            <ul className="console-step flex flex-wrap gap-2">
              {scenario.autoActions.map((action) => (
                <li key={action} className="inline-flex items-center gap-1.5 rounded-pill border border-edge-subtle bg-surface-secondary px-3 py-1 text-2xs text-content-secondary">
                  <CircleCheck className="h-3.5 w-3.5 text-state-success" aria-hidden="true" />
                  <span className="font-semibold text-content-muted">{c.autoLabel}:</span> {action}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Draft */}
          {after("drafting") ? (
            <div className="console-step rounded-2xl border border-edge-strong bg-accent-soft p-4">
              <div className="mb-2 flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-content-muted">
                <Bot className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {c.draftLabel}
              </div>
              {editing ? (
                <>
                  <label htmlFor={editId} className="sr-only">{c.editFieldLabel}</label>
                  <textarea
                    id={editId}
                    value={draft}
                    onChange={(e) => setDrafts((all) => all.map((d, i) => (i === index ? e.target.value : d)))}
                    rows={4}
                    autoFocus
                    className="w-full resize-y rounded-xl border border-edge-strong bg-surface-primary px-3 py-2 text-sm leading-relaxed text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </>
              ) : (
                <p className="console-draft text-sm leading-relaxed text-content-primary">
                  {draftText}
                  {shown === "drafting" ? <span className="typing-caret" aria-hidden="true" /> : null}
                </p>
              )}
            </div>
          ) : null}

          {/* Decision */}
          {after("approval") ? (
            <div className="console-step mt-auto flex flex-col gap-3 rounded-2xl border border-edge-subtle bg-surface-primary p-4">
              <p className="text-sm font-semibold" aria-live="polite">
                {shown === "approved" ? (
                  <span className="flex items-center gap-2 text-state-success">
                    <CircleCheck className="h-5 w-5" aria-hidden="true" />
                    {c.approvedLabel}
                  </span>
                ) : shown === "handedOver" ? (
                  <span className="flex items-center gap-2 text-content-primary">
                    <Hand className="h-5 w-5 text-accent" aria-hidden="true" />
                    {c.handedOverLabel}
                  </span>
                ) : (
                  <span className="text-content-primary">{autoplay ? c.approvalPrompt : c.waitingLabel}</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {decided ? (
                  <button
                    type="button"
                    onClick={() => choose((index + 1) % c.scenarios.length)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-button border border-edge-strong px-3 py-1.5 text-xs font-semibold text-content-secondary hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    {c.next}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        takeOver();
                        setEditing((e) => !e);
                      }}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-button border border-edge-strong px-3 py-1.5 text-xs font-semibold text-content-secondary hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      {editing ? c.save : c.edit}
                    </button>
                    <button
                      type="button"
                      disabled={editing}
                      onClick={() => {
                        takeOver();
                        setPhase("approved");
                      }}
                      className={cn(
                        "inline-flex min-h-9 items-center gap-1.5 rounded-button bg-action-primary px-3 py-1.5 text-xs font-semibold text-content-inverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50",
                        autoplay && "approve-pulse",
                      )}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      {c.approve}
                    </button>
                    <button
                      type="button"
                      disabled={editing}
                      onClick={() => {
                        takeOver();
                        setPhase("handedOver");
                      }}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-button px-3 py-1.5 text-xs font-semibold text-content-muted hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {c.handOver}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <p className="mt-3 px-1 text-2xs leading-relaxed text-content-muted">{c.note}</p>
      </div>
    </div>
  );
}
