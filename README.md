# HexaLabs Hosting — Website

A production-ready Nuxt 3 (Vue-based) website for HexaLabs Hosting, a game server hosting company based in France.

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3, SSR-ready)
- **Styling**: Pure CSS with custom design system (no Tailwind dependency)
- **Fonts**: Orbitron (headings) + DM Sans (body) via Google Fonts
- **Theme**: Dark/futuristic with hexagon motifs, cyan + violet accents

## Project Structure

```
hexalabs-hosting/
├── app.vue                     # Root app entry
├── nuxt.config.ts              # Nuxt configuration
├── layouts/
│   └── default.vue             # Main layout (header + footer wrapper)
├── pages/
│   ├── index.vue               # Homepage
│   ├── privacy.vue             # Privacy Policy (GDPR-compliant)
│   └── terms.vue               # Terms of Service
├── components/
│   ├── AppHeader.vue           # Fixed navigation header
│   ├── AppFooter.vue           # Footer with links
│   ├── HexBackground.vue       # Reusable hex grid SVG background
│   ├── HeroSection.vue         # Landing hero section
│   ├── FeaturesSection.vue     # Features + supported games grid
│   └── FAQSection.vue          # Accordion FAQ + CTA banner
├── assets/css/
│   └── main.css                # Global styles, CSS variables, animations
└── public/
    └── logo.png                # HexaLabs logo
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment (Node.js)

The site runs as a Node.js server out of the box with Nuxt 3.

```bash
npm run build
node .output/server/index.mjs
```

Or with PM2:
```bash
npm install -g pm2
npm run build
pm2 start .output/server/index.mjs --name hexalabs
```

Set environment variables:
```
PORT=3000
HOST=0.0.0.0
NITRO_HOST=0.0.0.0
NITRO_PORT=3000
```

## Future Retrofit Points

The codebase is structured to make adding dynamic features straightforward:

- **API Routes**: Add `server/api/` files for backend endpoints (Nuxt Nitro)
- **Authentication**: Add `@sidebase/nuxt-auth` or `nuxt-auth-utils` module
- **Database**: Connect via `server/utils/db.ts` using Drizzle ORM or Prisma
- **Plans/Pricing**: Replace static data in `FeaturesSection.vue` with `useFetch('/api/plans')`
- **Runtime Config**: Extend `runtimeConfig` in `nuxt.config.ts` for env vars
- **i18n**: Add `@nuxtjs/i18n` module for multilingual support
- **Analytics**: Add Plausible or Umami (privacy-friendly, GDPR-compatible)

## Customisation

### Update contact email
Find `contact@hexalabs.fr` across the components and update to your actual email address.

### Add/remove games
Edit the `supportedGames` array in `components/FeaturesSection.vue`.

### Update FAQ
Edit the `faqs` array in `components/FAQSection.vue`.

### Colors
All design tokens are in `assets/css/main.css` under `:root { ... }`. Key variables:
- `--accent-cyan`: `#00d4ff`
- `--accent-purple`: `#7c3aed`
- `--bg-void`: `#060614` (deepest background)

## Legal Pages

Both `/privacy` and `/terms` are fully written in plain language and cover:
- **Privacy Policy**: GDPR-compliant, covers data collection, CNIL reference, user rights
- **Terms of Service**: Acceptable use, billing, refunds, French law governing clause

> **Note**: These legal pages are a good starting point but should be reviewed by a legal professional before going live.
