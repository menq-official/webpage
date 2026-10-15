"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FormField, TextAreaField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { validateLead, type FieldErrors, type LeadField, type LeadInput } from "@/lib/forms/lead";
import { track, AnalyticsEvent } from "@/lib/analytics/analytics";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/locales/types";

type Status = "idle" | "submitting" | "success" | "error";

/** The form asks what the AI should do instead of a solution list. */
const SOLUTION = "consultation";

// Visual order of the fields, so focus lands on the first one that needs fixing.
const FIELD_IDS: [LeadField, string][] = [
  ["phone", "lead-phone"],
  ["message", "lead-message"],
  ["name", "lead-name"],
];

const emptyValues = { phone: "", message: "", name: "", website: "" };

/**
 * Lead form → POST /api/leads → saved in the DB first, then the team is
 * notified (src/lib/leads/createLead.ts). Validation is shared with the server.
 */
export function LeadForm({ form: f, locale }: { form: Dictionary["cta"]["form"]; locale: Locale }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Fire once, when the visitor first engages with the form.
  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track(AnalyticsEvent.leadFormStart, { language: locale });
  }

  // On success the form is replaced by a confirmation — move focus to its
  // heading so screen-reader + keyboard users land on the new content.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  function update(key: keyof typeof emptyValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function collectUtm(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ["source", "medium", "campaign", "term", "content"]) {
      const value = params.get(`utm_${key}`);
      if (value) utm[key] = value;
    }
    return utm;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const input = { ...values, interestedSolution: SOLUTION };
    // The form has no email field, so a missing phone is a phone error.
    const fieldErrors = validateLead(input, f.validation, f.options.map((option) => option.value));
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      const first = FIELD_IDS.find(([field]) => fieldErrors[field]);
      if (first) document.getElementById(first[1])?.focus();
      return;
    }

    // Metadata only — never PII.
    track(AnalyticsEvent.leadFormSubmit, { interested_solution: SOLUTION, language: locale });
    setStatus("submitting");
    try {
      const payload: LeadInput = {
        name: values.name,
        phone: values.phone,
        interestedSolution: SOLUTION,
        message: values.message,
        consent: true, // submitting the form is the consent (see the note under the button)
        website: values.website,
        locale,
        sourcePage: window.location.pathname,
        utm: collectUtm(),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      track(AnalyticsEvent.leadFormSuccess, { interested_solution: SOLUTION, language: locale });
      setStatus("success");
      setValues(emptyValues);
    } catch {
      track(AnalyticsEvent.leadFormError, { language: locale });
      setStatus("error");
    }
  }

  const panel = "premium-panel premium-card rounded-card border-edge-strong p-6 sm:p-8";

  if (status === "success") {
    return (
      <div className={`${panel} flex flex-col items-center gap-4 text-center`}>
        <span className="approve-done inline-flex h-14 w-14 items-center justify-center rounded-pill bg-accent-soft text-state-success-text">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-xl font-bold text-content-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {f.successTitle}
        </h3>
        <p className="leading-relaxed text-content-secondary">{f.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstInteraction} noValidate className={`${panel} flex flex-col gap-5`}>
      <FormField
        id="lead-phone"
        name="phone"
        type="tel"
        label={f.phoneLabel}
        placeholder={f.phonePlaceholder}
        value={values.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
        autoComplete="tel"
        required
      />
      <TextAreaField
        id="lead-message"
        name="message"
        label={f.messageLabel}
        placeholder={f.messagePlaceholder}
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
        required
        rows={4}
      />
      <FormField
        id="lead-name"
        name="name"
        label={f.nameLabel}
        hint={f.optional}
        placeholder={f.namePlaceholder}
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
        autoComplete="name"
      />

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {status === "error" ? (
        <div role="alert" className="rounded-lg border border-state-danger bg-surface-secondary px-4 py-3 text-sm text-content-primary">
          <strong className="font-semibold">{f.errorTitle}. </strong>
          {f.errorBody}
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? f.submitting : f.submit}
      </Button>

      {/* Consent statement the user actually sees — matches the stored consent. */}
      <p className="text-sm leading-relaxed text-content-muted">
        {f.consentBefore}
        <Link href={`/${locale}/privacy`} className="underline underline-offset-2 hover:text-content-primary">
          {f.privacyLinkLabel}
        </Link>
        {f.consentAfter}
        {f.replyTime ? ` ${f.replyTime}` : null}
      </p>
    </form>
  );
}
