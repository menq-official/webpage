import type { Locale } from "@/lib/i18n";

export type LeadField =
  | "name"
  | "company"
  | "phone"
  | "email"
  | "interestedSolution"
  | "message"
  | "consent";

export type LeadInput = {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  interestedSolution: string;
  message: string;
  consent?: boolean;
  /** Anti-spam honeypot — must stay empty. */
  website?: string;
  locale?: Locale;
  sourcePage?: string;
  utm?: Record<string, string | undefined>;
};

export type ValidationMessages = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  solution: string;
  message: string;
};

export type FieldErrors = Partial<Record<LeadField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits with the usual separators, an optional leading "+", and 7–15 digits in all (E.164).
const PHONE_RE = /^\+?[\d\s().-]+$/;

/** The request body is untrusted JSON: anything that is not a string counts as empty. */
function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "").length;
  return PHONE_RE.test(phone) && digits >= 7 && digits <= 15;
}

/**
 * Shared client + server validation. Returns errors keyed by field.
 * `solutions` is the list of offered option values; when given, anything else is refused.
 */
export function validateLead(
  input: Partial<Record<keyof LeadInput, unknown>>,
  messages: ValidationMessages,
  solutions?: readonly string[],
): FieldErrors {
  const errors: FieldErrors = {};
  const name = text(input.name);
  const phone = text(input.phone);
  const email = text(input.email);
  const solution = text(input.interestedSolution);
  const message = text(input.message);

  // The name is optional; when given it must be a real one.
  if (name && name.length < 2) errors.name = messages.name;
  if (!phone && !email) errors.phone = messages.contact;
  else if (phone && !isValidPhone(phone)) errors.phone = messages.phone;
  if (email && !EMAIL_RE.test(email)) errors.email = messages.email;
  if (!solution || (solutions && !solutions.includes(solution))) {
    errors.interestedSolution = messages.solution;
  }
  if (message.length < 10) errors.message = messages.message;

  return errors;
}

export function isHoneypotTripped(input: Partial<LeadInput>): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}

/** Length caps to bound payloads server-side (see docs/must/SPAM_AND_RATE_LIMITING.md). */
export const LEAD_MAX_LENGTHS: Record<string, number> = {
  name: 120,
  company: 160,
  phone: 40,
  email: 180,
  interestedSolution: 60,
  message: 3000,
};
