# Launch checklist — Browser agents need permission boundaries

Created: 2026-05-09 07:40 UTC
Status: operational checklist for when BrowserMan reconnects

Related files:

- Draft: `browser-agents-permission-boundaries-draft.md`
- X pack: `browser-agents-permission-boundaries-x-pack.md`
- Cover brief: `browser-agents-permission-boundaries-cover-brief.md`
- DEV.to plan: `browser-agents-permission-boundaries-devto-plan.md`

## Current blocker

BrowserMan `cedar-vale` has been offline during repeated heartbeats on 2026-05-09, so live X/DEV.to discovery, recent-post checks, public interactions, and DEV.to drafting are blocked.

Do not publish from this package until BrowserMan reconnects or JQ explicitly asks to publish without fresh live signals.

## Launch sequence when BrowserMan is online

### 1. Verify BrowserMan + script catalog

```bash
browserman browser ping --json
browserman script list --json
browserman script actions --platform x --json
browserman script actions --platform forem --json
```

### 2. Collect fresh signals

Run at least 3–5 X searches, including one `filter:blue_verified` query:

```text
filter:blue_verified browser agent permissions
filter:blue_verified agent approval workflow
filter:blue_verified logged-in browser session
filter:blue_verified browser agent audit trail
filter:blue_verified Claude Code browser min_faves:5 lang:en
```

Optional DEV.to search:

```text
AI agents browser automation
MCP browser automation
browser automation security
```

Minimum evidence before publish:

- one builder signal about browser-agent/session authority;
- one operator/workflow pain point involving logged-in SaaS/admin/browser work;
- one security/control-plane/approval/audit signal.

Record useful signals in CRM before using them in distribution.

### 3. Update the article draft

Edit `browser-agents-permission-boundaries-draft.md` with:

- 2–3 fresh signals or examples;
- concrete examples from support inbox, CMS publishing, CRM updates, or admin dashboards;
- any final product-fact corrections from `memory/browserman-product-facts.md`.

Keep BrowserMan positioning accurate:

- real Chrome session;
- agents can run anywhere;
- cookies stay local;
- hosted relay moves commands and does not persist page content/cookies/credentials;
- access can be scoped, audited, gated, and revoked.

### 4. Promote to Blog content path

Move/copy final article to the blog content path used by the repo, likely:

```text
browserman-blog/src/content/blog/en/browser-agents-permission-boundaries.md
```

Confirm existing content structure before moving.

Required frontmatter:

```yaml
title: "Browser agents need permission boundaries, not just better clicking"
description: "Browser control is becoming cheap. The hard part is deciding which browser actions are safe, which need approval, and what evidence remains after the session changes state."
pubDate: 2026-05-09
heroImage: ../../assets/og/browser-agents-permission-boundaries.png
```

### 5. Generate cover image

Use `browser-agents-permission-boundaries-cover-brief.md`.

Save final image to:

```text
browserman-blog/src/assets/og/browser-agents-permission-boundaries.png
```

### 6. Build and commit Blog publish

```bash
cd /data/openclaw/workspace/browserman-blog
npm run build
git status --short
git add src/content/blog/en/browser-agents-permission-boundaries.md src/assets/og/browser-agents-permission-boundaries.png
git commit -m "Publish browser agent permission boundaries"
```

Push only after build passes and the diff looks clean.

### 7. Publish / verify Blog

Expected URL if slug remains unchanged:

```text
https://blog.browserman.run/blog/browser-agents-permission-boundaries/
```

Verify page loads and hero image renders.

### 8. DEV.to canonical repost

Use `browser-agents-permission-boundaries-devto-plan.md`.

Required:

- canonical URL points to the Blog URL;
- tags verified after publish/draft;
- title matches or closely mirrors Blog title;
- product section is lighter than Blog version if needed.

Preferred tags:

```text
ai, webdev, automation, security
```

### 9. X distribution

Use only 1–2 items from `browser-agents-permission-boundaries-x-pack.md` in the first distribution window.

Recommended first standalone post after Blog publish:

```text
A logged-in browser session is not just context.

It is authority.

That changes the product question from “can the agent click?” to “which clicks should be impossible without approval?”
```

If replying to live posts, keep replies short and human. Do not use a mini-essay.

### 10. CRM + memory closeout

After publish/distribution:

- record Blog publish in memory;
- record DEV.to publish URL and canonical status;
- record X post/reply URLs in CRM;
- add follow-ups for any promising accounts discovered during launch.

## Do not do

- Do not publish DEV.to before Blog canonical exists.
- Do not omit hero image from Blog publish.
- Do not post multiple adjacent variants of the same X hook.
- Do not publish without checking recent BrowserMan posts once X is reachable.
- Do not turn the article into a hard product announcement.
