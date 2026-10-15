"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Bot, CircleCheck, Clock, RotateCcw, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { DemoCopy } from "@/content/locales/types";

type Phase = "incoming" | "working" | "typing" | "review" | "approved";

const ORDER: Phase[] = ["incoming", "working", "typing", "review", "approved"];
// Demo pacing (ms). The visible motion itself is CSS; these only step the story.
const PACE = { start: 700, incoming: 900, activity: 750, afterActivities: 500, typeChar: 28, afterTyping: 400 };

/**
 * Hero demo: one labelled sample enquiry, never a live system. It plays by
 * itself up to "awaiting review" and then waits: a person edits or approves
 * the sample. "Replay demo" starts it again. Any click or key inside it while
 * it plays shows the whole scene at once. No autoplay with reduced motion or
 * while it is off screen.
 */
export function AgentConsole({ console: c }: { console: DemoCopy }) {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>("review");
  const [shown, setShown] = useState(c.activities.length);
  const [typed, setTyped] = useState(0);
  const [inView, setInView] = useState(true);
  const [draft, setDraft] = useState(c.draft);
  const [editing, setEditing] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);

  const at = (p: Phase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

  // Play once the hero has risen in (the server HTML shows the scene awaiting review).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setShown(0);
      setTyped(0);
      setPhase("incoming");
      setPlaying(true);
    }, PACE.start);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    let next: () => void = () => undefined;
    let wait = 0;
    if (phase === "incoming") {
      next = () => setPhase("working");
      wait = PACE.incoming;
    } else if (phase === "working") {
      if (shown < c.activities.length) {
        next = () => setShown((n) => n + 1);
        wait = PACE.activity;
      } else {
        next = () => setPhase("typing");
        wait = PACE.afterActivities;
      }
    } else if (phase === "typing") {
      if (typed < draft.length) {
        next = () => setTyped((n) => n + 2);
        wait = PACE.typeChar;
      } else {
        next = () => { setPhase("review"); setPlaying(false); };
        wait = PACE.afterTyping;
      }
    } else {
      return;
    }
    const t = setTimeout(next, wait);
    return () => clearTimeout(t);
  }, [playing, inView, phase, shown, typed, draft.length, c.activities.length]);

  useEffect(() => {
    if (editing) editRef.current?.focus();
  }, [editing]);

  /** A click or key while it plays: show the whole scene, awaiting review. */
  function skipToReview(event: SyntheticEvent) {
    if (!playing) return;
    if ((event.target as HTMLElement).closest("[data-demo-control]")) return;
    setPlaying(false);
    setShown(c.activities.length);
    setPhase("review");
  }

  function approve() {
    setEditing(false);
    setPhase("approved");
    // The buttons are gone: keep keyboard focus on the confirmation.
    requestAnimationFrame(() => doneRef.current?.focus());
  }

  function replay() {
    setEditing(false);
    setDraft(c.draft);
    setShown(0);
    setTyped(0);
    setPhase("incoming");
    setPlaying(true);
  }

  const working = playing && phase === "working";
  const activities = !playing || at("typing") ? c.activities : c.activities.slice(0, shown);
  const shownDraft = playing && phase === "typing" ? draft.slice(0, typed) : draft;

  return (
    <section
      ref={rootRef}
      aria-label={c.label}
      onPointerDownCapture={skipToReview}
      onKeyDownCapture={skipToReview}
      className="relative mx-auto w-full max-w-xl"
    >
      <div className="ai-orb ai-orb-a" aria-hidden="true" />
      <div className="ai-orb ai-orb-b" aria-hidden="true" />
      <div className="premium-panel premium-card relative rounded-card border-edge-strong p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-edge-subtle pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="ai-avatar inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="break-words font-semibold text-content-primary">{c.title}</p>
              <p className="text-xs text-content-muted">{c.sampleNote}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-pill border border-edge-strong px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-content-muted">
            {c.badge}
          </span>
        </div>

        <div className="console-body flex flex-col gap-3 pt-4">
          <div className="console-step flex flex-col gap-1 rounded-xl bg-surface-elevated px-4 py-3">
            <span className="text-xs text-content-muted">{c.channel}</span>
            <p className="text-content-primary">{c.message}</p>
          </div>

          {working ? (
            <p className="console-step flex items-center gap-2 px-1 text-sm text-content-secondary">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              {c.thinking}
              <span className="thinking-dots" aria-hidden="true" />
            </p>
          ) : null}

          {at("working") && activities.length > 0 ? (
            <ul className="flex flex-col gap-1.5 px-1">
              {activities.map((item) => (
                <li key={item} className="console-step flex items-start gap-2 text-sm text-content-secondary">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-state-success-text" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {at("typing") ? (
            <div className="console-step rounded-xl border border-edge-strong bg-selected px-4 py-3">
              {editing ? (
                <>
                  <label htmlFor="console-draft" className="mb-1 block text-2xs font-semibold uppercase tracking-wider text-accent">{c.draftLabel}</label>
                  <textarea
                    id="console-draft"
                    ref={editRef}
                    rows={3}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={() => setEditing(false)}
                    className="w-full resize-none rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </>
              ) : (
                <>
                  <p className="mb-1 text-2xs font-semibold uppercase tracking-wider text-accent">{c.draftLabel}</p>
                  <p className="text-content-primary">
                    {shownDraft}
                    {playing && phase === "typing" ? <span className="typing-caret" aria-hidden="true" /> : null}
                  </p>
                </>
              )}
            </div>
          ) : null}

          {at("review") ? (
            <div className="console-step flex min-h-16 flex-wrap items-center justify-between gap-3 rounded-xl border border-edge-subtle bg-page py-2.5 pl-4 pr-2.5">
              {phase === "approved" ? (
                <p ref={doneRef} tabIndex={-1} role="status" className="approve-done inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-state-success-text focus-visible:outline-none">
                  <CircleCheck className="h-4 w-4" aria-hidden="true" />
                  {c.approvedLabel}
                </p>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-state-warning-text">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {c.awaiting}
                  </span>
                  <span className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="min-h-11 rounded-pill border border-edge-subtle px-4 text-sm font-semibold text-content-primary transition duration-fast ease-standard hover:border-edge-strong active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {c.edit}
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={approve}
                      className={cn(buttonClasses("primary", "sm"), "attn-ring min-h-11 hover:translate-y-0 active:scale-95")}
                    >
                      {c.approve}
                    </button>
                  </span>
                </>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3 px-1">
          <p className="text-xs text-content-muted">{c.disclosure}</p>
          <button
            type="button"
            data-demo-control
            onClick={replay}
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-pill border border-edge-subtle px-3 text-xs font-semibold text-content-secondary transition-colors duration-base ease-standard hover:border-edge-strong hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {c.replay}
          </button>
        </div>
      </div>
    </section>
  );
}
