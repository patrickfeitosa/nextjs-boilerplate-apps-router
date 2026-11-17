# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Next.js 15 (App Router) + React 19 + TypeScript starter. It's a boilerplate: the code is a small, working end-to-end example (`Main` component, `health` resource with schema → api → hook, i18n, tests, stories) meant to be copied and extended. The folder map is [`STRUCTURE.md`](STRUCTURE.md).

## Commands

| Task                          | Command                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| Dev server                    | `yarn dev` (http://localhost:3000)                          |
| Production build / serve      | `yarn build` / `yarn start`                                 |
| Lint + format check (CI gate) | `yarn lint`                                                 |
| Lint/format with auto-fix     | `yarn lint:fix`                                             |
| Type-check only               | `yarn typecheck`                                            |
| All unit/component tests      | `yarn test`                                                 |
| Single test file              | `yarn vitest run src/path/to/File.spec.tsx`                 |
| Tests in watch mode           | `yarn test:watch`                                           |
| Coverage                      | `yarn test:coverage`                                        |
| E2E tests (Playwright)        | `yarn e2e` (first time: `yarn playwright install chromium`) |
| Storybook                     | `yarn storybook` (port 6006) / `yarn build-storybook`       |
| Guided conventional commit    | `yarn commit`                                               |

Node 24 (LTS) is the target (`.nvmrc`; run `nvm use`), `engines` allows ≥ 22.12. The repo uses **yarn** (`yarn.lock`, `.npmrc` has `package-lock=false`); don't create a `package-lock.json`.

## Architecture

`src/app` is routing only. Everything else is layered, and data flows one way: `api` → `hooks` → components/pages. Components never call axios directly. Full tree, layer table and alias list: [`STRUCTURE.md`](STRUCTURE.md).

- **Server vs Client Components:** Server Components by default. Add `'use client'` only to the leaf that needs state, effects, event handlers, TanStack Query, `react-hook-form` or `react-i18next` hooks. Providers live in `app/providers.tsx` (client) and are mounted in `app/layout.tsx`.
- **Validation:** every API response goes through a Zod schema in `api/schemas/<resource>/` (`schema.parse(data)` in the api function). Validate URL search params with a Zod schema too.
- **Server state:** TanStack Query only, through hooks in `hooks/`. Defaults live in `lib/query-client.ts`.
- **i18n:** every user-facing string goes through `react-i18next` (`en` and `pt` locales). Shared text is in the `common` namespace; a component/route uses its own namespace. Props that become display text take already-translated strings.
- **Styling:** Tailwind CSS 4 utilities; design tokens in `src/styles/global/index.css` under `@theme`. Use `classnames` for conditional classes. No CSS-in-JS.

## Conventions

- **Folder-per-module + naming + props + forms + i18n + imports:** read `.claude/skills/frontend-conventions.md` before adding anything under `src/`.
- **Imports:** PascalCase aliases defined once in `tsconfig.json`. `../` imports are a lint error (`noRestrictedImports`); `./` only for a module's own siblings. Biome enforces import order, sorted object keys and JSX props. A new alias also has to be added to `.storybook/main.ts` and the Biome import groups.
- **No `export *`:** `index.ts` files use explicit named exports (`performance.noReExportAll` is `error`).
- **Formatter/linter:** Biome. 2-space indent, 100 line width, single quotes, semicolons. Config in `biome.json`.
- **Testing:** read `.claude/skills/testing.md` before writing tests. Unit/component tests are `*.spec.ts(x)` co-located with the module (Vitest + Testing Library + MSW); e2e specs are in `e2e/`. Both layers share the fixtures in `src/test/msw/handlers.ts`.
- **Playwright cannot launch inside a Claude Code sandbox session** — `yarn playwright test --list` works (proves specs resolve and typecheck), but an actual run fails at the `webServer` step (can't bind a local port). Never claim e2e tests pass without having run them in a real terminal or CI.
- **Commits:** conventional commits (`commitlint`); use `yarn commit`. Husky runs lint-staged (Biome + related tests) on commit. If hooks don't fire after a fresh clone, run `yarn install` (the `prepare` script runs `husky`).

## Environment

- `BACKEND_URL` — optional. When set (e.g. `http://localhost:8080`), `next.config.js` proxies `/api/*` to it. When unset, `/api` calls hit Next itself (and 404 unless you add route handlers).

## CI

`.github/workflows/ci.yml` runs on every pull request: `yarn lint`, `yarn typecheck`, `yarn test`, `yarn build`, then `yarn e2e` with Chromium. Run the same four locally before pushing (`yarn lint && yarn typecheck && yarn test && yarn build`).

## Skills (`.claude/skills/`)

| Skill                  | Load when                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `frontend-conventions` | creating or restructuring a component, hook, api or schema module; choosing a folder; reviewing convention compliance |
| `testing`              | writing or changing a test, a story, or an MSW handler; deciding unit vs e2e                                          |
