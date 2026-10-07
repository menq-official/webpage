#!/usr/bin/env node
// Runtime consumer evidence for MenQ Webpage (D-025 / D-027).
// Runs against a production build (`npm run build && npm start`) and measures, per page,
// locale and theme: HTTP status, <html lang>, <html data-theme>, console/page errors,
// that the vendored brand layer is live in the shipped CSS, that the page background is
// the semantic token, and axe-core accessibility violations. Critical axe violations fail.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const base = process.env.MENQ_BASE_URL ?? "http://localhost:3100";
const evidenceDir = process.env.MENQ_EVIDENCE_DIR ?? "e2e-evidence";
mkdirSync(evidenceDir, { recursive: true });
const launch = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
const browser = await chromium.launch(launch);

const pages = [
  ...["hy", "en", "ru"].flatMap((locale) => [`/${locale}`, `/${locale}/privacy`].map((route) => ({ route, locale }))),
  { route: "/admin/login", locale: null },
];
const themes = ["light", "dark"];
const results = [];
const failures = [];

for (const theme of themes) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await context.addCookies([{ name: "menq-theme", value: theme, url: base }]);
  for (const { route, locale } of pages) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    const status = response?.status() ?? 0;
    const probe = await page.evaluate(() => {
      const html = document.documentElement;
      const root = getComputedStyle(html);
      const el = document.createElement("menq-probe");
      document.body.appendChild(el);
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("background-color", "var(--color-page-bg)", "important");
      const pageBg = getComputedStyle(el).backgroundColor;
      el.remove();
      return {
        lang: html.getAttribute("lang"),
        dataTheme: html.getAttribute("data-theme"),
        // Defined only by the vendored brand layer, never by Webpage-local files:
        vendoredLayerLive: root.getPropertyValue("--color-surface-elevated").trim() !== "" && root.getPropertyValue("--z-palette").trim() !== "",
        bodyBg: getComputedStyle(document.body).backgroundColor,
        pageBg,
      };
    });
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
    for (const v of axe.violations) byImpact[v.impact ?? "minor"] += v.nodes.length;
    const row = {
      route, theme, status, ...probe, consoleErrors: consoleErrors.length,
      axe: byImpact, axeRules: axe.violations.map((v) => `${v.id}:${v.impact}`),
    };
    results.push(row);
    const problems = [];
    if (status >= 400) problems.push(`HTTP ${status}`);
    if (locale && probe.lang !== locale) problems.push(`lang=${probe.lang}`);
    if (probe.dataTheme !== theme) problems.push(`data-theme=${probe.dataTheme}`);
    if (!probe.vendoredLayerLive) problems.push("vendored brand layer not present in shipped CSS");
    if (probe.bodyBg !== probe.pageBg) problems.push(`body background ${probe.bodyBg} != --color-page-bg ${probe.pageBg}`);
    if (consoleErrors.length) problems.push(`console errors: ${consoleErrors.slice(0, 2).join(" | ")}`);
    if (byImpact.critical) problems.push(`axe critical: ${row.axeRules.join(", ")}`);
    if (problems.length) failures.push(`${route} [${theme}]: ${problems.join("; ")}`);
    await page.close();
  }
  await context.close();
}
await browser.close();

const totals = results.reduce((acc, r) => { for (const k of Object.keys(r.axe)) acc[k] = (acc[k] ?? 0) + r.axe[k]; return acc; }, {});
const evidence = {
  schemaVersion: 1,
  evidenceType: "menq-webpage-runtime-consumer-evidence",
  consumerId: "menq.webpage.public-site-admin",
  sourceCommit: process.env.GITHUB_SHA ?? "local",
  workflowRun: process.env.GITHUB_RUN_ID ?? null,
  verdict: failures.length ? "RED" : "GREEN",
  checks: results.length,
  axeTotals: totals,
  failures,
  results,
};
writeFileSync(path.join(evidenceDir, "runtime-consumer-evidence.json"), JSON.stringify(evidence, null, 2) + "\n");
console.log(`MENQ WEBPAGE RUNTIME EVIDENCE: ${evidence.verdict} (${results.length} page×theme checks; axe totals ${JSON.stringify(totals)})`);
for (const f of failures) console.log(`- ${f}`);
process.exit(failures.length ? 1 : 0);
