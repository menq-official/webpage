# MenQ Webpage — Homepage Visual Specification / MenQ Webpage — Գլխավոր էջի վիզուալ սպեցիֆիկացիա

**Status / Կարգավիճակ:** Implemented v2 / Ներդրված v2

## Հայերեն

### Direction

Premium, warm, modern AI-business visual language՝ restrained futuristic expression-ով։ Design-ը չի հիմնվում միայն գույնի վրա․ hierarchy-ն կառուցվում է layout, spacing, typography, borders, depth, motion և data-display composition-ով։

### Rules

- Header՝ մուգ ապակե մակերես երկու թեմայում էլ, 4 բաժնի nav, MenQ BrandMark։
- Hero՝ copy + dual CTA + trust line + կենդանի դեմո՝ մեկ պիտակված օրինակային հարցում. ինքն է խաղում մինչև «Սպասում է ստուգման», հաստատողը մարդն է, «Նորից ցույց տալ» կոճակ + 3 արժեք։
- Հերթականություն (copy v2)՝ hero → 4 քայլ (վերահսկողությունը՝ նախագծից) → հնարավորություններ (bento) → ում հետ ենք աշխատում → օրինակներ → գործընթաց → FAQ → ձև → footer։ Մուգ բաժիններ՝ hero, «ում հետ», ձև, footer. մնացածը թեմայով։
- Ոչ մի երաշխիք, «անվճար», անուն կամ գին. դեմոն և օրինակները պիտակված են որպես ցուցադրական (copy v2-ի §13)։ Նմուշը՝ `menqstudio/Webpage`, branch `design/v2-reference`, `docs/design/v2/index.html`։
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
- Hero: copy, dual CTA, trust line and a live demo of one labelled sample enquiry that plays up to "Awaiting review"; a person approves; a "Replay demo" button; three value points below.
- Order (copy v2): hero → four steps (control by design) → capabilities (bento) → who we work with → examples → process → FAQ → form → footer. Dark sections: hero, who we work with, form, footer; the rest follow the theme.
- No guarantees, "free", names or prices; the demo and examples are labelled as illustrative (copy v2 §13). Reference: `menqstudio/Webpage`, branch `design/v2-reference`, `docs/design/v2/index.html`.
- Cards: premium borders, top rule, subtle depth, and governed hover lift.
- Contrast sections: dark scoped semantic environment with readable dark panels.
- Motion: CSS only (transform/opacity), governed tokens and a spring `linear()`. Sections rise in on scroll; the console and dashboard stop off screen and under reduced motion.
- Responsive: mobile stack, no horizontal overflow, and touch-friendly controls.
- Accessibility: semantic landmarks, focus-visible, and ARIA behavior for dialogs, FAQ, and forms.

<!-- END: MENQ_WEBPAGE_HOMEPAGE_VISUAL_SPEC -->
