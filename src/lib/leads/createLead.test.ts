import { describe, it, expect, vi, beforeEach } from "vitest";

const logSystemEvent = vi.fn();
const sendLeadEmail = vi.fn();
const sendLeadTelegram = vi.fn();
vi.mock("@/lib/db/prisma", () => ({ getPrisma: () => null }));
vi.mock("@/lib/db/systemEvents", () => ({ logSystemEvent: (...a: unknown[]) => logSystemEvent(...a) }));
vi.mock("@/lib/integrations/email", () => ({ sendLeadEmail: (...a: unknown[]) => sendLeadEmail(...a) }));
vi.mock("@/lib/integrations/telegram", () => ({
  sendLeadTelegram: (...a: unknown[]) => sendLeadTelegram(...a),
}));

const { createLead } = await import("./createLead");

const input = {
  name: "Visitor",
  phone: "+37491001001",
  interestedSolution: "crm",
  message: "Please call me about a CRM.",
  consent: true,
  locale: "en" as const,
};

function events(type: string) {
  return logSystemEvent.mock.calls.map((c) => c[0]).filter((e) => e.eventType === type);
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("createLead notification visibility", () => {
  it("writes a WARNING system event when no channel is configured", async () => {
    sendLeadEmail.mockResolvedValue({ channel: "email", outcome: "skipped" });
    sendLeadTelegram.mockResolvedValue({ channel: "telegram", outcome: "skipped" });
    const r = await createLead(input);
    expect(r.ok).toBe(true);
    const skipped = events("lead.notify_skipped");
    expect(skipped).toHaveLength(1);
    expect(skipped[0].severity).toBe("WARNING");
  });

  it("does not warn when at least one channel sent", async () => {
    sendLeadEmail.mockResolvedValue({ channel: "email", outcome: "skipped" });
    sendLeadTelegram.mockResolvedValue({ channel: "telegram", outcome: "sent" });
    await createLead(input);
    expect(events("lead.notify_skipped")).toHaveLength(0);
  });

  it("still logs failures as ERROR", async () => {
    sendLeadEmail.mockResolvedValue({ channel: "email", outcome: "failed", error: "x" });
    sendLeadTelegram.mockResolvedValue({ channel: "telegram", outcome: "skipped" });
    await createLead(input);
    expect(events("lead.notify_email_failed")[0].severity).toBe("ERROR");
    expect(events("lead.notify_skipped")).toHaveLength(0);
  });
});
