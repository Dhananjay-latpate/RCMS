# Resillix Design System & UI/UX Plan

> Status: **Planning** — architecture agreed, implementation phased.
> Companion to [`FORK_PLAN.md`](./FORK_PLAN.md). This document is the agreed
> roadmap for building a new Resillix design system and redesigning the
> product UI **without breaking the backend contract**. It is committed to the
> repo so the team can review and amend it before invasive code changes.

## 1. Goals & decisions

We are building a first-class Resillix design system and a clean, modern UI on
top of it. The end-product flow is: **customers get a polished primary
experience, and the admin panel lets them update content behind it.** The
design system must therefore serve *both* the admin panel and customer-facing
front-ends from one token source.

Agreed decisions (from product direction):

| Question | Decision |
|---|---|
| Design-system strategy | **Fork** the vendored DS into a local **`@resillix/design-system`** package |
| Technical foundation | Rebuild internals on **Tailwind CSS + Radix UI primitives**, behind a **stable, API-compatible public surface** |
| Visual direction | **Modern minimal / clean** — generous whitespace, restrained palette, soft surfaces, calm professional SaaS |
| Scope | **Admin panel + built-in plugin UIs** as the product; tokens reusable by customer front-ends |
| Backend | **Untouched.** UI talks to the backend only through `shared/contracts/*` + RTK Query |

### Hard constraint: the public component API is a contract
`@strapi/design-system` is imported by **~481 files** across the monorepo. The
dominant exports are layout primitives — `Flex` (189), `Box` (164),
`Typography` (147), `Grid`, `Button`, `Field`, `IconButton`, `Modal`, `Dialog`,
`Tabs`, `Menu`, `Select`, `TextInput`, etc. The fork **must keep the same
import names, props, and the `theme`/`DesignSystemProvider` shape** so the
admin and plugins compile unchanged. Internals change; the surface does not.

## 2. Current architecture (audit)

- **Admin SPA**: `packages/core/admin/admin/src` — React + **styled-components**,
  **RTK Query** (`services/api.ts` → `adminApi`), **react-intl**, react-redux.
- **DS dependency**: `@strapi/design-system@2.2.0` + `@strapi/icons@2.2.0`
  (external npm), wired in `components/Theme.tsx` via `DesignSystemProvider`
  with `light`/`darkTheme` (styled-components `DefaultTheme`), set in
  `StrapiApp.tsx`.
- **Theme customization API already exists**: `customConfig.theme` accepts
  `{ light, dark }` — we extend this rather than replace it.
- **Backend contract**: `packages/core/admin/shared/contracts/*` (admin, users,
  roles, permissions, content-types, webhooks, content-api, …). Fully typed and
  decoupled — a UI redesign needs **zero** backend changes.
- **Extension points**: `core/apis/Plugin.ts`, `StrapiApp.tsx`,
  `PluginsInitializer.tsx` — plugins register menu/settings links, inject
  components, and add custom fields. These must keep working.

```
                ┌─────────────────────────────────────────┐
   tokens ──►   │  @resillix/design-system (NEW, local)     │
 (CSS vars)     │  primitives → components → patterns       │
                │  public API == old @strapi/design-system  │
                └───────────────┬───────────────────────────┘
                                │ (drop-in, same imports)
        ┌───────────────────────┼───────────────────────────┐
        ▼                       ▼                            ▼
  admin SPA            built-in plugin UIs           customer front-ends
        │ RTK Query (services/*) + shared/contracts/* (UNCHANGED)
        ▼
   Resillix backend (no changes)
```

## 3. Design system architecture

Layered, so each layer can ship and be tested independently.

### Layer 0 — Design tokens (source of truth)
- Define tokens in a framework-agnostic format (JSON / Style Dictionary):
  color, typography, spacing, radii, shadows, z-index, motion, breakpoints.
- Emit **CSS custom properties** for runtime theming + a **Tailwind preset**
  that reads those variables. One token edit → admin, plugins, and customer
  sites all update.
- Two built-in themes (`light`, `dark`) implemented as CSS-variable sets;
  custom themes = override a variable scope. Backwards-compatible with the
  existing `{ light, dark }` theme-customization API.
- Provide a **styled-components `DefaultTheme` adapter** that maps tokens to the
  legacy `theme.colors.*` / `theme.spaces.*` shape, so existing
  `styled-components` code (e.g. `Theme.tsx` `GlobalStyle`) keeps working during
  migration.

### Layer 1 — Primitives
`Box`, `Flex`, `Grid`, `Typography`, `VisuallyHidden`, `Portal`. Rebuilt on
Tailwind utilities + a small `cn()`/cva helper, exposing the **same props**
(`padding`, `gap`, `background`, `hasRadius`, `variant`, `textColor`, …) mapped
to token classes. This unlocks ~60% of usages immediately.

### Layer 2 — Components (Radix-backed)
Interactive components on **Radix primitives** for accessibility + behavior,
styled with tokens: `Button`/`IconButton`/`LinkButton`, `Field` family
(`TextInput`, `Textarea`, `Checkbox`, `Toggle`, `Select`/`Combobox`,
`DatePicker`), `Modal`/`Dialog`/`Popover`/`Tooltip`, `Menu`, `Tabs`, `Accordion`,
`Table`, `Badge`, `Tag`, `Status`, `Loader`, `Card`, `Breadcrumbs`, `Pagination`.
Each keeps its current prop names and slots.

### Layer 3 — Patterns / layouts
App-level composition the admin already depends on: `Layouts` (root, header,
content, grid), `MainNav`/side navigation, `EmptyStateLayout`, `Notifications`,
`GuidedTour`, page headers, filters/bulk-action bars. Modern-minimal restyle
lives here.

### Icons
Fork `@strapi/icons` → **`@resillix/icons`** (or re-export initially). Same
export names; restyle to a consistent 1.5px-stroke minimal set over time.

### Tooling & quality
- Build with the existing **rollup** setup (`rollup.config.mjs`) for parity.
- **Storybook** as the component workbench + living documentation.
- **Visual regression** (Playwright/Chromatic) on Storybook stories.
- **a11y**: Radix + axe checks in CI. Tokens meet WCAG AA contrast.

## 4. UI/UX redesign (modern minimal)

Principles: **clarity over chrome, content first, generous whitespace,
restrained accent palette, soft elevation, motion with purpose, accessible by
default, responsive, dark-mode native.**

Redesign targets, in product-value order:
1. **Auth** (login / register / reset) — first impression, smallest surface.
2. **App shell** — side nav, top bar, command palette, breadcrumbs, layouts.
3. **Content Manager** — list view (filters, bulk actions, density), edit view
   (field layout, relations, dynamic zones, publish/draft, i18n).
4. **Media Library** — grid/list, upload, asset detail.
5. **Content-Type Builder** — schema editor, field picker.
6. **Settings** — RBAC, API tokens, webhooks, profile, project settings.
7. **Plugin UIs** — i18n, users-permissions, content-releases,
   review-workflows, upload — aligned to the new system.

Deliverables per surface: UX flow notes, key states (empty / loading / error /
success), responsive behavior, and a Storybook-backed implementation.

## 5. Migration strategy (no big-bang)

1. **Stand up `@resillix/design-system`** alongside the existing dependency.
2. **Ship Layer 0 + Layer 1** first; verify the styled-components adapter keeps
   legacy code rendering.
3. **Swap the import** in the admin via a build alias
   (`@strapi/design-system` → `@resillix/design-system`) so all 481 files
   resolve to the fork with **one config change**, then remove the alias once
   imports are renamed package-wide (coordinate with FORK_PLAN Phase 2 naming).
4. Migrate components Layer 2 → Layer 3, screen by screen, behind the stable API.
5. Restyle screens to modern-minimal once their components are on the new DS.
6. Delete the styled-components adapter only when no consumer needs it.

Every step is independently shippable and reversible (revert the alias).

## 6. Phases & acceptance gates

| Phase | Scope | Gate |
|---|---|---|
| **0. Plan** ✅ | This document | Reviewed & merged |
| **1. Tokens** | Token source, CSS vars, Tailwind preset, SC adapter, light/dark | Tokens render in a sandbox; AA contrast passes |
| **2. Primitives** | Box/Flex/Grid/Typography on Tailwind, API-compatible | Storybook + snapshot/visual parity; admin builds with alias |
| **3. Core components** | Buttons, Field family, overlays, Menu/Tabs/Table | a11y (axe) + visual tests green |
| **4. Patterns & shell** | Layouts, nav, notifications, empty states | Admin shell renders on the fork end-to-end |
| **5. Screen redesigns** | Auth → CM → Media → CTB → Settings | Per-screen review; e2e (Playwright) green |
| **6. Plugin UIs** | i18n, users-perms, releases, workflows, upload | Plugins render & function on the new DS |
| **7. Cleanup** | Remove SC adapter + legacy dep; rename imports | `yarn install` + build + full test pass |

## 7. Risks & mitigations

- **API drift breaking 481 files** → freeze the public surface; contract tests +
  TypeScript types pinned to the legacy shape; alias swap is the canary.
- **styled-components ↔ Tailwind coexistence** → token adapter bridges both;
  remove only at Phase 7.
- **Plugin ecosystem injection points** → keep `Plugin.ts` / `StrapiApp` APIs
  and the `theme` prop unchanged; cover with the existing `StrapiApp.test.tsx`.
- **Backend regressions** → none expected; redesign touches no
  `shared/contracts/*` or `services/*` signatures. Guard with existing API/e2e
  tests.
- **Scope creep across customer + admin** → tokens are shared, but Phase 1–7
  deliver the **admin + plugins** first; customer-facing kit reuses the same
  package later.

## 8. Open items for the team
- Confirm Tailwind version/config strategy in a Vite + rollup monorepo (preset
  vs. per-package config).
- Storybook vs. an in-repo docs route for the living style guide.
- Brand palette + type scale sign-off (accent color, font family) before Phase 1.
- Whether `@resillix/icons` is a fork now or a later rename (align with
  FORK_PLAN Phase 2).

## Decisions log
- DS strategy: **fork** to local `@resillix/design-system`.
- Foundation: **Tailwind + Radix** internals behind an **API-compatible** surface.
- Visual direction: **modern minimal / clean**, dark-mode native.
- Scope: **admin + plugin UIs** first; shared tokens reusable by customer sites.
- Backend: **unchanged** — contract is `shared/contracts/*` + RTK Query.
- Migration: token adapter + build alias, screen-by-screen, no big-bang.
