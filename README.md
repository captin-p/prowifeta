# ProWIFETA Website

This repository contains the ProWIFETA website built with React, Vite, and React Router.

## What’s included

- A redesigned landing page for ProWIFETA
- A curated gallery section using local event images
- A leadership section featuring the association team
- A blog/events page for publishing event details and event pictures

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production-ready files are generated in `dist/`.

## Deployment note

This app uses `BrowserRouter`, so your hosting platform should rewrite app routes such as `/blog` back to `index.html`.
