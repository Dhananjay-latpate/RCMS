# @resillix/design-system

The new Resillix design system: **design tokens → light/dark themes → Tailwind
preset → layout primitives → components**, plus a live preview app used to
monitor the system as it grows.

This folder is intentionally **outside the yarn workspace** (`packages/*`) so it
builds and deploys independently and does not touch the monorepo lockfile. It
will be promoted into `packages/` and wired into the admin build in a later
phase (see [`../docs/DESIGN_SYSTEM_PLAN.md`](../docs/DESIGN_SYSTEM_PLAN.md)).

## What's here

| Path | Purpose |
|---|---|
| `src/lib/tokens/tokens.css` | Token source of truth as CSS variables (light + `.dark`) |
| `tailwind-preset.cjs` | Tailwind preset mapping tokens → theme |
| `src/lib/primitives/` | `Box`, `Flex`, `Grid`, `Typography` (legacy-compatible props) |
| `src/lib/components/` | `Button`, `Field`/`TextInput`/`Textarea`, `Checkbox`, `Toggle`, `Select`, `Dialog`, `Tabs`, `Tooltip`, `Badge`, `Card`, `Table` |
| `src/lib/patterns/` | App shell: `AppShell`, `SideNav`, `TopBar`, `PageHeader`, `CommandPalette` (⌘K) + icon set |
| `src/preview/` | Live preview — **Style guide** + a realistic **Admin shell** screen, with light/dark toggle |

Interactive components are built on **Radix UI** primitives (Dialog, Select,
Tabs, Tooltip, Checkbox, Switch, Label) for accessibility, styled with tokens.
The patterns reproduce the admin frame (232px side nav, 64px top bar) matching
the legacy admin layout tokens.

## Develop / build

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/ (deployed to Vercel)
```

## API compatibility

Primitive and component prop names mirror `@strapi/design-system` (spacing 1–10
scale, `Typography` variants `alpha/beta/…`, `Button` variants/sizes) so the
~481 admin/plugin files migrate with minimal churn. Internals run on Tailwind +
Radix; the public surface stays stable.
