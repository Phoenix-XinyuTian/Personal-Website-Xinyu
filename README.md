# personal-website-xinyu

This repository contains a personal website built with Next.js and Tailwind CSS. The homepage is designed to showcase your research, projects, and life abroad.

## Features

- Responsive landing page with hero, about, project, life, and contact sections.
- Clean styling using Tailwind CSS and custom font setup.
- Basic SEO metadata and social preview configuration in `app/layout.tsx`.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to view the site.

## Customize

- Update `app/page.tsx` to replace placeholder content, project summaries, and contact details.
- **Add images**: Place your images in the `public/images/` folder, then update the image paths in `app/page.tsx`. For example:
  - Portrait photo: Save as `public/images/portrait.jpg` (or .png/.webp)
  - Project screenshots: Save as `public/images/project1.jpg`, etc.
  - The code already uses Next.js `Image` component for optimization.
- Replace the portrait area with a real image or use `next/image` for optimized photo loading.
- Update `app/layout.tsx` metadata values for a personalized page title and description.

## Build & deploy

Use the following scripts:

- `npm run dev` — start development server
- `npm run build` — generate production build
- `npm run start` — run production server

This project is easy to deploy on Vercel, Netlify, or any Next.js-compatible platform.

## Notes

Remember to replace placeholder URLs and email addresses with your actual GitHub, LinkedIn, and contact information before publishing.
