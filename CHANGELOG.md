# MenQ Webpage — Changelog / Փոփոխությունների պատմություն

## 2026-10-14 — Business email on the site
### Հայերեն
- Կայքի կոնտակտներում, footer-ում և Google-ի կառուցվածքային տվյալներում հիմա `info@menqstudio.am`-ն է (Google Workspace)։

### English
- The site's contacts, footer and structured data now show `info@menqstudio.am` (Google Workspace).

## 2026-10-14 — AI-first homepage, phase 1
### Հայերեն
- Նոր գլխավոր ուղերձ. «AI-ն աշխատում է 24/7։ Որոշումները՝ դուք»։ Hero-ում ստատիկ dashboard-ի փոխարեն կենդանի դեմո՝ AI գործակալը ստանում է հաղորդագրությունը, պատրաստում է պատասխանը և ուղարկում է միայն հաստատումից հետո (reduced-motion-ի դեպքում՝ ստատիկ վերջնական վիճակ)։
- Նոր բաժիններ՝ «Ձեր բիզնեսի AI թիմը» (4 գործակալ, «անում է ինքնուրույն / հարցնում է ձեզ») և «Ղեկավարը դուք եք։ Միշտ։»։
- Գլխավոր էջը 12 բաժնից դարձավ 9. Pain, Solution, Success, Results և AI բաժինները հանվեցին էջից (կոմպոնենտներն ու տեքստերը մնում են ադմինի համար)։
- Տեքստը վերաշարադրված է երեք լեզվով. մաքուր հայերեն, ուղղված կետադրություն և հարցական նշաններ, «կորչում», «ձեզ» և այլն։ Իրավական էջերից հանված է «MVP placeholder»-ը։
- Mobile-ում sticky CTA-ն այլևս չի ծածկում footer-ը։

### English
- New core message: "AI works 24/7. You make the decisions." The hero's static dashboard is replaced by a live demo: an AI agent receives a message, drafts a reply and sends it only after approval (static final state under reduced motion).
- New sections: "Your business's AI team" (4 agents, "does on its own / asks you") and "You are in charge. Always."
- The homepage goes from 12 sections to 9: Pain, Solution, Success, Results and AI are removed from the page (components and copy stay for the admin).
- Copy rewritten in all three locales: plain Armenian, fixed punctuation and question marks. "MVP placeholder" removed from the legal pages.
- On mobile the sticky CTA no longer covers the footer.

## 2026-10-14 — Real contacts, honest hero, self-hosted deploy
### Հայերեն
- Կոնտակտ՝ իրական հեռախոս և WhatsApp (+374 44 74 74 47)։ Email-ը, Telegram-ը և placeholder սոց. ցանցերը թաքցված են, մինչև իրականները լինեն (`null` ալիքը ոչ մի տեղ չի ցուցադրվում)։
- Hero-ի տակի «248 ակտիվ lead / 1.4K / 2.4ժ» թվերը հեռացվեցին, որովհետև իրական չէին. dashboard-ի նկարը հիմա նշված է որպես «Օրինակ»։
- «Ինչու ընտրել մեզ»՝ «Որակավորումները զարգացնող մասնագետներ»-ը փոխարինվեց «Իրական, աշխատող համակարգեր»-ով, իսկ «Տվյալների ...» կրկնվող քարտը՝ «Թափանցիկ աշխատանք»-ով։
- Կայքը deploy արված է Hetzner + Coolify-ի վրա (OPEN_ITEMS_LOG-ը թարմացված է)։

### English
- Contact: real phone and WhatsApp (+374 44 74 74 47). Email, Telegram and placeholder socials are hidden until real ones exist (a `null` channel renders nowhere).
- The "248 active leads / 1.4K / 2.4h" figures under the hero were removed because they were not real; the dashboard visual is now labelled "Example".
- "Why choose us": "Specialists growing their qualifications" is replaced by "Real, working systems", and the duplicate data card by "Transparent work".
- The site is deployed on Hetzner + Coolify (OPEN_ITEMS_LOG updated).

## 2026-10-08 — Brand icon set
### Հայերեն
- Favicon-ը (ICO + SVG), Apple touch icon-ը և PWA manifest-ը (192/512/maskable) հիմա պաշտոնական Q մարկից են (MenQ-Standard CR-0008)։ CI-ն ստուգում է, որ դրանք հասանելի են։
- Նախորդ PR-ի CI evidence-ը գրանցված է. axe՝ 0 violation բոլոր մակարդակներում։

### English
- The favicon (ICO + SVG), Apple touch icon and PWA manifest (192/512/maskable) now come from the official Q mark (MenQ-Standard CR-0008); CI checks they are served.
- The previous PR's CI evidence is recorded: axe 0 violations at every level.

## 2026-10-08 — Official BrandMark, contrast and glow
### Հայերեն
- BrandMark-ը փոխարինվեց պաշտոնական MenQ մարկով (կլորացված «Men» + neon power-ring Q), OG պատկերը՝ պաշտոնական լոգոյով։
- Light theme-ի կոնտրաստը ուղղվեց brand շերտում (CR-0006), `tokens.vars.css`-ը re-pin արվեց `3eb4af2`-ին. axe՝ 0 violation։
- Contrast section-ի glow/hover-ը անցավ brand արժեքին, legacy quirk-ը հեռացվեց։ CI-ն serious axe violation-ն էլ է RED համարում։

### English
- BrandMark is replaced by the official MenQ mark (rounded "Men" + neon power-ring Q), and the OG image uses the official logo.
- Light-theme contrast was fixed in the brand layer (CR-0006) and `tokens.vars.css` re-pinned to `3eb4af2`; axe reports 0 violations.
- Contrast-section glow/hover moved to the brand value; the legacy quirk is removed. CI now treats serious axe violations as RED.

## 2026-10-08 — M2 pilot
### Հայերեն
- Owner-ը հաստատեց PR #2-ի merge-ը և Webpage-ը բարձրացրեց `M2-pilot`։

### English
- The Owner approved merging PR #2 and promoted Webpage to `M2-pilot`.

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
