# AGENTS.md — Movtrak Web

Landing page for the Movtrak iOS app — a single-package React SPA. No monorepo.

## Commands

```bash
bun install           # install deps
bun run dev           # vite dev server
bun run build         # tsc -b && vite build (typecheck then build)
bun run preview       # vite preview
bun run lint          # eslint . (flat config)
```

No tests, no formatter config.

## Build & Lint quirks

- `bun run build` runs `tsc -b` first (project references). A type error **halts the build**.
- `tsc -b` checks both `tsconfig.app.json` (src/) and `tsconfig.node.json` (vite.config.ts).
- Lint ignores `dist/` only.
- Strict TS: `noUnusedLocals`, `noUnusedParameters` are errors.

## Architecture

| Layer | Location | Notes |
|-------|----------|-------|
| Entry | `src/main.tsx` | Mounts `<BrowserRouter>` + `<ScrollToTop>` + `<App>` |
| Routes | `src/App.tsx` | 5 routes: `/`, `/about`, `/support`, `/privacy`, `/terms` |
| Pages | `src/*.tsx` | Flat in `src/`, no `pages/` dir |
| Components | `src/components/` | `LanguageIcon.tsx`, `ScrollToTop.tsx` |
| i18n | `src/locales/{en,zh}.json` | Inited in `src/i18n.ts`, default `en`, no auto-detect |
| Styles | `src/index.css` | `@import "tailwindcss"` + custom carousel keyframes |

- All pages are direct children of `<Routes>` (no shared layout wrapper).
- LandingPage contains image carousel with preloading logic.
- Brand accent: `#59E46E`. Dark theme via Tailwind (`bg-gray-900`, `bg-black`).

## Conventions

- PascalCase for components, camelCase for i18n keys (grouped by section).
- Tailwind utility classes only (no CSS modules).
- `<Link>` from react-router-dom for internal navigation.
- Import extension `.tsx` preferred (note: `main.tsx` uses `'./App.jsx'` — Vite resolves it, but stick with `.tsx`).
- React 19 strict mode via `<StrictMode>` in main.tsx.

## Known quirks

- `src/main.tsx` imports App as `'./App.jsx'` — this works with Vite but is inconsistent. Use `'./App'` or `'./App.tsx'` in new code.
- Image assets for the carousel live in `/public/` (e.g., `/app-human-pose-detect-1.png`), not imported via Vite.
- i18next uses `resources` object (not loading via backend plugin). New locale keys must be added to both `en.json` and `zh.json`.
- No `path` aliases configured; imports are relative.
- `public/_redirects` contains `/* /index.html 200` for Cloudflare Pages SPA fallback.
- CF Pages build environment lacks `bun` — use `npx --yes bun install && npx --yes bun run build` as build command, or use npm-equivalent.
