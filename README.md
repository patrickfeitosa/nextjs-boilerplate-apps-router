# Next.js Boilerplate (App Router)

Next 16 + React 19.2 + TypeScript starter. See [`STRUCTURE.md`](STRUCTURE.md) for the folder map and [`CLAUDE.md`](CLAUDE.md) for conventions.

## Stack

Next.js App Router, TanStack Query, Zod, axios, react-hook-form, react-i18next, Tailwind CSS 4, Vitest + Testing Library + MSW, Playwright, Storybook 10, Biome, Husky + lint-staged, commitlint + commitizen.

## Getting started

```bash
yarn install
yarn dev            # http://localhost:3000
```

Set `BACKEND_URL` (e.g. `http://localhost:8080`) to proxy `/api/*` to a backend.

## Scripts

| Script                                       | What it does                                         |
| -------------------------------------------- | ---------------------------------------------------- |
| `yarn dev` / `build` / `start`               | Next dev server, production build, production server |
| `yarn test` / `test:watch` / `test:coverage` | Vitest                                               |
| `yarn e2e` / `e2e:ui`                        | Playwright (network mocked with the MSW fixtures)    |
| `yarn lint` / `lint:fix`                     | Biome check                                          |
| `yarn typecheck`                             | `tsc --noEmit`                                       |
| `yarn storybook` / `build-storybook`         | Storybook on port 6006                               |
| `yarn commit`                                | Guided conventional commit (commitizen)              |

## Structure

```
src/
├── app/          # Routing only: layout, page, providers, error, not-found
├── api/          # client/, <resource>/, schemas/<resource>/ (Zod)
├── components/   # <Name>/{Name.tsx, Name.types.ts, Name.spec.tsx, Name.stories.tsx, index.ts}; ui/ and domain/
├── hooks/        # Query/mutation wrappers
├── i18n/         # i18next init + locales/<lang>/*.json
├── lib/          # Pure helpers (@Libs)
├── styles/       # global/index.css (Tailwind + @theme tokens)
├── test/         # setup, render helper, msw/ handlers
└── types/
```

Data flows one way: `api` → `hooks` → components/pages. Import through aliases (`@Api`, `@Schemas`, `@Ui`, `@Domain`, `@Components`, `@Hooks`, `@Libs`, `@I18n`, `@Styles`, `@Test`, `@Types`, `@/`); `../` imports are a lint error.
