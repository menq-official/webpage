# MenQ Webpage — Brand Token Consumption / Brand token-ների օգտագործում

**Status / Կարգավիճակ:** Implemented — awaiting CI runtime evidence / Իրականացված — սպասում է CI runtime evidence-ին  
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

### Պահպանված հին վարքագիծ

Light theme-ում contrast section-ի ներսում glow/hover shadow-ները adoption-ից առաջ օգտագործում էին `cyan-500`։ Brand շերտը դրանք լուծում է section-ի ներսում (`cyan-400`)։ Տեսքը չփոխելու համար `sections.css`-ը պահում է հին արժեքը, մինչև Owner-ը որոշի։

### Maturity

Webpage-ը մնում է `M1-candidate`։ CI evidence-ը GREEN լինելուց հետո promotion-ը (M2) Owner-ի որոշումն է։

## English

### What changed

Webpage no longer keeps its own copy of the shared MenQ brand values. Colors, spacing, radius, shadows, z-index, durations and easings come from the MenQ Standard brand expression layer through `src/styles/vendor/menq-brand-expression/tokens.vars.css`. The file is pinned by upstream commit and SHA-256 in `UPSTREAM.json` and is never edited by hand. `globals.css` imports it before every local token file.

The local files (`primitives`, `semantic`, `components`, `motion`, `sections`) keep only Webpage's own tokens and product-local overrides (for example the OS dark-mode media rule and the navy contrast-section surfaces).

### How it is verified

1. `scripts/verify_brand_tokens.mjs` checks the pin (SHA-256) and import order, and measures 1632 resolved values in 8 contexts (light, dark, no theme, OS dark × page and contrast section) in a real browser. All must equal the pre-adoption baseline (`evidence/brand-token-baseline.json`).
2. `scripts/e2e_consumer_smoke.mjs` runs against the production server and checks `/hy`, `/en`, `/ru`, the privacy pages and the admin login in both themes: HTTP status, `lang`, `data-theme`, console errors, that the vendored layer is present in the shipped CSS, that the page background is the semantic token, and axe-core accessibility violations. A critical violation is RED.

Both run in CI, and the evidence is stored in the audit artifact.

### Preserved legacy behavior

Before adoption, the glow/hover shadows inside a contrast section in the light theme used `cyan-500`. The brand layer resolves them inside the section (`cyan-400`). To keep the look unchanged, `sections.css` keeps the old value until the Owner decides.

### Maturity

Webpage remains `M1-candidate`. Promotion (M2) after GREEN CI evidence is an Owner decision.

<!-- END: MENQ_WEBPAGE_BRAND_TOKEN_CONSUMPTION -->
