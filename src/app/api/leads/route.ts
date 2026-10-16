import { NextResponse, type NextRequest } from "next/server";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n";
import {
  validateLead,
  isHoneypotTripped,
  LEAD_MAX_LENGTHS,
  type LeadInput,
} from "@/lib/forms/lead";
import { createLead } from "@/lib/leads/createLead";
import { logSystemEvent } from "@/lib/db/systemEvents";
import { clientIp } from "@/lib/http/clientIp";

export const runtime = "nodejs";

// ── In-memory tiered rate limiting (per docs/must/SPAM_AND_RATE_LIMITING.md) ──
// Single-instance only; swap for a shared store (Redis/Upstash) when scaling.
const buckets = new Map<string, number[]>();

function recentHits(key: string, windowMs: number): number[] {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length === 0) buckets.delete(key);
  else buckets.set(key, recent);
  return recent;
}

const MIN = 60_000;

// Periodically drop keys whose timestamps have all aged out, so the map can't
// grow unbounded (one entry per unique IP/email/phone) on a long-lived instance.
const MAX_WINDOW_MS = 60 * MIN;
const SWEEP_INTERVAL_MS = 10 * MIN;
let lastSweep = Date.now();
function sweepBuckets(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, times] of buckets) {
    const fresh = times.filter((t) => now - t < MAX_WINDOW_MS);
    if (fresh.length === 0) buckets.delete(key);
    else buckets.set(key, fresh);
  }
}

type RateRule = { key: string; windowMs: number; max: number };

function rateRules(ip: string, email?: string, phone?: string): RateRule[] {
  const rules: RateRule[] = [
    { key: `ip10:${ip}`, windowMs: 10 * MIN, max: 5 },
    { key: `ip60:${ip}`, windowMs: 60 * MIN, max: 10 },
  ];
  if (email) rules.push({ key: `em:${email}`, windowMs: 60 * MIN, max: 3 });
  if (phone) rules.push({ key: `ph:${phone}`, windowMs: 60 * MIN, max: 3 });
  return rules;
}

function rateLimitEnabled(): boolean {
  return process.env.RATE_LIMIT_ENABLED !== "false";
}

/** True when any bucket is already full. Does not record anything. */
function isRateLimited(rules: RateRule[]): boolean {
  if (!rateLimitEnabled()) return false;
  sweepBuckets(Date.now());
  return rules.some((r) => recentHits(r.key, r.windowMs).length >= r.max);
}

/** Counts a submission. Called only for valid submissions that are accepted,
 * so invalid / rejected requests never eat into a real visitor's allowance. */
function recordSubmission(rules: RateRule[]): void {
  if (!rateLimitEnabled()) return;
  const now = Date.now();
  for (const r of rules) {
    const recent = recentHits(r.key, r.windowMs);
    recent.push(now);
    buckets.set(r.key, recent);
  }
}

function cap(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Reject oversized payloads before parsing (fields are capped again below).
const MAX_BODY_BYTES = 50_000;

/**
 * Reads the body as text, counting the bytes actually received. The
 * content-length header is only a hint (absent with chunked encoding), so the
 * cap is enforced on the stream itself. Returns null when the cap is exceeded.
 */
async function readCappedBody(req: NextRequest, maxBytes: number): Promise<string | null> {
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const userAgent = req.headers.get("user-agent") ?? undefined;
  const referrer = req.headers.get("referer") ?? undefined;

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  const raw = await readCappedBody(req, MAX_BODY_BYTES);
  if (raw === null) {
    return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }
  // Valid JSON that is not an object (null, array, number, string) → 400.
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }
  const body = parsed as Partial<LeadInput>;

  // Honeypot: silently accept so bots don't learn they were caught.
  if (isHoneypotTripped(body)) {
    await logSystemEvent({
      severity: "INFO",
      eventType: "lead.honeypot",
      message: "Honeypot tripped",
      ipAddress: ip,
      userAgent,
    });
    return NextResponse.json({ ok: true });
  }

  const email = cap(body.email, LEAD_MAX_LENGTHS.email) || undefined;
  const phone = cap(body.phone, LEAD_MAX_LENGTHS.phone) || undefined;

  const rules = rateRules(ip, email, phone);
  if (isRateLimited(rules)) {
    await logSystemEvent({
      severity: "WARNING",
      eventType: "lead.rate_limited",
      message: "Lead submission rate limited",
      ipAddress: ip,
      userAgent,
    });
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const dict = getDictionary(locale);

  const errors = validateLead(
    body,
    dict.cta.form.validation,
    dict.cta.form.options.map((option) => option.value),
  );
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "VALIDATION", fields: errors }, { status: 400 });
  }

  // Sanitize UTM: coerce + cap each known key; drop anything else.
  const rawUtm =
    body.utm && typeof body.utm === "object"
      ? (body.utm as Record<string, unknown>)
      : undefined;
  const utm = rawUtm
    ? {
        source: cap(rawUtm.source, 200) || undefined,
        medium: cap(rawUtm.medium, 200) || undefined,
        campaign: cap(rawUtm.campaign, 200) || undefined,
        term: cap(rawUtm.term, 200) || undefined,
        content: cap(rawUtm.content, 200) || undefined,
      }
    : undefined;

  const lead: LeadInput & { ipAddress?: string; referrer?: string } = {
    name: cap(body.name, LEAD_MAX_LENGTHS.name),
    company: cap(body.company, LEAD_MAX_LENGTHS.company) || undefined,
    phone,
    email,
    interestedSolution: cap(body.interestedSolution, LEAD_MAX_LENGTHS.interestedSolution),
    message: cap(body.message, LEAD_MAX_LENGTHS.message),
    consent: Boolean(body.consent),
    locale,
    sourcePage: cap(body.sourcePage, 200) || undefined,
    utm,
    ipAddress: ip,
    referrer,
  };

  recordSubmission(rules);
  const result = await createLead(lead);

  if (!result.ok) {
    // DB save failed — do not claim success; client shows fallback error.
    return NextResponse.json({ error: "PERSIST_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
