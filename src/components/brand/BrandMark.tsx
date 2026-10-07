import { useId } from "react";
import { cn } from "@/lib/cn";
import { MENQ_MARK_VIEWBOX, MENQ_MEN_PATH, MENQ_Q_ARC, MENQ_Q_STEM } from "./menqMarkPaths";

// Official MenQ mark (MenQ Design Platform BrandMark, CR-0005): rounded "Men" + neon power-ring Q.
// "Men" follows --color-content-primary (ink on light grounds, white on dark / contrast grounds);
// the Q uses the brand cyan scale. No hardcoded colors: every value is a design token.
export function BrandMark({
  compact = false,
  admin = false,
  className,
}: {
  compact?: boolean;
  admin?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const ring = `mq-ring-${uid}`;
  const glow = `mq-glow-${uid}`;
  const highlight = "color-mix(in srgb, var(--cyan-300) 45%, var(--neutral-0))";
  return (
    <span
      role="img"
      aria-label={admin ? "MenQ Admin" : "MenQ"}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={MENQ_MARK_VIEWBOX}
        className={cn("block w-auto overflow-visible", compact ? "h-7" : "h-8")}
        style={{ aspectRatio: "1800 / 560" }}
      >
        <defs>
          <linearGradient id={ring} gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="560">
            <stop offset="0" style={{ stopColor: "var(--blue-500)" }} />
            <stop offset="1" style={{ stopColor: "var(--cyan-300)" }} />
          </linearGradient>
          <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <path d={MENQ_MEN_PATH} fillRule="evenodd" style={{ fill: "var(--color-content-primary)" }} />
        <g className="menq-mark-glow" filter={`url(#${glow})`}>
          <path d={MENQ_Q_ARC} fill="none" strokeWidth={64} strokeLinecap="round" style={{ stroke: "var(--cyan-400)" }} />
          <path d={MENQ_Q_STEM} strokeWidth={48} strokeLinecap="round" style={{ stroke: "var(--cyan-400)" }} />
        </g>
        <path d={MENQ_Q_ARC} fill="none" stroke={`url(#${ring})`} strokeWidth={56} strokeLinecap="round" />
        <path d={MENQ_Q_ARC} fill="none" strokeWidth={14} strokeLinecap="round" opacity={0.9} style={{ stroke: highlight }} />
        <path d={MENQ_Q_STEM} strokeWidth={40} strokeLinecap="round" style={{ stroke: "var(--cyan-400)" }} />
        <path d={MENQ_Q_STEM} strokeWidth={12} strokeLinecap="round" style={{ stroke: highlight }} />
      </svg>
      {admin ? (
        <span className="rounded-pill border border-edge-subtle bg-surface-secondary px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-content-secondary">
          Admin
        </span>
      ) : null}
    </span>
  );
}
