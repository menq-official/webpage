"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Dictionary } from "@/content/locales/types";

type PanelCopy = Dictionary["control"]["panel"];

const FEED_MS = 2800;

/**
 * Sample control dashboard (labelled as a sample). While the sales agent is on,
 * a live line shows what the agents are doing; the stop switch really stops it.
 * The line does not move with reduced motion or while the panel is off screen.
 */
export function ControlPanel({ panel }: { panel: PanelCopy }) {
  const [on, setOn] = useState(true);
  const [tick, setTick] = useState(0);
  const [live, setLive] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!on || !live) return;
    const t = setInterval(() => setTick((n) => n + 1), FEED_MS);
    return () => clearInterval(t);
  }, [on, live]);

  const feed = panel.feed[tick % panel.feed.length];

  return (
    <section ref={rootRef} aria-label={panel.label} className="premium-panel flex flex-col gap-3 rounded-card border-edge-strong p-5 text-sm text-content-secondary">
      <div className="flex items-center justify-between gap-3 border-b border-edge-subtle pb-3">
        <p className="font-semibold text-content-primary">{panel.title}</p>
        <span className="flex items-center gap-2 text-xs text-content-muted">
          <span className="rounded-pill border border-edge-strong px-2 py-0.5 font-semibold uppercase tracking-wide">{panel.sampleLabel}</span>
          {panel.today}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Box title={panel.agentsTitle}>
          {panel.agents.map((agent, i) => {
            // The first agent is the sales agent the switch controls.
            const stopped = i === 0 && !on;
            return (
              <Row key={agent.name}>
                <span className="inline-flex items-center gap-2">
                  {stopped ? (
                    <span className="h-2 w-2 rounded-pill bg-content-muted" aria-hidden="true" />
                  ) : agent.waiting ? (
                    <span className="h-2 w-2 rounded-pill bg-state-warning" aria-hidden="true" />
                  ) : (
                    <span className="live-dot" aria-hidden="true" />
                  )}
                  {agent.name}
                </span>
                <span className={cn(stopped && "text-content-muted")}>{stopped ? panel.stopped : agent.status}</span>
              </Row>
            );
          })}
        </Box>
        <Box title={`${panel.queueTitle} · ${panel.queue.length}`}>
          {panel.queue.map((item) => (
            <Row key={item}>
              <span>{item}</span>
              <a href={`#${site.anchors.top}`} className="font-semibold text-accent hover:underline">{panel.approve}</a>
            </Row>
          ))}
        </Box>
      </div>

      <Box title={panel.feedTitle}>
        {/* Decorative sample activity: hidden from screen readers so it never interrupts. */}
        <p key={on ? tick : "off"} aria-hidden="true" className={cn("feed-in min-h-5", on ? "text-content-primary" : "text-content-muted")}>
          {on ? feed : `${panel.switchAgent} · ${panel.stopped}`}
        </p>
      </Box>

      <Box title={panel.rulesTitle}>
        {panel.rules.map((rule) => (
          <Row key={rule.label}>
            <span>{rule.label}</span>
            <span className={rule.asksYou ? "text-state-warning-text" : "text-state-success-text"}>{rule.value}</span>
          </Row>
        ))}
      </Box>

      <Box>
        <Row>
          <span className="font-semibold text-content-primary">{panel.switchAgent}</span>
          <button
            type="button"
            aria-pressed={on}
            aria-label={panel.switchLabel}
            onClick={() => setOn((v) => !v)}
            className="switch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </Row>
      </Box>
    </section>
  );
}

function Box({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-surface-elevated p-3.5">
      {title ? <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">{title}</p> : null}
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between gap-3">{children}</div>;
}
