# DEV.to plan — Browser agents need permission boundaries

Created: 2026-05-09 07:10 UTC
Source draft: `browser-agents-permission-boundaries-draft.md`
Status: prep only; do not publish until the BrowserMan Blog article is live.

## Purpose

Prepare the DEV.to canonical repost path for the BrowserMan article:

> Browser agents need permission boundaries, not just better clicking

The article is developer-facing enough for DEV.to because it gives a practical model for agent builders: read boundary, act boundary, submit boundary, recovery boundary.

## Publish prerequisites

Before creating/publishing on DEV.to:

1. BrowserMan `cedar-vale` is online or another verified DEV.to publishing path is available.
2. Blog article is published first on `https://blog.browserman.run/blog/browser-agents-permission-boundaries/` or the final canonical slug.
3. Blog article has a hero image and `npm run build` has passed.
4. 2–3 fresh X/DEV.to signals have been added to the article or to distribution notes.
5. DEV.to post must set canonical URL to the BrowserMan Blog URL.
6. Tags and canonical URL must be verified after publishing/drafting because DEV.to tag input can behave oddly.

## Recommended DEV.to title

Browser agents need permission boundaries, not just better clicking

## Recommended subtitle / description

Browser control is becoming easy. The harder part is deciding which browser actions are safe, which need approval, and what evidence remains after a logged-in session changes state.

## Tags

Preferred:

- `ai`
- `webdev`
- `automation`
- `security`

Alternates if tag fit looks poor:

- `programming`
- `devtools`
- `mcp`
- `javascript`

Avoid over-specific tags that may not exist or may reduce reach.

## Canonical URL placeholder

`https://blog.browserman.run/blog/browser-agents-permission-boundaries/`

Confirm final slug before publishing.

## DEV.to intro adjustment

DEV.to readers respond better to practical framing than brand/category framing. Keep the opening developer-first:

```md
Browser agents are getting easier to build. The question is no longer just whether an agent can click through a page.

The harder question is what the agent should be allowed to do when that page is part of a real logged-in browser session.
```

Then continue into the existing article.

## Suggested DEV.to body changes

Use the Blog article body with light edits:

1. Keep the four-boundary framework prominent.
2. Add a short checklist section near the top or after “Four boundaries browser agents need”.
3. Reduce product language in “Where BrowserMan fits” by 20–30%; keep it as author context, not CTA.
4. Add a one-line note at the end:

```md
Originally published on the BrowserMan blog: <canonical URL>
```

## Practical checklist block for DEV.to

Add this as a boxed/list section if the final article needs more developer utility:

```md
### Browser-agent permission checklist

Before an agent touches a logged-in browser session, define:

- which session or browser profile is in scope;
- which sites, tabs, tenants, or records it can read;
- which actions it can take without approval;
- which actions require approval before submit;
- what receipt is left after state changes;
- how the delegation can be paused or revoked.
```

## Draft social copy for DEV.to share

```text
Prepared a DEV.to version of the BrowserMan article on browser-agent permission boundaries.

The practical model: read silently, draft freely, ask before submit, leave a receipt after state change.
```

Use only after the article is live or drafted.

## BrowserMan CLI path when online

Check script catalog first:

```bash
browserman script list --json
browserman script actions --platform forem --json
browserman script describe --platform forem --action draft_article --json
```

Then draft using `--base-url https://dev.to` and `--text` for the Markdown body if the script supports it.

Expected verification after draft/publish:

```bash
browserman script run --platform forem --base-url https://dev.to --action get_user_articles --json
```

If canonical URL/tags cannot be verified via script, use low-level BrowserMan page commands to inspect the DEV.to editor/article page.

## Do not do

- Do not publish DEV.to before the Blog canonical article exists.
- Do not omit canonical URL.
- Do not create a separate title that competes with the Blog SEO title.
- Do not turn this into a product announcement.
- Do not use DEV.to for the short X-style hooks; DEV.to should carry the durable practical article.
