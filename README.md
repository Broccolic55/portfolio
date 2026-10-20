# Abimanyu — Cybersecurity Portfolio

A dark, responsive portfolio for an early-career cybersecurity student, built with React, TypeScript, and Vite. Content and personal details are centralized in `src/data/profile.ts`.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Install and run

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

The static production site is generated in `dist/` and can be hosted on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

## Personalize the site

Edit `src/data/profile.ts` to update the name, role, contact details, social URLs, resume path, About copy, projects, skills, training, and experience. Empty social or email values are intentionally omitted or shown as a replacement reminder. Add the resume PDF at `public/resume.pdf` to enable the default resume link. Replace the visibly indicated repository and certification details only with verified information.

Update the canonical URL in `index.html` before publishing on a custom domain. Configure the custom domain in the hosting provider; for GitHub Pages, add the domain in repository Settings → Pages and configure DNS with your domain registrar. Do not commit private credentials or environment files.

## GitHub Pages

The Vite base is `./`, so local development is unaffected and generated asset paths are relative for repository hosting. In the repository, open Settings → Pages, choose GitHub Actions as the source, then add `.github/workflows/deploy.yml` below. The workflow builds and publishes `dist` on pushes to `main`.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Structure

```text
public/               Static assets (resume.pdf, favicon.svg)
src/
  data/profile.ts     Editable portfolio content
  App.tsx             Page sections and interactions
  main.tsx            React entry point
  styles.css          Responsive design system and styles
index.html            Metadata and app shell
vite.config.ts        Vite configuration
```
