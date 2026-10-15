import { describe, it, expect } from "vitest";
import { retentionCutoff, RETENTION_MONTHS } from "@/lib/retention/purge";

describe("retentionCutoff", () => {
  it("is 24 months before now, as the Privacy policy says", () => {
    expect(RETENTION_MONTHS).toBe(24);
    expect(retentionCutoff(new Date("2026-10-15T12:00:00Z")).toISOString()).toBe(
      "2024-10-15T12:00:00.000Z",
    );
  });

  it("never keeps less than the promised period", () => {
    for (const now of ["2026-03-31T00:00:00Z", "2028-02-29T00:00:00Z", "2026-12-31T23:59:59Z"]) {
      const days = (Date.parse(now) - retentionCutoff(new Date(now)).getTime()) / 86_400_000;
      expect(days, now).toBeGreaterThanOrEqual(728);
      expect(days, now).toBeLessThanOrEqual(732);
    }
  });
});
