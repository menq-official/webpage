import { describe, it, expect, vi, beforeEach } from "vitest";

let db: { $queryRaw: ReturnType<typeof vi.fn> } | null = null;
vi.mock("@/lib/db/prisma", () => ({ getPrisma: () => db }));

const { GET } = await import("./route");

beforeEach(() => {
  db = null;
});

describe("GET /api/health", () => {
  it("is 200 with db=false when no database is configured", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, db: false });
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("reports db=true when the database answers", async () => {
    db = { $queryRaw: vi.fn().mockResolvedValue([{ "?column?": 1 }]) };
    const res = await GET();
    expect(await res.json()).toEqual({ ok: true, db: true });
  });

  it("stays 200 with db=false and leaks no error detail when the query fails", async () => {
    db = { $queryRaw: vi.fn().mockRejectedValue(new Error("password authentication failed for user x")) };
    const res = await GET();
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: true, db: false });
    expect(text).not.toMatch(/password|user/);
  });
});
