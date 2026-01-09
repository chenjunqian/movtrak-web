# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Movtrak Web is the official landing page for the Movtrak iOS motion tracking app. It's a multilingual (EN/ZH) marketing website built as a React SPA with TypeScript.

**Tech Stack:** React 19 + Vite 6 + Tailwind CSS v4 + React Router 7 + i18next

## Commands

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Production build (runs TypeScript check first)
bun run build

# Preview production build
bun run preview

# Run ESLint
bun run lint
```

## Architecture

- **Routing:** Routes are centralized in `src/App.tsx` using React Router DOM
- **Pages:** Page components (LandingPage, AboutPage, SupportPage, etc.) live directly in `src/`
- **Components:** Reusable components are in `src/components/`
- **i18n:** Translation files in `src/locales/{en,zh}.json`, configuration in `src/i18n.ts`
- **Styles:** Tailwind CSS v4 via `@import "tailwindcss";` in `src/index.css`

## Conventions

- **Components:** PascalCase naming, functional components with Hooks
- **Props:** Use TypeScript interfaces for type safety
- **i18n keys:** camelCase, grouped by section (e.g., `hero.title`, `footer.contact`)
- **Styling:** Use Tailwind utility classes directly in `className`
- **Navigation:** Use `<Link>` from react-router-dom for internal links

## Branding

- **Primary color:** Green `#59E46E`
- **Theme:** Dark theme (`bg-gray-900`, `bg-black`)
