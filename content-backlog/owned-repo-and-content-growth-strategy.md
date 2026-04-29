# BrowserMan owned repo and content growth strategy

Status: strategy note / content backlog
Created: 2026-04-29

## Decision

Do not prioritize PRs to existing third-party repos as a primary BrowserMan growth motion.

JQ's direction: external PRs feel low-value unless there is a very specific high-leverage reason. Prefer building and maintaining BrowserMan-owned repos and content assets.

## Why

Third-party repo PRs can be useful, but the value is indirect:

- slow maintainer review cycles,
- uncertain merge probability,
- risk of looking promotional,
- limited control over positioning,
- hard to compound unless the repo is strategically central.

BrowserMan needs owned surfaces that compound directly:

- repos we control,
- examples we maintain,
- docs we can update quickly,
- SEO pages and blog posts,
- DEV.to canonical reposts,
- X distribution hooks,
- reusable demos and workflow templates.

## Priority owned assets

### 1. Workflow/example repo

A BrowserMan-owned examples repo should cover high-intent workflows:

- support inbox triage with approval queue,
- lead research with real logged-in browser sessions,
- CMS draft/publish workflow with gates,
- CRM/contact update workflow with receipts,
- client portal extraction / form fill,
- refund/order lookup workflow,
- daily brand/social radar.

Each example should include:

- problem statement,
- why real browser/session access is needed,
- setup path,
- expected output,
- safety boundary: scope, approval, receipt, revoke,
- links back to BrowserMan docs/blog.

### 2. Content series

Turn the current positioning into a durable series:

1. Browser agents should be auditable, not undetectable.
2. Policy is preflight; receipts are postflight.
3. Real browser sessions are delegated authority.
4. The boring workflows that get paid for: inbox, CRM, CMS, client portals.
5. Why prompts cannot replace an execution layer.

### 3. Awesome / curated repo

Instead of PRs to other repos, maintain a BrowserMan-owned curated repo around real-browser agents.

Possible title:

- `awesome-real-browser-agents`
- `browser-agent-workflows`
- `real-browser-agent-examples`

It should not be a shallow link farm. It should categorize:

- browser automation frameworks,
- MCP/browser tools,
- computer-use agents,
- observability/audit tools,
- workflow examples,
- security patterns: scope, gates, receipts, revoke.

BrowserMan can sit as the opinionated execution/delegation layer without being too salesy.

### 4. SEO/topic pages

Owned pages to consider:

- AI agent browser automation
- MCP browser automation
- real Chrome session for AI agents
- browser session delegation
- browser agent audit trail
- browser agent approval workflow
- logged-in browser automation for agents

## When external PRs still make sense

Only do third-party PRs when one of these is true:

- we found and fixed a real bug while using the repo,
- the maintainer explicitly wants integrations/examples,
- the repo is strategically central to BrowserMan users,
- the PR is a tiny, non-promotional example that solves an obvious user problem,
- the PR links to a BrowserMan-owned repo/docs as a natural reference, not as ad copy.

Default: no external PR growth campaign.

## Next action candidates

- Audit existing BrowserMan-owned repos and identify the best home for examples.
- Build one polished workflow example around the strongest current content theme: approval queue + receipt for a logged-in browser workflow.
- Create README structure for an owned examples/curated repo.
- Turn the `policy is preflight; receipt is postflight` hook into a short standalone X post later, after the auditable article has breathing room.
