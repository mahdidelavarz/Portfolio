# Mahdi Delavar — Portfolio (CLAUDE.md)

This file gives Claude (and future contributors) the context needed to work
in this repo effectively. It documents the architecture as it actually is,
plus an honest evaluation of strengths and issues found during review.

## Overview

A single-page personal portfolio built with **Next.js 15 (App Router)**,
**React 19**, **TypeScript (strict)**, and **Tailwind CSS 4**. Deployed to
**Liara** at `https://mahdidelavar.ir`. The entire site is one route
(`src/app/page.tsx`) composed of stacked full-height `<Section>`s (Home,
About, Education, Experience, Projects, Skills, Contact), navigated via a
fixed side menu (desktop) and a slide-in burger menu (mobile).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (ESLint runs during the build and must
  pass with no errors)
- `npm run start` — run production build
- `npm run lint` — run ESLint manually

## Architecture

- `src/app/layout.tsx` — root layout. Loads Inter/Poppins fonts, sets a huge
  amount of SEO metadata (OpenGraph, Twitter cards, geo tags, multiple
  JSON-LD `<script>` blocks for Person/WebSite/Breadcrumb schemas).
- `src/app/page.tsx` — the actual homepage. Also defines its own `metadata`
  export and a large `structuredData` JSON-LD object (overlapping heavily
  with what's in `layout.tsx`). Renders `<HeaderMenu>`, `<BurgerMenu>`, then
  each section wrapped in `<Section>`, using `next/dynamic` to lazy-load all
  below-the-fold sections from `src/components/client/*`.
- `src/components/client/*.tsx` — the real content sections: `About`,
  `Education`, `Experiences`, `Projects`, `Skills`, `ContactMe`. All are
  `"use client"`, heavily memoized (`memo`, `useCallback`, `useMemo`), and
  use `IntersectionObserver` for scroll-in animations. Content (bio, skills,
  experience, projects) is hardcoded as local `const` data arrays — there is
  no CMS or data layer.
- `src/components/HomeSection.tsx` + `src/components/server/Home.server.tsx`
  — the hero section. Despite the `.server.tsx` name/folder, this is rendered
  from inside a `"use client"` component, so it is **not** an actual RSC —
  the naming is misleading.
- `src/components/HeaderMenu.tsx` — desktop-only fixed vertical nav,
  scroll-spy via `IntersectionObserver`/scroll position.
- `src/components/BurgerMenu.tsx` — mobile slide-in nav + social links.
- `src/components/Section.tsx` — simple full-height section wrapper.
- `src/components/GoBackBtn.tsx`, `src/app/not-found.tsx` — 404 page.
- `src/icons/icons.tsx` — ~1,900-line hand-built barrel of SVG icon
  components (Iconify/Solar/Mingcute/Logos/etc. families), each exported as
  its own named React component (e.g. `SolarHeartBold`, `MingcuteMailLine`).
  Every component imports exactly the icons it needs from this one file.

## Conventions in this codebase

- Client components are `memo`'d, with small sub-components (cards, list
  items) also `memo`'d and given `displayName`.
- Static content/config data lives in `UPPER_SNAKE_CASE` `const` arrays with
  `as const`, defined at module scope above the component.
- Animations: `IntersectionObserver` sets `isVisible`, then Tailwind
  transition classes (`translate-y-10 opacity-0` → `translate-y-0
  opacity-100`) with per-item `transitionDelay`.
- Icons are imported by name from `@/icons/icons`, not from `@iconify/react`
  directly in feature components.
- Path alias `@/*` → `./src/*` (tsconfig).

## Known issues / things to be aware of

1. No automated tests, despite `Skills.tsx` claiming Jest/Cypress experience
   and `eslint-config-next` being present.

### Resolved

The following were identified in an earlier review and have since been fixed:

- Removed unused 3D/particle dependencies (`three`, `@react-three/fiber`,
  `@react-three/drei`, `maath`, `@tsparticles/*`, `tsparticles`,
  `react-tsparticles`) and the dead `Particle.tsx`/`ParticleWrapper.tsx`
  components.
- `next.config.js` no longer sets `eslint.ignoreDuringBuilds` — lint runs
  (and must pass with 0 errors) during `npm run build`. Also fixed an
  `eslint.config.mjs` bug where `ignores` was combined with `rules` in the
  same config object, which silently failed to exclude `.next/**` from
  linting.
- Deduplicated JSON-LD structured data: `layout.tsx` now only defines the
  `WebPage` schema; `Person`/`WebSite`/`BreadcrumbList` live solely in
  `page.tsx`'s `@graph` (with correct phone number and no placeholder
  university/images). Removed placeholder Google/Yandex/Yahoo verification
  codes from `layout.tsx`.
- Fixed missing/placeholder asset references: OpenGraph/Twitter/JSON-LD
  images now point to the existing `/portfolio.png`; `icons`/`apple` icons
  use existing `favicon.png`/`favicon4.png`; added `public/manifest.json`;
  removed the non-existent `sitemap-0.xml` entry from `robots.txt`; fixed
  `sitemap.xml`'s `/resume.pdf` → `/Mahdi_Delavar.pdf`.
- `Projects.tsx` now lists Mahdi's real projects (Nazi Shop, ChatVault, ERP
  Core, NaziShop/Glamour Shop) with real tech stacks, GitHub links, and
  live URLs where deployed; "View Live"/"Source Code" are real `<a>` links
  (the live button is omitted when there's no live URL).
- Removed dead/commented code in `About.tsx` (commented-out CTA block and
  `metadata` export).
- `ContactMe.tsx`'s placeholder "Schedule Call" → `calendly.com/your-link`
  button now links to Telegram (`https://t.me/osis13`).
- Added `.env.example` documenting the three `NEXT_PUBLIC_EMAILJS_*` vars
  (with a `.gitignore` exception so it can be committed despite `.env*`).

## Strengths

- Modern, up-to-date stack (Next 15 / React 19 / Tailwind 4 / TS strict).
- Thoughtful performance work: `next/dynamic` code-splitting per section,
  heavy use of `memo`/`useCallback`/`useMemo`, scroll-spy throttled via
  `requestAnimationFrame`.
- Consistent visual language (slate/cyan gradient theme, glassmorphism
  cards) across all sections.
- Mobile-specific UX considered separately (e.g. `Experiences.tsx` and
  `Skills.tsx` have distinct mobile vs. desktop layouts/sliders with touch
  and keyboard navigation).
- Very thorough SEO setup in intent (structured data, sitemap, robots.txt,
  OpenGraph/Twitter cards), even if some of it needs cleanup (see above).
