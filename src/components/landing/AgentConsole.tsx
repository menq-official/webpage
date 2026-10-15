"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type SyntheticEvent } from "react";
import { Bot, CircleCheck, Clock, Pause, Play, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

type ConsoleCopy = Dictionary["hero"]["console"];
type Phase = "incoming" | "working" | "typing" | "waiting" | "approved";

const ORDER: Phase[] = ["incoming", "working", "typing", "waiting", "approved"];
// Demo pacing (ms). The visible motion itself is CSS; these only step the story.
const PACE = { start: 700, incoming: 900, action: 700, afterActions: 500, typeChar: 28, afterTyping: 400, waiting: 2600, approved: 2400 };

/**
 * Hero demo: an AI agent receives a message, does the routine part on its own,
 * drafts a reply and waits for the owner's yes. It plays by itself through the
 * three kinds of business; any click or key inside it (or the pause button)
 * hands control to the visitor, who can then switch tabs, edit and approve.
 * No autoplay with reduced motion or while it is off screen.
 * Names, prices and times are samples (labelled as such in the header).
 */
export function AgentConsole({ console: c }: { console: ConsoleCopy }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [actions, setActions] = useState(0);
  const [typed, setTyped] = useState(0);
  const [inView, setInView] = useState(true);
  const [drafts, setDrafts] = useState(() => c.scenarios.map((s) => s.draft));
  const [approved, setApproved] = useState(() => c.scenarios.map(() => false));
  const [editing, setEditing] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);
  const justApproved = useRef(false);

  const scene = c.scenarios[active];
  const draft = drafts[active];
  const at = (p: Phase) => !auto || ORDER.indexOf(phase) >= ORDER.indexOf(p);
  const isApproved = auto ? phase === "approved" : approved[active];

  // Start playing once the hero has risen in (the server HTML shows the finished scene).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setAuto(true);
      setPhase("incoming");
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
    if (!auto || !inView) return;
    let next: () => void = () => undefined;
    let wait = 0;
    switch (phase) {
      case "incoming":
        next = () => { setActions(0); setPhase("working"); };
        wait = PACE.incoming;
        break;
      case "working":
        if (actions < scene.autoActions.length) {
          next = () => setActions((n) => n + 1);
          wait = PACE.action;
        } else {
          next = () => { setTyped(0); setPhase("typing"); };
          wait = PACE.afterActions;
        }
        break;
      case "typing":
        if (typed < draft.length) {
          next = () => setTyped((n) => n + 2);
          wait = PACE.typeChar;
        } else {
          next = () => setPhase("waiting");
          wait = PACE.afterTyping;
        }
        break;
      case "waiting":
        next = () => setPhase("approved");
        wait = PACE.waiting;
        break;
      case "approved":
        next = () => { setActive((i) => (i + 1) % c.scenarios.length); setPhase("incoming"); };
        wait = PACE.approved;
        break;
    }
    const t = setTimeout(next, wait);
    return () => clearTimeout(t);
  }, [auto, inView, phase, actions, typed, draft.length, scene.autoActions.length, c.scenarios.length]);

  useEffect(() => {
    if (editing !== null) editRef.current?.focus();
  }, [editing]);

  // After "Approve" the buttons are gone: keep keyboard focus on the confirmation.
  useEffect(() => {
    if (justApproved.current && isApproved) {
      justApproved.current = false;
      doneRef.current?.focus();
    }
  }, [isApproved]);

  /** The visitor takes over: show the whole scene and stop the story. */
  function takeOver(event: SyntheticEvent) {
    if (!auto) return;
    if ((event.target as HTMLElement).closest("[data-demo-control]")) return;
    setAuto(false);
    setApproved((prev) => prev.map((v, i) => (i === active ? phase === "approved" : v)));
    setPhase("waiting");
  }

  function togglePlay() {
    if (auto) {
      setAuto(false);
      setApproved((prev) => prev.map((v, i) => (i === active ? phase === "approved" : v)));
      setPhase("waiting");
    } else {
      setEditing(null);
      setApproved((prev) => prev.map(() => false));
      setAuto(true);
      setPhase("incoming");
    }
  }

  function pick(i: number) {
    setEditing(null);
    setActive(i);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = c.scenarios.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    pick(next);
    tabRefs.current[next]?.focus();
  }

  function approve() {
    justApproved.current = true;
    setEditing(null);
    setApproved((prev) => prev.map((v, i) => (i === active ? true : v)));
  }

  const shownActions = auto && phase === "working" ? scene.autoActions.slice(0, actions) : scene.autoActions;
  const shownDraft = auto && phase === "typing" ? draft.slice(0, typed) : draft;

  return (
    <section
      ref={rootRef}
      aria-label={c.label}
      onPointerDownCapture={takeOver}
      onKeyDownCapture={takeOver}
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
              <p className="truncate font-semibold text-content-primary">{scene.agent}</p>
              <p className="text-xs text-content-muted">{c.sampleNote}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-xs text-state-success-text">
            <span className="live-dot" aria-hidden="true" />
            {c.liveLabel}
          </span>
        </div>

        <div role="tablist" aria-label={c.tabsLabel} className="flex flex-wrap gap-2 pb-1 pt-4">
          {c.scenarios.map((s, i) => (
            <button
              key={s.tab}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`console-tab-${i}`}
              aria-selected={i === active}
              aria-controls="console-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={onTabKey}
              className={cn(
                "min-h-9 rounded-pill border px-4 text-sm transition-colors duration-base ease-standard",
                i === active
                  ? "border-transparent bg-surface-inverse font-semibold text-content-inverse"
                  : "border-edge-subtle text-content-secondary hover:border-edge-strong",
              )}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div key={active} id="console-panel" role="tabpanel" aria-labelledby={`console-tab-${active}`} className="console-scene console-body flex flex-col gap-3 pt-3">
          <div className="flex flex-col gap-1 rounded-xl bg-surface-elevated px-4 py-3">
            <div className="flex justify-between gap-3 text-xs text-content-muted">
              <span>{scene.channel} · {scene.customer}</span>
              <span>{scene.time}</span>
            </div>
            <p className="text-content-primary">{scene.message}</p>
          </div>

          {auto && phase === "working" ? (
            <p className="console-step flex items-center gap-2 px-1 text-sm text-content-secondary">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              {c.thinking}
              <span className="thinking-dots" aria-hidden="true" />
            </p>
          ) : null}

          {at("working") && shownActions.length > 0 ? (
            <ul className="flex flex-col gap-1.5 px-1">
              {shownActions.map((action) => (
                <li key={action} className="console-step flex items-start gap-2 text-sm text-content-secondary">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-state-success-text" aria-hidden="true" />
                  <span>{c.autoPrefix}{action}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {at("typing") ? (
            <div className="console-step rounded-xl border border-edge-strong bg-selected px-4 py-3">
              {editing === active ? (
                <>
                  <label htmlFor="console-draft" className="mb-1 block text-2xs font-semibold uppercase tracking-wider text-accent">{scene.draftLabel}</label>
                  <textarea
                    id="console-draft"
                    ref={editRef}
                    rows={3}
                    value={draft}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDrafts((prev) => prev.map((d, i) => (i === active ? value : d)));
                    }}
                    onBlur={() => setEditing(null)}
                    className="w-full resize-none rounded-lg border border-edge-strong bg-surface-primary px-3 py-2 text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  />
                </>
              ) : (
                <>
                  <p className="mb-1 text-2xs font-semibold uppercase tracking-wider text-accent">{scene.draftLabel}</p>
                  <p className="text-content-primary">
                    {shownDraft}
                    {auto && phase === "typing" ? <span className="typing-caret" aria-hidden="true" /> : null}
                  </p>
                </>
              )}
            </div>
          ) : null}

          {at("waiting") ? (
            <div className="console-step flex min-h-16 flex-wrap items-center justify-between gap-3 rounded-xl border border-edge-subtle bg-page py-2.5 pl-4 pr-2.5">
              {isApproved ? (
                <p ref={doneRef} tabIndex={-1} role="status" className="approve-done inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-state-success-text focus-visible:outline-none">
                  <CircleCheck className="h-4 w-4" aria-hidden="true" />
                  {c.approvedLabel}
                </p>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-state-warning-text">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {scene.waiting}
                  </span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditing(active)}
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

        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <p className="text-xs text-content-muted">{c.footnote}</p>
          <button
            type="button"
            data-demo-control
            onClick={togglePlay}
            aria-label={auto ? c.pause : c.play}
            title={auto ? c.pause : c.play}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-edge-subtle text-content-secondary transition-colors duration-base ease-standard hover:border-edge-strong hover:text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {auto ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
