# ProWIFETA Website

This repository contains the ProWIFETA website built with React, Vite, and React Router.

## Overview

The site presents ProWIFETA as a professional association for women in fashion education and training. It includes a redesigned landing page, a visual gallery, a members section, and an event blog for publishing recaps and photo stories.

## Current highlights

- Professional landing page with a director spotlight and clearer section flow
- Gallery experience powered by local image assets
- Edwenase event photo set added to the public gallery and blog
- Blog page with featured event stories, recent posts, and detailed archive entries
- Sticky archive side navigation for browsing event posts on desktop
- Archive filters and photo counts for easier event discovery
- Footer social presence for Facebook and TikTok

## Project structure

- `src/components/LandingPage.jsx` and `src/components/LandingPage.css`
- `src/components/Galleries.jsx` and `src/components/Galleries.css`
- `src/components/Blog.jsx` and `src/components/Blog.css`
- `public/img/events/edwenase-edit/` for the latest event images

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

## Deployment note

This app uses `BrowserRouter`, so your hosting platform should rewrite routes such as `/blog` back to `index.html`.

## Content updates

- Add or edit event stories in `src/components/Blog.jsx`
- Add new public event images under `public/img/events/`
- Update landing page copy, members, and spotlight content in `src/components/LandingPage.jsx`
