---
title: Launching the BrowserMan blog
description: Why BrowserMan is splitting the blog into its own Astro project and what will be published here.
pubDate: 2026-04-22
---

BrowserMan now has a dedicated blog project.

That split is intentional.

The main BrowserMan repo should stay focused on product code: the extension, onboarding flow, dashboard, delegated approvals, and the browser runtime itself.

The blog has a different job.

It needs a clean writing flow, lightweight deploys, and a structure that is easy to maintain as a content site. Astro is a better fit for that than trying to bolt a blog onto the main product app.

This site will hold:

- product updates
- launch notes
- onboarding and UX decisions
- design rationale
- practical browser automation writing
- longer-form thinking that does not belong inside the app itself

It is also set up to deploy independently from the product.

That means publishing a post should feel like publishing content, not shipping the whole BrowserMan app.

The first version is intentionally simple. Clean pages, markdown content, RSS, sitemap, and a straightforward GitHub-to-Railway deploy path.

From here, the goal is consistency: publish notes that help people understand what BrowserMan is building and why.
