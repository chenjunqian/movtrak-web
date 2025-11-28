# Movtrak Web Project

## Project Overview

Movtrak Web is a multilingual responsive website built with React + TypeScript + Vite to showcase the Movtrak iOS application. This is the official website for a motion tracking camera app that supports both Chinese and English languages, with main features including product showcase, feature introduction, usage instructions, and related page navigation.

### Tech Stack

- **Frontend Framework**: React 19.2.0 + TypeScript
- **Build Tool**: Vite 6.0.0
- **Styling Framework**: Tailwind CSS 4.1.17
- **Routing**: React Router DOM 7.9.6
- **Internationalization**: i18next 25.6.3 + react-i18next 16.3.5
- **Package Manager**: Bun (based on bun.lockb file)
- **Code Linting**: ESLint + TypeScript ESLint

### Project Structure

```
movtrak-web/
├── public/                 # Static assets
│   ├── app-move-track-screen-shot.png  # App screenshot
│   ├── favicon.png         # Website icon
│   └── logo.png           # Logo
├── src/
│   ├── components/        # Reusable components
│   │   ├── LanguageIcon.tsx    # Language icon component
│   │   └── ScrollToTop.tsx     # Scroll to top component
│   ├── locales/          # Internationalization language files
│   │   ├── en.json       # English translations
│   │   └── zh.json       # Chinese translations
│   ├── AboutPage.tsx     # About page
│   ├── App.tsx          # Main app component (routing configuration)
│   ├── i18n.ts          # Internationalization configuration
│   ├── LandingPage.tsx  # Homepage
│   ├── PrivacyPolicyPage.tsx  # Privacy policy page
│   ├── SupportPage.tsx  # Support page
│   └── TermsOfServicePage.tsx # Terms of service page
├── package.json         # Project configuration and dependencies
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Build and Run

### Development Environment

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

### Production Build

```bash
# Build production version
bun run build

# Preview production build
bun run preview
```

### Code Linting

```bash
# Run ESLint checks
bun run lint
```

## Development Standards

### Code Style

- Use TypeScript for type-safe development
- Use ESLint for code quality checks
- Components use functional components and React Hooks
- Styles use Tailwind CSS class names, following mobile-first responsive design

### Internationalization Development

- All user interface text must be managed through the i18next translation system
- Translation keys use camelCase naming, grouped by page
- When adding new text, update both `src/locales/en.json` and `src/locales/zh.json`

### Component Development

- Component files use PascalCase naming
- Use TypeScript interfaces to define props types
- Follow React best practices, using functional components and Hooks

### Route Management

- Use React Router DOM for route management
- Route configuration is centralized in the `src/App.tsx` file
- Page components are placed directly in the `src/` directory

## Main Features

### Multilingual Support

The website supports Chinese and English bilingual switching. Users can switch through the language selector in the navigation bar. Language switching updates the entire website's interface text in real-time.

### Responsive Design

Uses Tailwind CSS to implement mobile-first responsive design, ensuring good display effects on different devices.

### Page Structure

1. **Homepage (LandingPage)**: Product showcase, feature introduction, usage instructions
2. **About Page**: Detailed company and product introduction
3. **Support Page**: User support and help information
4. **Privacy Policy**: Privacy protection policy
5. **Terms of Service**: Terms and conditions of use

### Interactive Features

- Language switcher: Supports real-time switching between Chinese and English
- Download modal: Clicking the download button shows development-in-progress notification
- Smooth scrolling: Navigation links support smooth scrolling within the page
- Hover effects: Interactive feedback for buttons and links

## Development Notes

1. **Image Assets**: App screenshot located at `public/app-move-track-screen-shot.png`
2. **Brand Colors**: Primary color is green (#59E46E), used for emphasis elements and brand identity
3. **Development Status**: Application is still under development, related notifications are displayed through modals
4. **SEO**: Website includes sitemap.xml and robots.txt for search engine optimization

## Deployment Instructions

Static files after project build are located in the `dist/` directory and can be deployed to any static file hosting service. The build command first performs TypeScript compilation checks, then executes Vite build.
