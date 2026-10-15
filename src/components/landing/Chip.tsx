import type { ElementType, ReactNode } from "react";

export function Chip({ as, children }: { as?: ElementType; children: ReactNode }) {
  const Tag = as ?? "span";
  return <Tag className="rounded-pill bg-surface-muted px-3 py-1.5 text-sm text-content-secondary">{children}</Tag>;
}
