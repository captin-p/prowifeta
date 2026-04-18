# ProWIFETA Website

This repository contains the ProWIFETA website built with React, Vite, and React Router.

## Overview

The site presents ProWIFETA as a professional association for women in fashion education and training. It includes a redesigned landing page, a visual gallery, an updated members section, and an event blog for publishing programme recaps, advocacy updates, and photo stories.

## Current highlights

- Professional landing page with updated member bios and leadership spotlight
- Footer social presence for Facebook, TikTok, and YouTube
- Gallery experience powered by local image assets
- Expanded event archive covering outreach, advocacy, keynote, awards, and graduation milestones
- Real media added for the Agenda Wear Ghana campaign and Kumasi Art Experience posts
- Build-time prerendering for `/` and `/blog` to improve SEO and first-load content
- Sticky archive side navigation with filters and photo counts for easier event discovery
- Production build now includes SPA rewrite support for Apache and IIS hosting

## Project structure

- `src/components/LandingPage.jsx` and `src/components/LandingPage.css`
- `src/components/Galleries.jsx` and `src/components/Galleries.css`
- `src/components/Blog.jsx` and `src/components/Blog.css`
- `public/img/events/edwenase-edit/` for the Edwenase outreach gallery
- `public/img/events/agenda-wear-media-launch/` for Agenda Wear Ghana media launch photos
- `public/img/events/agenda-wear-official-launch/` for Agenda Wear Ghana official launch photos
- `public/img/events/kumasi-art-experience-2026/` for Kumasi Art Experience photos
- `public/.htaccess` and `public/web.config` for server-side SPA route rewrites

## Local development

```bash
npm install
npm run dev
```

## Available scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Production build

```bash
npm run build
```

The production-ready files are generated in `dist/`.

The build now runs in two stages:

- Vite creates the client bundle
- A prerender step generates static HTML for `/` and `/blog` so those routes ship with real content in the initial response

## Deployment note

This app uses `BrowserRouter`, so your hosting platform should rewrite routes such as `/blog` back to `index.html`. The repository now includes:

- `public/.htaccess` for Apache-based hosting
- `public/web.config` for IIS-based hosting
- prerendered output for `/` in `dist/index.html`
- prerendered output for `/blog` in `dist/blog/index.html`

For a typical server upload, deploy the contents of `dist/`.

## Content updates

- Add or edit event stories in `src/components/Blog.jsx`
- Add new public event images under `public/img/events/`
- Update landing page copy, members, spotlight content, and social links in `src/components/LandingPage.jsx`
