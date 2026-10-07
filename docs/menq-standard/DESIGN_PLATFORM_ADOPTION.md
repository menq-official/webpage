# MenQ Webpage — Design Platform Adoption / Design Platform որդեգրում

**Status / Կարգավիճակ:** Validated and merged — M2 pilot / Validate և merge արված — M2 pilot  
**Parent decision:** Locked `D-025`  
**Consumer ID:** `menq.webpage.public-site-admin`

## Հայերեն

### Purpose
Webpage-ը governed Design Platform consumer է՝ առանց business logic, backend, routes կամ content ownership-ը shared core տեղափոխելու։

### Scope
Tokens, components, patterns, themes, responsive behavior, HY/EN/RU locale behavior, accessibility, motion և public/admin visual foundations։

### Excluded scope
Database schema, lead/booking business logic, auth/session/RBAC semantics, notification integrations և deployment secrets։

### Adoption mode
Մինչև released package consumption-ը repository-ն controlled source-mapped mode-ում էր։ 2026-10-07-ից ընդհանուր բրենդային արժեքները գալիս են pinned `tokens.vars.css` artifact-ից (`pinned-vendored-artifact`)՝ տես [`BRAND_TOKEN_CONSUMPTION.md`](BRAND_TOKEN_CONSUMPTION.md)։

### Maturity
M2 pilot (Owner-ի հաստատում, 2026-10-08)՝ pinned brand շերտ և CI runtime evidence։ M3-ը պահանջում է conformance profile-ի GREEN՝ ներառյալ accessibility-ն։

## English

### Purpose
Webpage is a governed Design Platform consumer without moving business logic, backend, routes, or content ownership into shared core.

### Scope
Tokens, components, patterns, themes, responsive behavior, HY/EN/RU locale behavior, accessibility, motion, and public/admin visual foundations.

### Excluded scope
Database schema, lead/booking business logic, authentication/session/RBAC semantics, notification integrations, and deployment secrets.

### Adoption mode
Until released package consumption existed, the repository operated in controlled source-mapped mode. Since 2026-10-07 the shared brand values come from the pinned `tokens.vars.css` artifact (`pinned-vendored-artifact`); see [`BRAND_TOKEN_CONSUMPTION.md`](BRAND_TOKEN_CONSUMPTION.md).

### Maturity
M2 pilot (Owner approval, 2026-10-08): pinned brand layer and CI runtime evidence. M3 requires a GREEN conformance profile, accessibility included.

<!-- END: MENQ_WEBPAGE_DESIGN_PLATFORM_ADOPTION -->
