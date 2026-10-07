import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card graphic is Latin-only and shared across HY/EN/RU, but its `alt`
// (og:image:alt) is localized per locale from the dictionary.
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return [{ id: "default", alt: dict.meta.ogImageAlt, size, contentType }];
}

// Brand social card. Latin-only text so it renders with the built-in font
// (no Armenian font fetch needed); used for HY/EN/RU shares alike.
// The official MenQ logo (MenQ Design Platform brand assets, CR-0004/CR-0005).
export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/menq-logo-neon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #0b2540 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logoSrc} alt="MenQ" width={320} height={120} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            <div style={{ display: "flex" }}>AI automation & software solutions</div>
            <div style={{ display: "flex", color: "#22d3ee" }}>for business growth</div>
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#94a3b8" }}>
            CRM · ERP · Dashboards · Web · Workflow automation · AI
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Reduce costs", "Save time", "Win customers", "Stay in control"].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  fontSize: "24px",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "999px",
                  padding: "10px 22px",
                }}
              >
                {chip}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
