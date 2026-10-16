import { describe, it, expect, afterEach } from "vitest";
import { clientIp } from "@/lib/http/clientIp";

function headers(map: Record<string, string>) {
  return {
    get(name: string): string | null {
      return map[name.toLowerCase()] ?? null;
    },
  };
}

describe("clientIp", () => {
  const orig = process.env.TRUSTED_PROXY_COUNT;
  afterEach(() => {
    if (orig === undefined) delete process.env.TRUSTED_PROXY_COUNT;
    else process.env.TRUSTED_PROXY_COUNT = orig;
  });

  it("returns the last (trusted) hop with a single proxy", () => {
    process.env.TRUSTED_PROXY_COUNT = "1";
    expect(clientIp(headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("2.2.2.2");
  });

  it("ignores a spoofed leftmost entry", () => {
    process.env.TRUSTED_PROXY_COUNT = "1";
    expect(
      clientIp(headers({ "x-forwarded-for": "9.9.9.9, 3.3.3.3, 4.4.4.4" })),
    ).toBe("4.4.4.4");
  });

  it("honors TRUSTED_PROXY_COUNT=2", () => {
    process.env.TRUSTED_PROXY_COUNT = "2";
    expect(
      clientIp(headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2, 3.3.3.3" })),
    ).toBe("2.2.2.2");
  });

  it("falls back to x-real-ip when no XFF", () => {
    expect(clientIp(headers({ "x-real-ip": "5.5.5.5" }))).toBe("5.5.5.5");
  });

  it("prefers CF-Connecting-IP (set by Cloudflare) over XFF", () => {
    process.env.TRUSTED_PROXY_COUNT = "1";
    expect(
      clientIp(
        headers({
          "cf-connecting-ip": "7.7.7.7",
          "x-forwarded-for": "7.7.7.7, 172.68.0.1",
        }),
      ),
    ).toBe("7.7.7.7");
  });

  it("falls back to the XFF logic when CF-Connecting-IP is absent or empty", () => {
    process.env.TRUSTED_PROXY_COUNT = "1";
    expect(
      clientIp(headers({ "cf-connecting-ip": " ", "x-forwarded-for": "1.1.1.1, 2.2.2.2" })),
    ).toBe("2.2.2.2");
  });

  it("returns 'unknown' when nothing is present", () => {
    expect(clientIp(headers({}))).toBe("unknown");
  });
});
