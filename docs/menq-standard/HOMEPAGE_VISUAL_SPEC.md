# MenQ Webpage — Homepage Visual Specification / MenQ Webpage — Գլխավոր էջի վիզուալ սպեցիֆիկացիա

**Status / Կարգավիճակ:** Implemented v2 / Ներդրված v2

## Հայերեն

### Direction

Premium, warm, modern AI-business visual language՝ restrained futuristic expression-ով։ Design-ը չի հիմնվում միայն գույնի վրա․ hierarchy-ն կառուցվում է layout, spacing, typography, borders, depth, motion և data-display composition-ով։

### Rules

- Header՝ մուգ ապակե մակերես երկու թեմայում էլ, 4 բաժնի nav, MenQ BrandMark։
- Hero՝ outcome copy + dual CTA + trust line + կենդանի կոնսոլ (Կլինիկա / Խանութ / Սերվիս). ինքն է խաղում, այցելուի սեղմումով կանգնում է, դադարի կոճակ ունի + 3 փաստ։
- Հերթականություն՝ hero → 4 քայլ → AI թիմ → մուգ վահանակ (աշխատող անջատիչ) → bento + ոլորտներ → օրինակներ → գործընթաց → FAQ → ձև → footer։ Մուգ բաժիններ՝ hero, վահանակ, ձև, footer. մնացածը թեմայով։
- Օրինակային տվյալները (անուններ, 10%, 8 000 ֏) պիտակված են «Օրինակ»։ Նմուշը՝ `menqstudio/Webpage`, branch `design/v2-reference`, `docs/design/v2/index.html`։
- Cards՝ premium borders, top rule, subtle depth և governed hover lift։
- Contrast sections՝ dark scoped semantic environment և readable dark panels։
- Motion՝ միայն CSS (transform/opacity), governed tokens + spring `linear()`. բաժինները բարձրանում են scroll-ով, կոնսոլն ու վահանակը կանգնում են էկրանից դուրս և reduced-motion-ի դեպքում։
- Responsive՝ mobile stack, no horizontal overflow, touch-friendly controls։
- Accessibility՝ semantic landmarks, focus-visible, ARIA dialog/FAQ/form behavior։

---

## English

### Direction

A premium, warm, modern AI-business visual language with restrained futuristic expression. The design does not rely on color alone; hierarchy is built through layout, spacing, typography, borders, depth, motion, and data-display composition.

### Rules

- Header: dark glass surface in both themes, four-section navigation, and MenQ BrandMark.
- Hero: outcome copy, dual CTA, trust line, and a live console (Clinic / Shop / Service) that plays by itself, stops when the visitor clicks into it and has a pause button; three facts below.
- Order: hero → four steps → AI team → dark dashboard (working stop switch) → bento + industries → examples → process → FAQ → form → footer. Dark sections: hero, dashboard, form, footer; the rest follow the theme.
- Sample data (names, 10%, 8,000 AMD) is labelled "Sample". Reference: `menqstudio/Webpage`, branch `design/v2-reference`, `docs/design/v2/index.html`.
- Cards: premium borders, top rule, subtle depth, and governed hover lift.
- Contrast sections: dark scoped semantic environment with readable dark panels.
- Motion: CSS only (transform/opacity), governed tokens and a spring `linear()`. Sections rise in on scroll; the console and dashboard stop off screen and under reduced motion.
- Responsive: mobile stack, no horizontal overflow, and touch-friendly controls.
- Accessibility: semantic landmarks, focus-visible, and ARIA behavior for dialogs, FAQ, and forms.

<!-- END: MENQ_WEBPAGE_HOMEPAGE_VISUAL_SPEC -->
