# Resillix Fork & Rebranding Plan

> Status: **Planning** — audit complete, implementation phased.
> This document is the agreed roadmap for turning the Strapi fork into the
> Resillix product. It is intentionally committed to the repo so the team can
> review and amend it before any invasive code changes are made.

## Background

This repository is a fork of [Strapi](https://github.com/strapi/strapi). An
initial **cosmetic** rebrand to "Resillix CMS" has already landed (PR #1):
README, docs, LICENSE, SECURITY/CONTRIBUTING, admin-panel UI strings and
translations, and GitHub templates/workflows now say Resillix.

The deeper fork work has **not** been done. This plan records exactly what
remains, the risk of each part, and the order in which we will tackle it.

## Audit (as of this branch)

Roughly **16,000** `strapi` occurrences remain across tracked files. They fall
into three distinct layers, which must not be conflated:

| Layer | Scope | Risk | Decision |
|---|---|---|---|
| **A. Leftover cosmetic** | `npx create-resillix@latest` still shown in README; scattered user-facing strings in admin UI, error messages, email templates, and generated-project templates | Low | **Finish in Phase 1** |
| **B. npm namespace** | 36 packages published under `@resillix/*`; CLI package `create-strapi`; `strapi` bin name | **High** | **Rename to `@resillix/*` in Phase 2** |
| **C. Structural identifiers** | global `strapi.` runtime object (~579 files), `.strapi/` build/cache dirs (~1,441 refs), `STRAPI_*` env vars (~192), `strapi-*` asset prefixes (~817) | Very high | **Leave unchanged** (see Phase 3) |

### Reference distribution by area

| Area | `strapi` references |
|---|---|
| `packages/core` | 8,812 |
| `tests` | 2,869 |
| `packages/plugins` | 1,722 |
| `examples` | 600 |
| `packages/cli` | 489 |
| `docs` | 488 |
| `packages/providers` | 236 |
| `packages/utils` | 377 |
| `templates` | 133 |
| `packages/generators` | 48 |

### The 36 `@resillix/*` packages to rename in Phase 2

```
@resillix/admin                       @resillix/openapi
@resillix/admin-test-utils            @resillix/permissions
@resillix/cloud-cli                   @resillix/plugin-cloud
@resillix/content-manager             @resillix/plugin-color-picker
@resillix/content-releases            @resillix/plugin-documentation
@resillix/content-type-builder        @resillix/plugin-graphql
@resillix/core                        @resillix/plugin-sentry
@resillix/data-transfer               @resillix/plugin-users-permissions
@resillix/database                    @resillix/provider-email-amazon-ses
@resillix/email                       @resillix/provider-email-mailgun
@resillix/generators                  @resillix/provider-email-nodemailer
@resillix/i18n                        @resillix/provider-email-sendgrid
@resillix/logger                      @resillix/provider-email-sendmail
@resillix/review-workflows            @resillix/provider-upload-aws-s3
@resillix/strapi                      @resillix/provider-upload-cloudinary
@resillix/types                       @resillix/provider-upload-local
@resillix/typescript-utils            @resillix/upload
@resillix/upgrade                     @resillix/utils
```
Plus CLI packages `create-strapi` and `create-strapi-app`.
(46 `package.json` manifests total across the monorepo.)

## Key risk: namespace rename is NOT cosmetic

A `@resillix/*` → `@resillix/*` rename is the single highest-risk change in this
repo:

1. **It breaks the Strapi plugin ecosystem.** Every community plugin imports
   `@resillix/strapi`, `@resillix/utils`, etc. After the rename, none install
   against Resillix without modification. **Decision: we accept this break**
   (clean cut, no alias shim).
2. **It is all-or-nothing** across all manifests plus every cross-package
   `import`/`require`, TypeScript `paths`, jest/nx project mappings, and rollup
   build configs.
3. The global `strapi` runtime object (Layer C) is a *separate, deeper*
   contract — plugins call `strapi.service(...)` everywhere — and we are **not**
   renaming it.

## Phased plan

### Phase 0 — Audit & plan ✅
This document.

### Phase 1 — Finish cosmetic rebrand (low risk) — *next session*
- Replace install/usage instructions: `create-strapi` → `create-resillix` as
  **displayed text** in README and docs.
- Sweep remaining user-facing strings: admin UI, error messages, email
  templates, generated-project templates under `templates/` and `examples/`.
- **Do not touch** `@resillix/*` package names, the `strapi.` runtime object,
  `.strapi/` dirs, or `STRAPI_*` env vars.
- Deliverable: a single, low-risk, reviewable PR with no behavioral change.

### Phase 2 — Namespace rename `@resillix/*` → `@resillix/*` (high risk) — separate PR, after Phase 1 merges
- Rename all 36 `name` fields + every internal dependency reference across the
  46 manifests.
- Update TypeScript `paths`, jest/nx project mappings, rollup configs, and the
  `create-strapi` / `create-strapi-app` package + bin names.
- **Acceptance gate:** full `yarn install` + build + test pass.
- Compatibility: **accept the loss of drop-in Strapi-plugin compatibility** (no
  alias shim).

### Phase 3 — Structural identifiers (recommendation: leave as-is)
- Keep the global `strapi` object, the `.strapi/` build dir, and `STRAPI_*` env
  vars unchanged. Renaming them provides no customer-facing value and breaks
  every plugin and existing deployment.

## Decisions log
- Namespace: rename to `@resillix/*`.
- Plugin compatibility: accept the break (no `@resillix/*` alias shim).
- Sequencing: Phase 1 first (standalone PR); Phase 2 only after Phase 1 merges.
- Structural identifiers (Layer C): not renamed.
