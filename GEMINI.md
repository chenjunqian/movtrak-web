# Movtrak Web

**Movtrak Web** is the official landing page and web presence for the Movtrak iOS application ("Pocket Motion Tracking Camera"). It showcases the app's features, smart tracking technology, and use cases like rock climbing and solo workouts.

## Project Overview

- **Type:** Single Page Application (SPA)
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Runtime/Package Manager:** Bun

## Tech Stack & Key Libraries

- **React:** Frontend UI library (v19).
- **Vite:** Build tool and dev server.
- **Tailwind CSS:** Utility-first CSS framework (v4, integrated via `@tailwindcss/vite`).
- **React Router DOM:** Client-side routing.
- **ESLint:** Code linting (v9 flat config).

## Building and Running

This project uses `bun` for dependency management and script execution.

### Install Dependencies
```bash
bun install
```

### Development Server
Start the dev server with Hot Module Replacement (HMR):
```bash
bun run dev
```

### Production Build
Build the application for production (outputs to `dist/`):
```bash
bun run build
```

### Preview Build
Preview the production build locally:
```bash
bun run preview
```

### Linting
Run ESLint to check for code quality issues:
```bash
bun run lint
```

## Project Structure

- **`src/`**: Source code.
  - **`App.jsx`**: Main application component. defines high-level routes (`/`, `/about`, `/support`).
  - **`LandingPage.jsx`**: The primary landing page component featuring the Hero, Features, How-It-Works, and Footer sections.
  - **`main.jsx`**: Entry point rendering the React app into the DOM, wrapped in `BrowserRouter`.
  - **`index.css`**: Global styles and Tailwind imports (`@import "tailwindcss";`).
- **`public/`**: Static assets served at the root path.
- **`vite.config.js`**: Vite configuration, including React and Tailwind plugins.
- **`eslint.config.js`**: ESLint configuration (flat config format).

## Branding & Design Guidelines

- **Primary Color:** Green `#59E46E` (matches the iOS app's identity).
- **Backgrounds:** Dark theme (`bg-gray-900`, `bg-black`) to emphasize the modern, high-tech feel.
- **Typography:** Sans-serif (System UI / Inter).
- **Visuals:** Uses placeholders for app screenshots; designed to be replaced with actual product imagery.

## Development Conventions

- **Component Style:** Functional components with Hooks.
- **Styling:** Use Tailwind utility classes directly in JSX (`className`). Avoid separate CSS files unless necessary for complex animations or global overrides.
- **Routing:** Define routes in `App.jsx` using `Routes` and `Route` from `react-router-dom`.
- **Navigation:** Use `<Link>` for internal navigation to preserve SPA state.
