#!/usr/bin/env node
// Verifies MenQ Webpage's consumption of the MenQ brand expression layer (D-027):
//   1. the vendored tokens.vars.css matches its pinned upstream SHA-256 (no silent fork);
//   2. globals.css imports the vendored layer before every local token file;
//   3. compiled CSS resolves every pre-adoption token to the same value in 8 contexts
//      (light / dark / no theme / OS dark × page / contrast section).
// Measured in a real browser; nothing here is self-declared.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const vendorDir = path.join(root, "src/styles/vendor/menq-brand-expression");
const errors = [];

// 1. Pin
const upstream = JSON.parse(readFileSync(path.join(vendorDir, "UPSTREAM.json"), "utf8"));
const vendored = readFileSync(path.join(vendorDir, "tokens.vars.css"));
const digest = createHash("sha256").update(vendored).digest("hex");
if (digest !== upstream.sha256) errors.push(`vendored tokens.vars.css sha256 ${digest} != pinned ${upstream.sha256} (edited by hand?)`);
if (!/^[0-9a-f]{40}$/.test(upstream.commit)) errors.push("UPSTREAM.json commit must be a full SHA");

// 2. Import order
const globals = readFileSync(path.join(root, "src/app/globals.css"), "utf8");
const imports = [...globals.matchAll(/@import\s+"([^"]+)"/g)].map((m) => m[1]);
if (!imports[0]?.endsWith("vendor/menq-brand-expression/tokens.vars.css")) {
  errors.push("globals.css must import vendor/menq-brand-expression/tokens.vars.css first");
}

// 3. Token parity against the pre-adoption baseline
const work = mkdtempSync(path.join(tmpdir(), "menq-tokens-"));
const compiled = path.join(work, "compiled.css");
execFileSync(path.join(root, "node_modules/.bin/tailwindcss"), ["-i", "src/app/globals.css", "-o", compiled], { cwd: root, stdio: "pipe" });
const css = readFileSync(compiled, "utf8");
const baseline = JSON.parse(readFileSync(path.join(root, "docs/menq-standard/evidence/brand-token-baseline.json"), "utf8")).contexts;
const names = [...new Set(Object.values(baseline).flatMap((ctx) => Object.keys(ctx)))].sort();

const launch = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launch);
const page = await browser.newPage();
const measured = {};
for (const theme of ["light", "dark", null, "os-dark"]) {
  await page.emulateMedia({ colorScheme: theme === "os-dark" ? "dark" : "light" });
  const attr = theme && theme !== "os-dark" ? ` data-theme="${theme}"` : "";
  await page.setContent(`<!doctype html><html${attr}><head><style>${css}</style></head><body><div id="plain"></div><section class="section-contrast"><div id="contrast"></div></section></body></html>`);
  for (const id of ["plain", "contrast"]) {
    measured[`${theme ?? "none"}:${id}`] = await page.evaluate(({ id, names }) => {
      const host = document.getElementById(id);
      const cs = getComputedStyle(host);
      const probe = document.createElement("menq-probe");
      host.appendChild(probe);
      probe.style.setProperty("transition", "none", "important");
      const out = {};
      for (const n of names) {
        const raw = cs.getPropertyValue(n).trim().replace(/\s+/g, " ");
        probe.style.removeProperty("background-color");
        probe.style.setProperty("background-color", `var(${n})`, "important");
        const color = getComputedStyle(probe).backgroundColor;
        if (color !== "rgba(0, 0, 0, 0)") { out[n] = color; continue; }
        probe.style.removeProperty("box-shadow");
        probe.style.setProperty("box-shadow", `var(${n})`, "important");
        const shadow = getComputedStyle(probe).boxShadow;
        out[n] = shadow && shadow !== "none" ? `shadow:${shadow}` : raw;
      }
      probe.remove();
      return out;
    }, { id, names });
  }
}
await browser.close();

// Colors may serialize as rgb(), rgba() or color(srgb ...); compare channel values at 8-bit precision.
const COLOR = /rgba?\(([^)]*)\)|color\(srgb ([^)]*)\)/g;
const normalize = (value) => (value ?? "").replace(COLOR, (_, rgb, srgb) => {
  const parts = (rgb ?? srgb).trim().split(/[\s,/]+/).filter(Boolean).map(Number);
  const scale = srgb ? 255 : 1;
  const [r, g, b] = parts.slice(0, 3).map((v) => Math.round(v * scale));
  const a = parts.length > 3 ? parts[3].toFixed(2) : "1.00";
  return `C(${r},${g},${b},${a})`;
});
let compared = 0;
for (const [ctx, values] of Object.entries(baseline)) {
  for (const [name, expected] of Object.entries(values)) {
    compared += 1;
    if (normalize(measured[ctx]?.[name]) !== normalize(expected)) {
      errors.push(`${ctx} ${name}: expected ${expected}, got ${measured[ctx]?.[name]}`);
    }
  }
}

const report = {
  verdict: errors.length ? "RED" : "GREEN",
  upstream: { repository: upstream.repository, commit: upstream.commit, path: upstream.path, sha256: digest },
  contexts: Object.keys(baseline).length,
  comparedValues: compared,
  mismatches: errors.length,
};
if (process.env.MENQ_EVIDENCE_DIR) writeFileSync(path.join(process.env.MENQ_EVIDENCE_DIR, "brand-token-parity.json"), JSON.stringify(report, null, 2) + "\n");
if (errors.length) {
  console.log("MENQ BRAND TOKEN CONSUMPTION: RED");
  for (const error of errors.slice(0, 50)) console.log(`- ${error}`);
  process.exit(1);
}
console.log(`MENQ BRAND TOKEN CONSUMPTION: GREEN (pinned ${upstream.commit.slice(0, 7)}, ${compared} values in ${report.contexts} contexts match the pre-adoption baseline)`);
