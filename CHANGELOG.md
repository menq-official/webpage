# MenQ Webpage — Changelog / Փոփոխությունների պատմություն

## 2026-10-07 — MenQ brand layer consumed (pinned)
### Հայերեն
- Ընդհանուր բրենդային արժեքները գալիս են MenQ Standard-ի `tokens.vars.css`-ից (`493a3df`, SHA-256 pin, D-027, CR-0003)։ Local կրկնօրինակները հեռացվեցին, product-local override-ները մնացին։
- 1632 resolved token արժեք 8 context-ում հավասար է adoption-ից առաջվա baseline-ին. տեսքը չի փոխվել։
- CI-ում ավելացվեցին token parity-ի և production runtime-ի (locale, theme, console, axe) evidence check-երը։

### English
- Shared brand values come from MenQ Standard `tokens.vars.css` (`493a3df`, SHA-256 pin, D-027, CR-0003). Local duplicates were removed; product-local overrides remain.
- 1632 resolved token values in 8 contexts equal the pre-adoption baseline; the look is unchanged.
- Added token-parity and production-runtime (locale, theme, console, axe) evidence checks to CI.

## 2026-07-13 — Canonical documentation architecture completed
### Հայերեն
- Ավելացվել է ամբողջական HY/EN root canonical set։
- Ավելացվել են architecture, contracts, governance, data-flow, admin, content/i18n, accessibility, security, testing և release docs։
- Ավելացվել են W-D001–W-D007 detailed decision records։
- Ավելացվել է post-merge closure record և machine-readable Markdown inventory։
- Existing legacy/buildpack/must/QA docs-ը պահպանվել են որպես historical/operational evidence։
- Runtime source չի փոխվել։

### English
- Added the complete HY/EN root canonical set.
- Added architecture, contracts, governance, data-flow, admin, content/i18n, accessibility, security, testing, and release documentation.
- Added detailed W-D001–W-D007 decision records.
- Added the post-merge closure record and machine-readable Markdown inventory.
- Preserved existing legacy, buildpack, must, and QA documentation as historical or operational evidence.
- No runtime source was changed.

## 2026-07-13 — Design Platform adoption merged
### Հայերեն
- PR #1 merge է արվել `d985a5718ed7ec47717fdf271d14580e8eb947cb` commit-ով։
- Validator, lint, typecheck, 24 tests և production build GREEN են։

### English
- PR #1 was merged as commit `d985a5718ed7ec47717fdf271d14580e8eb947cb`.
- Validator, lint, typecheck, 24 tests, and production build are GREEN.

<!-- END: MENQ_WEBPAGE_CHANGELOG -->
