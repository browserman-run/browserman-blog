# BrowserMan Blog

Standalone Astro blog for BrowserMan.

This repo is intentionally separate from the main `browserman` product repo so content publishing, SEO, and deployment can move on their own cadence.

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

- connect this repo to Railway
- auto-deploy from `main`
- bind the custom domain `blog.browserman.run`

## Why separate from the main repo

Because the blog and product app have different concerns:

- different release cadence
- different content structure
- different SEO needs
- lower-risk publishing workflow
