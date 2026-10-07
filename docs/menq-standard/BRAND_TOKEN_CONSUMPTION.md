# MenQ Webpage — Brand Token Consumption / Brand token-ների օգտագործում

**Status / Կարգավիճակ:** Validated — CI GREEN (run `37682218097`) / Ստուգված — CI GREEN (run `37682218097`)  
**Date / Ամսաթիվ:** 2026-10-07  
**Parent decisions / Ծնող որոշումներ:** `D-025` (Locked), `D-027`  
**Upstream change request:** `CR-0003` (`menqstudio/MenQ-Standard`)

## Հայերեն

### Ինչ է փոխվել

Webpage-ը այլևս ինքնուրույն չի պահում MenQ բրենդի ընդհանուր արժեքները։ Գույները, spacing-ը, radius-ը, shadow-ները, z-index-ը, duration-ներն ու easing-ները գալիս են MenQ Standard-ի brand expression շերտից՝ `src/styles/vendor/menq-brand-expression/tokens.vars.css` ֆայլով։ Ֆայլը pinned է upstream commit-ով և SHA-256-ով `UPSTREAM.json`-ում և ձեռքով չի խմբագրվում։ `globals.css`-ը այն import է անում բոլոր local token ֆայլերից առաջ։

Local ֆայլերում (`primitives`, `semantic`, `components`, `motion`, `sections`) մնացել են միայն Webpage-ի սեփական token-ները և product-local override-ները (օր.՝ OS dark mode-ի media rule-ը և contrast section-ի navy մակերեսները)։

### Ինչպես է ստուգվում

1. `scripts/verify_brand_tokens.mjs` — ստուգում է pin-ը (SHA-256), import-ի հերթականությունը և իրական browser-ում չափում է 1632 resolved արժեք 8 context-ում (light, dark, առանց theme, OS dark × էջ և contrast section)։ Բոլորը պետք է հավասար լինեն adoption-ից առաջվա baseline-ին (`evidence/brand-token-baseline.json`)։
2. `scripts/e2e_consumer_smoke.mjs` — production server-ի վրա ստուգում է `/hy`, `/en`, `/ru`, privacy էջերը և admin login-ը երկու theme-ով՝ HTTP status, `lang`, `data-theme`, console error-ներ, որ vendored շերտը իրական CSS-ում է, որ էջի ֆոնը semantic token-ն է, և axe-core accessibility violation-ները։ Critical violation-ը RED է։

Երկուսն էլ գործարկվում են CI-ում և evidence-ը պահվում է audit artifact-ում։

### CI արդյունք

Run `37682218097`-ում token parity-ն GREEN է (1632/1632), runtime evidence-ը GREEN է (14 էջ×theme ստուգում), axe-ը՝ 0 critical, 7 serious։ Բոլոր 7 serious-ը `color-contrast` է light theme-ում, ամեն էջում. դա adoption-ից առաջ էլ կար (token արժեքները չեն փոխվել), և ուղղումը Owner-ի design որոշում է։

### 2026-10-08 փոփոխություններ

- Owner-ի որոշմամբ contrast section-ի glow/hover shadow-ները light theme-ում անցան brand արժեքին (`cyan-400`)։ Հին quirk-ը հեռացված է։
- Light theme-ի `color-contrast` խնդիրը (սպիտակ տեքստ `#0284c7`-ի վրա, 4.09:1) ուղղվեց brand շերտում (CR-0006)՝ `#0369a1` (5.9:1)։ Webpage-ը re-pin արեց `tokens.vars.css`-ը և հեռացրեց իր light override-ը։ axe-ը՝ 0 violation 14 էջ×theme ստուգումում, և CI-ն այժմ serious violation-ն էլ է RED համարում։
- BrandMark-ը փոխարինվեց պաշտոնական մարկով (CR-0005), OG պատկերը՝ պաշտոնական լոգոյով։
- Baseline-ի բոլոր դիտավորյալ փոփոխությունները գրանցված են `brand-token-baseline.json`-ի `intentionalChanges`-ում։

### Maturity

Owner-ը 2026-10-08-ին Webpage-ը բարձրացրեց `M2-pilot`։ M3-ը պահանջում է light theme-ի `color-contrast` ուղղումը։

## English

### What changed

Webpage no longer keeps its own copy of the shared MenQ brand values. Colors, spacing, radius, shadows, z-index, durations and easings come from the MenQ Standard brand expression layer through `src/styles/vendor/menq-brand-expression/tokens.vars.css`. The file is pinned by upstream commit and SHA-256 in `UPSTREAM.json` and is never edited by hand. `globals.css` imports it before every local token file.

The local files (`primitives`, `semantic`, `components`, `motion`, `sections`) keep only Webpage's own tokens and product-local overrides (for example the OS dark-mode media rule and the navy contrast-section surfaces).

### How it is verified

1. `scripts/verify_brand_tokens.mjs` checks the pin (SHA-256) and import order, and measures 1632 resolved values in 8 contexts (light, dark, no theme, OS dark × page and contrast section) in a real browser. All must equal the pre-adoption baseline (`evidence/brand-token-baseline.json`).
2. `scripts/e2e_consumer_smoke.mjs` runs against the production server and checks `/hy`, `/en`, `/ru`, the privacy pages and the admin login in both themes: HTTP status, `lang`, `data-theme`, console errors, that the vendored layer is present in the shipped CSS, that the page background is the semantic token, and axe-core accessibility violations. A critical violation is RED.

Both run in CI, and the evidence is stored in the audit artifact.

### CI result

In run `37682218097`, token parity is GREEN (1632/1632) and runtime evidence is GREEN (14 page×theme checks); axe reports 0 critical and 7 serious. All 7 serious findings are `color-contrast` in the light theme on every page. They existed before adoption (token values are unchanged), and the fix is an Owner design decision.

### 2026-10-08 changes

- By Owner decision, the contrast-section glow/hover shadows in the light theme moved to the brand value (`cyan-400`); the legacy quirk is removed.
- The light-theme `color-contrast` finding (white text on `#0284c7`, 4.09:1) was fixed in the brand layer (CR-0006) with `#0369a1` (5.9:1). Webpage re-pinned `tokens.vars.css` and removed its own light override. axe reports 0 violations in 14 page×theme checks, and CI now treats serious violations as RED too.
- BrandMark is replaced by the official mark (CR-0005), and the OG image uses the official logo.
- Every intentional baseline change is recorded in `intentionalChanges` in `brand-token-baseline.json`.

### Maturity

On 2026-10-08 the Owner promoted Webpage to `M2-pilot`. M3 requires fixing the light-theme `color-contrast` findings.

<!-- END: MENQ_WEBPAGE_BRAND_TOKEN_CONSUMPTION -->
