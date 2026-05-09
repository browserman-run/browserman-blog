# Cover brief — Browser agents need permission boundaries

Created: 2026-05-09 06:40 UTC
Article draft: `browser-agents-permission-boundaries-draft.md`
Status: ready for image generation after final article decision

## Goal

Create a 16:9 BrowserMan Blog hero image for the article:

> Browser agents need permission boundaries, not just better clicking

The image should communicate controlled delegated browser authority: an AI agent can use a real browser session, but risky actions are bounded by scopes, gates, receipts, and revoke controls.

## Project visual constraints

From current project prefs:

- Aspect ratio: 16:9
- Palette: elegant
- Rendering: digital
- Text: title-only preferred
- Mood: balanced
- Avoid cheesy AI stock art
- BrowserMan feel: sharp operator/devtools, browser chrome, control plane, trust boundary

## Recommended prompt

Elegant digital editorial hero image for a technical blog post titled “Browser agents need permission boundaries”. A stylized Chrome-like browser window floats in a dark refined devtools environment. Inside the window, four subtle permission layers are visible as translucent boundaries labeled Read, Act, Submit, Recover. A small AI-agent cursor approaches a dangerous submit button, stopped by a glowing approval gate. To the side, a compact audit receipt panel shows checkmarks and a revoke switch. Visual metaphor: controlled delegated browser authority, real logged-in browser session, scoped access, approval gate, traceable actions. Sharp operator/devtools aesthetic, premium SaaS brand feel, high contrast, elegant blue/indigo/cyan accents, clean composition, no cartoon robots, no human faces, no clutter. 16:9, title-only text, crisp modern digital illustration.

## Alternate no-text prompt

Elegant digital editorial hero image for a technical blog post about browser-agent permission boundaries. A stylized Chrome-like browser window floats in a dark refined devtools environment. Four translucent concentric boundaries around the browser represent read, act, submit, and recover permissions. A small AI-agent cursor is paused at an approval gate before a state-changing button. A minimal audit receipt card and revoke toggle sit nearby. Visual metaphor: controlled delegated browser authority, scoped real-browser access, approval before state change, traceable receipts. Premium SaaS/devtools look, blue/indigo/cyan accents, high contrast, clean composition, no robots, no faces, no stock-art clichés, 16:9.

## Negative prompt / avoid list

Avoid:

- humanoid robots or robot hands;
- surveillance-camera imagery;
- padlock cliché as the main visual;
- scary hacker/security breach mood;
- crowded dashboards with unreadable tiny text;
- generic “AI brain” imagery;
- product UI screenshots unless intentionally mocked;
- real logos for Chrome/X/Salesforce/etc.;
- too much text in the image.

## Suggested filename

`browser-agents-permission-boundaries.png`

Final expected blog path:

`browserman-blog/src/assets/og/browser-agents-permission-boundaries.png`

Expected article frontmatter after publishing move:

```yaml
heroImage: ../../assets/og/browser-agents-permission-boundaries.png
```

## Generation checklist

1. Generate 16:9 image using Tuzi provider / `gpt-image-2` unless overridden.
2. Save to `browserman-blog/src/assets/og/browser-agents-permission-boundaries.png`.
3. Move finalized article into `src/content/blog/en/` or current blog content path.
4. Add `heroImage` frontmatter.
5. Run `npm run build`.
6. Commit image + article together.

## Publishing dependency

Do not generate/publish solely from this brief until the article has 2–3 fresh live signals or JQ explicitly asks to publish without them.
