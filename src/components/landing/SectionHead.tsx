import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/** Kicker + section title (+ lead). "row" puts the lead beside the title on wide screens. */
export function SectionHead({
  id,
  eyebrow,
  title,
  description,
  layout = "stack",
  className,
  children,
}: {
  /** Id of the heading, for the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  layout?: "stack" | "row";
  className?: string;
  children?: ReactNode;
}) {
  const head = (
    <div className="flex max-w-3xl flex-col gap-3">
      <Kicker>{eyebrow}</Kicker>
      <h2 id={id} className="text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-content-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {layout === "stack" && description ? <Lead>{description}</Lead> : null}
      {children}
    </div>
  );
  if (layout === "stack") return <Reveal className={className}>{head}</Reveal>;
  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      {head}
      {description ? <Lead className="max-w-md">{description}</Lead> : null}
    </Reveal>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-wide text-accent-text">{children}</span>
  );
}

export function Lead({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-lg leading-relaxed text-content-secondary", className)}>{children}</p>;
}
