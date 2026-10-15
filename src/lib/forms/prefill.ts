import { site } from "@/config/site";

/** Sections can hand the lead form a starting point: a solution and/or the message text. */
export const PREFILL_EVENT = "menq:prefill-lead";

export type LeadPrefill = { solution?: string; message?: string };

export function prefillLead(prefill: LeadPrefill): void {
  window.dispatchEvent(new CustomEvent<LeadPrefill>(PREFILL_EVENT, { detail: prefill }));
  document.getElementById(site.anchors.contact)?.scrollIntoView({ block: "start" });
}
