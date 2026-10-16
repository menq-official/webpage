import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const createLead = vi.fn();
vi.mock("@/lib/leads/createLead", () => ({ createLead: (...a: unknown[]) => createLead(...a) }));
vi.mock("@/lib/db/systemEvents", () => ({ logSystemEvent: vi.fn() }));

const { POST } = await import("./route");

const URL = "http://localhost/api/leads";
let ipSeq = 0;
/** Unique visitor IP per test so the in-memory limiter never leaks between tests. */
function nextIp(): string {
  ipSeq += 1;
  return `203.0.113.${ipSeq}`;
}

function post(body: BodyInit | null, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest(URL, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
    // Required by undici for streamed request bodies.
    ...(body instanceof ReadableStream ? { duplex: "half" } : {}),
  } as NonNullable<ConstructorParameters<typeof NextRequest>[1]>);
}

function validLead(n: number) {
  return JSON.stringify({
    name: "Test Visitor",
    phone: `+3749100${String(1000 + n)}`,
    interestedSolution: "crm",
    message: "We need a CRM for our shop, please call.",
    consent: true,
    locale: "en",
  });
}

beforeEach(() => {
  createLead.mockReset();
  createLead.mockResolvedValue({ ok: true, leadId: "l1", persisted: true, duplicate: false });
});

describe("POST /api/leads body handling", () => {
  it("returns 400 (not 500) for a JSON `null` body", async () => {
    const res = await POST(post("null", { "cf-connecting-ip": nextIp() }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "INVALID_JSON" });
  });

  it.each(["[]", "42", '"text"', "true"])("returns 400 for non-object JSON %s", async (b) => {
    const res = await POST(post(b, { "cf-connecting-ip": nextIp() }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await POST(post("not-json", { "cf-connecting-ip": nextIp() }));
    expect(res.status).toBe(400);
  });

  it("rejects an over-cap body sent without content-length (chunked)", async () => {
    const chunk = new TextEncoder().encode("x".repeat(10_000));
    let sent = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (sent >= 6) return controller.close(); // 60 KB total
        sent += 1;
        controller.enqueue(chunk);
      },
    });
    const req = post(stream, { "cf-connecting-ip": nextIp() });
    expect(req.headers.get("content-length")).toBeNull();
    const res = await POST(req);
    expect(res.status).toBe(413);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("still rejects by content-length header up front", async () => {
    const res = await POST(
      post("{}", { "cf-connecting-ip": nextIp(), "content-length": "60000" }),
    );
    expect(res.status).toBe(413);
  });

  it("accepts a valid lead", async () => {
    const res = await POST(post(validLead(1), { "cf-connecting-ip": nextIp() }));
    expect(res.status).toBe(200);
    expect(createLead).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/leads rate limiting", () => {
  it("keys on CF-Connecting-IP, not on the shared proxy hop", async () => {
    // Same Cloudflare edge hop in XFF for everyone; different real visitors.
    const proxyHop = { "x-forwarded-for": "198.51.100.7" };
    for (let i = 0; i < 6; i++) {
      const res = await POST(
        post(validLead(100 + i), { ...proxyHop, "cf-connecting-ip": nextIp() }),
      );
      expect(res.status, `visitor ${i}`).toBe(200);
    }
  });

  it("limits one visitor to 5 accepted submissions per 10 minutes", async () => {
    const ip = nextIp();
    for (let i = 0; i < 5; i++) {
      const res = await POST(post(validLead(200 + i), { "cf-connecting-ip": ip }));
      expect(res.status).toBe(200);
    }
    const res = await POST(post(validLead(205), { "cf-connecting-ip": ip }));
    expect(res.status).toBe(429);
  });

  it("does not count invalid submissions toward the limit", async () => {
    const ip = nextIp();
    const invalid = JSON.stringify({ message: "short", locale: "en" });
    for (let i = 0; i < 8; i++) {
      const res = await POST(post(invalid, { "cf-connecting-ip": ip }));
      expect(res.status).toBe(400);
    }
    const res = await POST(post(validLead(300), { "cf-connecting-ip": ip }));
    expect(res.status).toBe(200);
  });
});
