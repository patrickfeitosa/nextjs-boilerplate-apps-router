# Folder Structure

Next.js 15 (App Router) + React 19 + TypeScript. TanStack Query, Zod, axios, `react-i18next`, `react-hook-form`, Tailwind CSS 4.
Tests: Vitest + Testing Library + MSW, Playwright (e2e), Storybook 8. Lint/format: Biome. Detailed rules: `.claude/skills/frontend-conventions.md`.

## Top level

```
.
├── package.json          # Scripts: dev, build, start, test, e2e, lint, typecheck, storybook, commit
├── next.config.js        # rewrites(): proxies /api/* to BACKEND_URL when set
├── postcss.config.mjs    # Tailwind v4 via @tailwindcss/postcss
├── tsconfig.json         # Single tsconfig: `next` plugin, baseUrl ".", path aliases (source of truth)
├── vitest.config.ts      # jsdom, src/test/setup.ts, vite-tsconfig-paths reads the aliases
├── playwright.config.ts  # webServer (yarn dev / yarn start in CI), baseURL, Chromium
├── biome.json            # Lint + format + import order + sorted keys/props, ../ ban
├── .storybook/           # main.ts (stories glob, @storybook/nextjs, alias mirror), preview.tsx
├── .husky/               # pre-commit -> lint-staged, commit-msg -> commitlint
├── .lintstagedrc.js      # Biome on staged files, related Vitest tests
├── .commitlintrc.js      # Conventional commits
├── .github/workflows/    # ci.yml: lint, typecheck, test, build, e2e on pull_request
├── .claude/skills/       # Contributor/agent conventions (see below)
├── public/               # Static files served as-is (img/)
├── e2e/                  # Playwright specs + support/mock-api.ts
├── src/                  # Application code
├── .next/                # Build output (generated, git-ignored)
└── test-results/         # Playwright artifacts (generated, git-ignored)
```

## `e2e/` — Playwright (real browser)

```
e2e/
├── *.spec.ts            # One per area (home, ...)
└── support/mock-api.ts  # Routes network calls to the same fixtures as src/test/msw/handlers.ts
```

Reuses the MSW fixtures so the Vitest and Playwright layers can't drift apart. Playwright cannot launch inside a Claude Code sandbox; run it in a real terminal or CI.

## `src/` — Application

| Path                      | Purpose                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`                    | Routing only: `layout.tsx`, `page.tsx`, `providers.tsx`, `error.tsx`, `not-found.tsx`, and one folder per route                                                                 |
| `api/client/`             | Shared axios instance (`baseURL: /api`) and `ApiError` normalization                                                                                                            |
| `api/<resource>/`         | Fetch/mutation functions for one resource (e.g. `api/health/health.ts` → `getHealth`)                                                                                           |
| `api/schemas/<resource>/` | Zod schemas (`<resource>.schema.ts`) and inferred types (`<resource>.types.ts`)                                                                                                 |
| `components/<Name>/`      | Presentation components, one folder per module. Split into `components/ui/` (generic) and `components/domain/` (app-aware) when the first shared component of that kind appears |
| `hooks/<useThing>/`       | TanStack Query wrappers and UI hooks (e.g. `useHealth`)                                                                                                                         |
| `i18n/`                   | i18next init (`index.ts`) and `locales/<lang>/<namespace>.json` (`common.json` + one namespace per component/route)                                                             |
| `lib/`                    | Pure, framework-free helpers (`query-client.ts`) with co-located specs. Alias: `@Libs`                                                                                          |
| `styles/global/index.css` | `@import "tailwindcss"` + `@theme` design tokens                                                                                                                                |
| `types/`                  | Shared TS types not owned by one module                                                                                                                                         |
| `test/`                   | `setup.ts` (jest-dom, MSW lifecycle, i18n), `render.tsx` (`renderWithProviders`), `msw/handlers.ts` + `server.ts`                                                               |

Folders that don't exist yet (`components/ui`, `components/domain`, `utils`, `store`, ...) are created the first time something needs them. Each alias is added together with its folder (see the conventions skill).

## Layer responsibilities

| Layer         | Owns                                         | May depend on            |
| ------------- | -------------------------------------------- | ------------------------ |
| `lib/`        | Pure functions, no React                     | nothing in `src/`        |
| `api/`        | HTTP calls + Zod schemas                     | `lib/`, schemas          |
| `hooks/`      | Query/mutation wrappers, UI hooks            | `api/`, `lib/`           |
| `components/` | Presentation                                 | `hooks/`, `lib/`, `i18n` |
| `app/`        | Routes, layouts, providers, page composition | everything above         |

Data flows one way: `api` → `hooks` → components/pages. Components never call axios directly. Components are Server Components unless marked `'use client'`; anything using hooks, i18n or event handlers is a client component.

## Module layout

Every component, hook and api/schema module is a directory:

```
Main/
├── Main.tsx           # implementation
├── Main.types.ts      # props (optional)
├── Main.spec.tsx      # co-located test (optional)
├── Main.stories.tsx   # Storybook stories (components only, optional)
└── index.ts           # named re-exports only
```

## Path aliases (`tsconfig.json`)

`@Api`, `@Schemas`, `@Ui`, `@Domain`, `@Components`, `@Hooks`, `@Libs`, `@I18n`, `@Styles`, `@Test`, `@Types`, `@/` (catch-all). Mirrored in `.storybook/main.ts`; Vitest and Playwright read `tsconfig.json`. `../` imports are a lint error.
