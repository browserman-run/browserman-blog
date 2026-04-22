# BrowserMan Blog

Standalone Astro blog for BrowserMan.

This repo is intentionally separate from the main `browserman` product repo so content publishing, SEO, and deployment can move on their own cadence.
It is configured to deploy to GitHub Pages.

Planned production URL:
- `https://blog.browserman.run`

## Stack

- Astro
- Markdown content collections
- RSS
- Sitemap
- Railway deploys from GitHub

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content

Add posts under:

```text
src/content/blog/
```

Each post uses frontmatter like:

```md
---
title: My post
description: Short summary
pubDate: 2026-04-22
---
```

## Deploy

Recommended deploy flow:

- push to `main`
- GitHub Actions builds and deploys to GitHub Pages
- the custom domain is set via `public/CNAME`
- bind the domain `blog.browserman.run` in the repo Pages settings

GitHub Pages settings:

- source: GitHub Actions
- custom domain: `blog.browserman.run`
- keep HTTPS enabled after DNS is live

## Why separate from the main repo

Because the blog and product app have different concerns:

- different release cadence
- different content structure
- different SEO needs
- lower-risk publishing workflow
