"use client";

import { useEffect } from "react";

/**
 * Holds document.title for a page whose metadata Next does not apply. A 404 served through
 * the proxy rewrite renders with the locale layout's metadata, and the client writes the
 * layout's title back after hydration, so setting it once is not enough: whenever the head
 * changes and the title differs, it is set again (only then, so it cannot loop).
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    const keep = () => {
      if (document.title !== title) document.title = title;
    };
    keep();
    const observer = new MutationObserver(keep);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [title]);
  return null;
}
