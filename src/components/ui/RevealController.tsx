"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver that reveals every `[data-reveal]` element on
 * scroll. Rendered once per page — replaces ~50 per-element observers, cutting
 * hydration / blocking time. Uses classList (no React state).
 *
 * Content is visible in the server HTML. Before arming the page, everything
 * already on screen is marked visible, so nothing in view dims and comes back;
 * only content below the fold waits for its reveal.
 */
export function RevealController() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (els.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      for (const el of els) el.classList.add("is-visible");
      return;
    }

    const fold = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      if (rect.top < fold && rect.bottom > 0) el.classList.add("is-visible");
      else pending.push(el);
    }
    document.documentElement.classList.add("reveal-armed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of pending) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
