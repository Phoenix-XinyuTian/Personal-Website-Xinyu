# Xinyu Tian | Phoenix — Personal Website

A dual-mode, bilingual personal brand website built with Next.js 16, React 19, and Tailwind CSS v4.

## Overview

Single-page SPA with two distinct modes toggled from the header:

| Mode | Sections |
|------|----------|
| **Work** | Hero · About · Experience · Projects · Education · Contact |
| **Life** | Hero · About · Media · Travel · Life Gallery · Contact |

Language can be switched between English and 简体中文 at any time. The transition between modes is animated with a smooth fade and scroll-to-top.

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Manrope + Cormorant Garamond (Google Fonts via `next/font`)
- **Image optimisation**: `next/image` with `sharp`

## Key features

- **Dual-mode toggle** — Work vs Life with a sliding pill indicator and animated content swap
- **Bilingual** — full EN / ZH translation object in `app/page.tsx`; no external i18n library
- **Education gallery** — auto-playing image carousel per entry; desktop uses CSS keyframe slide animations, mobile uses infinite-loop track + touch/swipe drag
- **Sticky responsive header** — desktop nav + hamburger drawer on mobile
- **Social links** — LinkedIn, GitHub, YouTube, Instagram, X (Twitter), Facebook
- **SEO metadata** — OpenGraph and Twitter card configured in `app/layout.tsx`
- **Dev banner** — visible reminder that the site is still under development

## Project structure

```
app/
  layout.tsx      # Root layout, metadata, fonts
  page.tsx        # Entire SPA — translations, sections, components
  globals.css     # Global styles and Tailwind base
public/
  images/
    portrait.jpeg # Used in the About section
    1.jpg …       # Education gallery images (NUS: 1–3, SWJTU: 11–16)
```

## Getting started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint check |

## Customisation

### Content

All copy lives in the `translations` object at the top of [app/page.tsx](app/page.tsx). Edit both `en` and `zh` keys together:

- `hero` / `lifeHero` — headline and description
- `about` — about section body
- `experience.entries` — role, company, bullets
- `projects` — title, description, tags, href
- `education.entries` — degree, institution, period, description
- `media`, `travel`, `gallery` — Life mode content
- `contactCard.email` — your public email address

### Images

Place files in `public/images/`:

| File | Used in |
|------|---------|
| `portrait.jpeg` | About section |
| `1.jpg`, `2.jpeg`, `3.jpeg` | NUS education gallery |
| `11.jpeg` – `16.jpeg` | SWJTU education gallery |

Update the `educationGalleryImages` array in `app/page.tsx` if you add or rename files.

### Social links

Edit the `socialLinks` array in `app/page.tsx` to update or add platform URLs.

### Institution logos

`educationLogoAssets` and `experienceLogoAssets` accept a `src` field. Set it to an image path to replace the text fallback badge.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URL used in OpenGraph metadata |

## Deployment

The project is ready for [Vercel](https://vercel.com). Set `NEXT_PUBLIC_SITE_URL` to your production domain in the Vercel project settings before deploying.
