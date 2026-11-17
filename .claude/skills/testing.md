---

title: Testing (Vitest, MSW, Playwright, Storybook)
description: How tests and stories are written in this repo — Vitest + Testing Library component tests, MSW fixtures shared with Playwright e2e, renderWithProviders, i18n in tests, Storybook conventions, and what each layer should cover. Load when writing or changing a *.spec.ts(x) test, an e2e spec, an MSW handler/fixture, or a *.stories.tsx file, or when deciding which layer should cover something.
---

# Testing

Three layers, deliberately not redundant:

| Layer            | Location                                          | Tool                                   | Covers                                                                                                      |
| ---------------- | ------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Unit / component | `src/**/*.spec.ts(x)`, co-located with the module | Vitest + Testing Library + MSW (jsdom) | Component logic and rendering, helpers, hooks, schemas, api functions                                       |
| E2E              | `e2e/*.spec.ts`                                   | Playwright (Chromium, network mocked)  | Real-browser behaviour: focus, dialogs, navigation, routing (`not-found`, `error`), async Server Components |
| Visual / docs    | `src/components/**/*.stories.tsx`                 | Storybook 8                            | Component states in isolation, autodocs                                                                     |

## Commands

| Task                           | Command                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- |
| All unit tests                 | `yarn test`                                                                 |
| Single file                    | `yarn vitest run src/components/Main/Main.spec.tsx`                         |
| Watch                          | `yarn test:watch`                                                           |
| Coverage                       | `yarn test:coverage`                                                        |
| E2E                            | `yarn e2e` (first time: `yarn playwright install chromium`) / `yarn e2e:ui` |
| List e2e specs without running | `yarn playwright test --list`                                               |
| Storybook                      | `yarn storybook`                                                            |

**Playwright cannot launch inside a Claude Code sandbox** (the `webServer` step can't bind a port). `--list` works and proves the specs resolve and typecheck, but never claim e2e tests pass without having run them in a real terminal or CI.

## Setup (`src/test/setup.ts`)

Loaded for every unit test via `vitest.config.ts`:

- `@testing-library/jest-dom/vitest` matchers.
- `import '@I18n'` — initializes i18next (English), so components using `useTranslation` render real text.
- MSW server lifecycle: `listen({ onUnhandledRequest: 'error' })`, `resetHandlers()` after each test, `close()` at the end, plus RTL `cleanup()`.
- Vitest globals are **not** enabled: import `describe`, `it`, `expect`, `vi` from `vitest`.

`onUnhandledRequest: 'error'` means any request without a handler fails the test. Add the handler instead of loosening it.

## Fixtures and handlers (`src/test/msw/handlers.ts`)

Fixtures are exported as **plain data** (`healthFixture`) typed with the real Zod-inferred types, and the MSW `handlers` array returns them. Playwright imports the same fixtures through `e2e/support/mock-api.ts` and `page.route(...)`, so the two layers can't drift. When you add an endpoint:

1. Export a typed fixture from `handlers.ts`.
2. Add the MSW handler using it (`http.get('*/api/<path>', ...)`).
3. Add the matching `page.route` in `e2e/support/mock-api.ts`.

Override a handler for one test with `server.use(http.get(..., () => HttpResponse.json(...)))`; `afterEach` resets it. Keep `handlers.ts` free of imports from `e2e/`, and keep `e2e/` imports on aliases (`@Test/msw/handlers`).

## Component tests

- Query by role and accessible name first (`getByRole('heading', { level: 1, name: /.../i })`), then label/text. Avoid test ids and snapshots; assert behaviour.
- Components that use TanStack Query render through `renderWithProviders` (`@Test/render`), which creates a fresh `QueryClient` with `retry: false` per test. Plain components can use RTL's `render`.
- Text assertions use the **English** strings from `src/i18n/locales/en/*.json`. If you change a key's text, update the spec.
- `next/navigation` and `next/image` may need mocking when a component uses them (`vi.mock('next/navigation', ...)`).
- Async Server Components can't be rendered by Testing Library. Test the client pieces and the data layer (api functions, hooks, schemas) in Vitest, and cover full routes in Playwright.

### Pure functions, schemas, api functions

- Helpers and schemas: no mocking; test directly. For Zod schemas use `.safeParse()` and assert on `success` and `error.issues`.
- Api functions (`getHealth`): rely on the MSW handler; assert the parsed result, and use `server.use` to return a malformed body and assert it rejects (response validation).
- Hooks: render with `renderHook` inside a `QueryClientProvider` wrapper (or the `renderWithProviders` pattern) and `await waitFor(...)`.

## E2E tests (`e2e/*.spec.ts`)

- Call `mockApi(page)` before `page.goto` for any page that fetches data; never hit a real backend.
- Use role-based locators (`page.getByRole(...)`), same as component tests.
- Keep e2e for what jsdom can't prove (focus restore, dialogs, real navigation, 404/error pages). Don't duplicate component-level assertions.
- CI runs `yarn start` (production build) for e2e; locally `yarn dev` is reused if already running.

## Stories (`*.stories.tsx`)

- One file per component, next to it. `title` = the component name; default `args`; one story per meaningful state (`Default`, plus named variants).
- Typed with `Meta<typeof Component>` / `StoryObj<typeof Component>` from `@storybook/react`; `export default meta`.
- Storybook loads i18n and the global Tailwind CSS from `.storybook/preview.tsx`. Components that fetch need a provider decorator or MSW; prefer stories for presentational components and pass data via args.
- The glob is `src/components/**/*.stories.tsx`; stories are excluded from coverage.

## Coverage

`vitest.config.ts` measures `src/**/*.{ts,tsx}` and excludes stories, `*.types.ts`, `src/app/**` (routing glue, covered by e2e), `src/test/**`, `src/types/**` and `src/styles/**`.
