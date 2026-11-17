---

title: Frontend (src/) file structure and component conventions
description: Reference for how files are organized and written under src/ — folder-per-module structure (index + .types/.constants/.helpers/.spec/.stories), PascalCase components vs camelCase hooks, schema folder naming, props-object destructuring, Server vs Client Components, forms, i18n boundary, path aliases and import order. Load before creating or restructuring any component, hook, api or schema module under src/, or when reviewing such a file for convention compliance.
---

# Frontend (`src/`) file structure and conventions

These conventions apply to `src/components/**`, `src/hooks/**` and `src/api/**` (including `api/schemas/**`). They do **not** apply to `src/app/**` (Next's file-based routing dictates names there), `src/lib/**`, `src/i18n/**`, `src/test/**` or `src/styles/**` — those stay plain, flat files by deliberate choice.

## Folder-per-module structure

Every component, hook and API/schema module gets its own directory, not a single flat file:

```
ComponentName/
  ComponentName.tsx          ← implementation
  ComponentName.types.ts     ← Props type(s) and any other local types (optional)
  ComponentName.constants.ts ← exported constant maps/arrays (optional)
  ComponentName.helpers.ts   ← pure helper functions used by the implementation (optional)
  ComponentName.spec.tsx     ← co-located test (optional)
  ComponentName.stories.tsx  ← Storybook stories, components only (optional)
  index.ts                   ← re-exports, named only — see below
```

Only create the `.types`/`.constants`/`.helpers`/`.spec`/`.stories` siblings when there is real, separable content for them. A trivial component with one prop type still gets a `.types.ts` (so you always know where to look), but don't invent an empty `.constants.ts` or `.helpers.ts` just to complete the set.

**`index.ts` must use named re-exports, never `export * from`.** `biome.json` has `performance.noReExportAll: "error"`, so `export *` fails `yarn lint`. Enumerate what each sibling exports:

```ts
// components/Main/index.ts
export { Main } from './Main';
export type { MainProps } from './Main.types';
```

Components use **named exports** (`export const Main`), not default exports. The only default exports are the ones Next requires in `src/app/**` (`page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`, ...) and `providers.tsx`.

### Real examples

- `components/Main/` — component with `.types`, `.spec`, `.stories` and a named-export `index.ts`.
- `api/schemas/health/` — `health.schema.ts` (Zod), `health.types.ts` (`z.infer`), `index.ts`.
- `api/health/health.ts` — the fetch function (`getHealth`) validating the response with the schema.
- `hooks/useHealth/useHealth.ts` — a `useQuery` wrapper plus its query key.

## Naming by category

| Category                                                                 | Casing                                                              | Example                               | Notes                                                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Components (`components/**`, route-only components under `app/<route>/`) | PascalCase                                                          | `Main/Main.tsx`                       | Folder name matches the exported component name exactly                                                         |
| Hooks (`hooks/**`)                                                       | camelCase                                                           | `useHealth/useHealth.ts`              | Matches the hook's own name — `useHealth`, not `use-health`                                                     |
| API modules (`api/**`, excluding `schemas/`)                             | lowercase, matches resource                                         | `api/health/health.ts`                | All of one resource's functions live in the same file                                                           |
| Schemas (`api/schemas/**`)                                               | lowercase, matches resource — **no `.schema` suffix on the folder** | `api/schemas/health/health.schema.ts` | The folder is already inside `schemas/`; the suffix stays on the _file_ (`health.schema.ts`, `health.types.ts`) |

When folder-izing an existing flat file, keep the folder name identical to the old base name so every existing import path still resolves (`from '@Hooks/useHealth'` resolves to `useHealth/index.ts`).

## Props-object convention

Components and hooks that take a single object parameter with a named type declare the parameter as `props` and destructure inside the function body — never inline in the signature.

```tsx
// ✗ Don't
export const Badge = ({ code, struck = false }: BadgeProps) => { ... };

// ✓ Do
export const Badge = (props: BadgeProps) => {
  const { code, struck = false } = props;
  ...
};
```

This applies to our own named types (component props, a hook's options, a mutation's variables). It does **not** apply to library-provided shapes we don't control — leave `queryFn: ({ signal }) => ...` and Next's `{ params, searchParams }` page props patterns as the framework documents them when there's no named type of ours to swap in. If an inline object type is used more than once or is complex enough to name, extract it into `.types.ts`.

## Server vs Client Components

- Everything under `src/app` and `src/components` is a **Server Component by default**. Add `'use client'` only to a leaf that uses state, effects, event handlers, browser APIs, TanStack Query, `react-hook-form` or `react-i18next` hooks.
- `Main` is a client component because it calls `useTranslation`; `app/providers.tsx` is one because it creates the `QueryClient`.
- Keep `'use client'` boundaries low in the tree so layouts and pages stay on the server. Props passed from a server component to a client one must be serializable.
- Server data can be fetched in a Server Component and passed down as props, or prefetched and hydrated into the Query cache. Either way validate with the Zod schemas from `api/schemas`.
- Validate URL search params with a Zod schema placed next to the route (`app/<route>/search-schema/`) and parse the `searchParams` prop in `page.tsx`. In Next 16 `params` and `searchParams` are Promises: type the page props accordingly and `await` them (`const search = searchSchema.parse(await props.searchParams)`), which makes the page an `async` Server Component.

## Forms: use react-hook-form when necessary

Any form with more than one field and/or real validation (required fields, conditional requirements, cross-field rules) uses `react-hook-form` with `@hookform/resolvers/zod`, not hand-rolled `useState` + manual error flags. Define validation as a Zod schema (a `.schema.ts` sibling of the component, same idea as `api/schemas/**`, just component-scoped) and wire it via `zodResolver`. Form components are client components.

"When necessary" cuts the other way too: a single controlled input with no validation (a search box, a plain filter `<select>`) stays a plain controlled component.

## i18n boundary

Every user-facing string a **component** renders goes through `react-i18next` — routes _and_ shared components. Locales: `en` (default, fallback) and `pt`, in `src/i18n/locales/<lang>/<namespace>.json`, registered in `src/i18n/index.ts`.

- Shared text uses the `common` namespace (`useTranslation('common')`); a component or route uses its own namespace (`useTranslation('main')`) and reaches shared text with the `common:` prefix.
- **Labels for closed backend values** (statuses, enums) live in `common.json` keyed by the literal value, and the component is typed on the closed union, so a new backend value is a compile error rather than a raw enum on screen.
- **A prop that ends up as display text takes an already-translated string.** The caller translates; a component never receives an English literal to interpolate. (`Main` takes optional `title`/`description` and falls back to its own translations.)
- **Helpers return keys, not text.** A `.helpers.ts` that produces rows or labels returns a stable key and the component translates it.
- Add every key to **both** locales. `react-i18next` hooks only run in client components; for Server Components translate in a small client child or pass translated strings down. `metadata` in `layout.tsx` is currently plain English; move it to `generateMetadata` with a server-side translation if/when routes get locales.

Out of scope until a second locale is really needed in a given area: `lib/` formatters that derive display text from data, and backend-supplied text.

## Imports: path aliases and ordering

Aliases are defined once in `tsconfig.json`. Next reads `paths` natively, Vitest (`vite-tsconfig-paths`) and Playwright read the same file, and Storybook (`@storybook/nextjs-vite`) gets them through `vite-tsconfig-paths` in `.storybook/main.ts`, so there is no second alias map to maintain.

| Alias              | Target                                          |
| ------------------ | ----------------------------------------------- |
| `@Api/*`           | `src/api/*`                                     |
| `@Schemas/*`       | `src/api/schemas/*`                             |
| `@Ui/*`            | `src/components/ui/*`                           |
| `@Domain/*`        | `src/components/domain/*`                       |
| `@Components/*`    | `src/components/*`                              |
| `@Hooks/*`         | `src/hooks/*`                                   |
| `@I18n`, `@I18n/*` | `src/i18n`                                      |
| `@Libs/*`          | `src/lib/*` (folder is `lib`, alias is `@Libs`) |
| `@Styles/*`        | `src/styles/*`                                  |
| `@Test/*`          | `src/test/*`                                    |
| `@Types/*`         | `src/types/*`                                   |
| `@/*`              | `src/*` (catch-all)                             |

- **Add an alias together with its folder, the first time you need it.** Don't declare aliases for folders that don't exist. A new alias means editing `tsconfig.json` and the `organizeImports` groups in `biome.json`.
- **`./` only for a module's own siblings** (`./Main.types`). Anything outside the folder uses an alias. `../` imports are a lint error (`noRestrictedImports`), including in `e2e/` and `.storybook/`.
- **Order is enforced by Biome's `organizeImports`** (`yarn lint:fix` fixes it): `react` → `next` → `@tanstack/*` → `@testing-library/*` → other packages → `@Api`/`@Schemas` → `@Ui`/`@Domain`/`@Components` → `@Hooks`/`@Libs`/`@I18n`/`@Test`/`@Types`/`@/` → `./` siblings → `@Styles`. Blank lines between groups are not enforced.
- **Side-effect imports (`import '@I18n'`, `import '@Styles/global/index.css'`) are not sorted.** They act as barriers because their execution order can matter (`src/test/setup.ts`).
- **A new alias must also be listed in the Biome groups.** `@Foo/bar` parses as a scoped npm package, so without a group entry Biome files it with the packages.

Biome also sorts JSX attributes and object keys (`useSortedKeys`). Where key order carries meaning, keep it and say why with `// biome-ignore assist/source/useSortedKeys: <reason>`.

## Styling

Tailwind CSS 4 utilities in `className`; tokens in `src/styles/global/index.css` under `@theme` (e.g. `--color-default-background` becomes `bg-default-background`). Import the global CSS once, in `app/layout.tsx` (and `.storybook/preview.tsx`). Use `classnames` for conditional classes and `next/image` with explicit `width`/`height` and translated `alt` text. No CSS-in-JS.

## Quick checklist when adding a new module

1. Where does it go? Generic and domain-agnostic → `components/ui`; app-aware and shared across routes → `components/domain`; one route only → next to its `app/<route>/page.tsx`; server data → `api/<resource>` + `api/schemas/<resource>` + a hook in `hooks/`; pure logic → `lib/`.
2. Create the folder, named per the table above.
3. Write the implementation first. As it grows: a Props type worth naming → `.types.ts`; a lookup map → `.constants.ts`; a pure function not tied to rendering → `.helpers.ts`.
4. Write `index.ts` with explicit named exports (the component/hook plus any types other files need).
5. Signatures with a named parameter type: `(props: XProps)`, destructure in the body.
6. Does it need state, effects or i18n hooks? Mark the leaf `'use client'`; keep the rest on the server.
7. User-facing strings through `react-i18next`, with keys in both `en` and `pt`.
8. Import from outside the folder through an alias, never `../`.
9. Add a spec (`.spec.tsx`) and, for components, a story (`.stories.tsx`).
10. Run `yarn lint:fix`, then `yarn lint && yarn typecheck && yarn test`.
