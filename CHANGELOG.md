# MenQ Webpage — Changelog / Փոփոխությունների պատմություն

## 2026-10-15 — Website copy v2
### Հայերեն
- Կայքի տեքստը փոխարինված է copy v2-ով (EN՝ նախագծից, HY/RU՝ նույն իմաստով). «Ամենօրյա աշխատանքը՝ ավելի պարզ ու կանոնավոր»։ Ծրագրեր, կայքեր, գործընթացներ, AI-ով աջակցվող ավտոմատացում՝ որպես հնարավորություններից մեկը։
- Հանված են երաշխիքները, «անվճար»-ը, օրինակային անուններն ու գները. դեմոն մեկ պիտակված օրինակ է, խաղում է մինչև «Սպասում է ստուգման», հաստատողը մարդն է։
- Էջից հանված են AI թիմի և մուգ վահանակի բաժինները (կոմպոնենտները մնում են). նոր՝ 3 արժեք hero-ի տակ, «Ում հետ ենք աշխատում», օրինակների «Խնդիր / Հնարավոր մոտեցում»։
- Client կոմպոնենտները ստանում են միայն իրենց տեքստը. ամբողջ dictionary-ն այլևս չի գնում բրաուզեր (աուդիտ #44)։
- Hero-ի grid-ը չի լայնանում երկար վերնագրից (HY 390px-ում 19px overflow-ն ուղղված է)։

### English
- The site copy is replaced by copy v2 (EN from the draft, HY/RU adapted): "Make everyday work run more clearly." Software, websites, workflows, with AI-assisted automation as one capability.
- Guarantees, "free", sample names and prices are gone; the demo is one labelled sample that plays up to "Awaiting review" and waits for a person to approve.
- The AI team and dark dashboard sections are off the page (components kept); new: three value points under the hero, "Who we work with", examples as "Challenge / Possible approach".
- Client components receive only their own copy, so the full dictionary no longer ships to the browser (audit #44).
- The hero grid no longer widens from a long title (19px overflow at 390px in HY fixed).

## 2026-10-15 — Homepage v2
### Հայերեն
- Գլխավոր էջը նոր դիզայնով է (v2). hero + կենդանի կոնսոլ (Կլինիկա / Խանութ / Սերվիս, Խմբագրել / Հաստատել), 4 քայլ, AI թիմ (անում է ինքը / հարցնում է), մուգ վահանակ աշխատող անջատիչով, լուծումներ (bento) + ոլորտներ, օրինակներ, գործընթաց, FAQ, ձև, footer։
- Կոնսոլն ինքն է խաղում, սեղմելիս կանգնում է, դադարի կոճակ ունի։ Վահանակի «Հենց հիմա» տողը կանգնում է անջատիչով։ Շարժումը միայն CSS է, reduced-motion-ի և էկրանից դուրս՝ կանգնած։
- Ձևը՝ հեռախոս, «ի՞նչ անի AI-ն», անուն (ոչ պարտադիր). նույն lead flow-ն է (նախ DB, հետո ծանուցում), լուծումը՝ «խորհրդատվություն»։ Անունը server-ում էլ ոչ պարտադիր է. admin-ում և ծանուցումներում դատարկ անունը «—» է։
- Օրինակային տվյալները պիտակված են «Օրինակ»։ Պատասխանի ժամկետը դատարկ է և չի ցուցադրվում, մինչև Գևը տա։
- Բոլոր տեքստերը HY / EN / RU dictionary-ում են. գույներ, տարածություններ, radius-ներ՝ token-ներից։ Trust բաժինը էջից հանված է (կոմպոնենտը մնում է)։

### English
- The homepage has the new design (v2): hero + live console (Clinic / Shop / Service, Edit / Approve), four steps, AI team (does on its own / asks you), a dark dashboard with a working stop switch, solutions bento + industries, examples, process, FAQ, form, footer.
- The console plays by itself, stops when clicked and has a pause button. The dashboard's "Right now" line stops with the switch. Motion is CSS only and stays still under reduced motion and off screen.
- The form asks for a phone, what the AI should do and an optional name; it uses the same lead flow (DB first, then notifications) with the "consultation" solution. The name is optional on the server too; admin and notifications show an empty name as "—".
- Sample data is labelled "Sample". The reply time is empty and hidden until Gev sets it.
- All copy lives in the HY / EN / RU dictionaries; colors, spacing and radii come from tokens. The Trust section is off the page (the component stays).

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
- Light theme-ի կոնտրաստը ուղղվեց brand շերտում (CR-0006), `tokens.vars.css`-ը re-pin արվեց `b49a0a4`-ին. axe՝ 0 violation։
- Contrast section-ի glow/hover-ը անցավ brand արժեքին, legacy quirk-ը հեռացվեց։ CI-ն serious axe violation-ն էլ է RED համարում։

### English
- BrandMark is replaced by the official MenQ mark (rounded "Men" + neon power-ring Q), and the OG image uses the official logo.
- Light-theme contrast was fixed in the brand layer (CR-0006) and `tokens.vars.css` re-pinned to `b49a0a4`; axe reports 0 violations.
- Contrast-section glow/hover moved to the brand value; the legacy quirk is removed. CI now treats serious axe violations as RED.

## 2026-10-08 — M2 pilot
### Հայերեն
- Owner-ը հաստատեց PR #2-ի merge-ը և Webpage-ը բարձրացրեց `M2-pilot`։

### English
- The Owner approved merging PR #2 and promoted Webpage to `M2-pilot`.

## 2026-10-07 — MenQ brand layer consumed (pinned)
### Հայերեն
- Ընդհանուր բրենդային արժեքները գալիս են MenQ Standard-ի `tokens.vars.css`-ից (`bfd0219`, SHA-256 pin, D-027, CR-0003)։ Local կրկնօրինակները հեռացվեցին, product-local override-ները մնացին։
- 1632 resolved token արժեք 8 context-ում հավասար է adoption-ից առաջվա baseline-ին. տեսքը չի փոխվել։
- CI-ում ավելացվեցին token parity-ի և production runtime-ի (locale, theme, console, axe) evidence check-երը։

### English
- Shared brand values come from MenQ Standard `tokens.vars.css` (`bfd0219`, SHA-256 pin, D-027, CR-0003). Local duplicates were removed; product-local overrides remain.
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
- PR #1 merge է արվել `56c991bfca19b9b5b16860a94e8fe3399f76b5dd` commit-ով։
- Validator, lint, typecheck, 24 tests և production build GREEN են։

### English
- PR #1 was merged as commit `56c991bfca19b9b5b16860a94e8fe3399f76b5dd`.
- Validator, lint, typecheck, 24 tests, and production build are GREEN.

<!-- END: MENQ_WEBPAGE_CHANGELOG -->
