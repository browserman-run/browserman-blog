# BrowserMan owned workflow examples repo outline

Status: content/repo planning note
Created: 2026-04-29

## Purpose

Create a BrowserMan-owned repo that captures practical workflows requiring a real delegated browser session.

This is the preferred growth motion over low-value PRs to third-party repos: own the examples, own the positioning, own the SEO surface, and make the repo useful enough that developers can clone it directly.

## Working repo names

- `browserman-workflow-examples`
- `real-browser-agent-examples`
- `browser-agent-workflows`

Recommendation: `browserman-workflow-examples` is clearest for product ownership. `real-browser-agent-examples` may be better for search/discovery.

## README promise

> Practical AI-agent workflows that need a real browser session: logged-in apps, delegated access, approval gates, audit receipts, and one-click revoke.

Avoid framing this as generic browser automation. The repo should be about workflows where a stateless/headless browser is not enough.

## Repo structure

```text
README.md
examples/
  support-inbox-approval-queue/
    README.md
    workflow.md
    prompt.md
    receipt.schema.json
    sample-receipt.json
  lead-research-real-browser/
    README.md
    workflow.md
    prompt.md
    sample-output.md
  cms-draft-publish-gate/
    README.md
    workflow.md
    prompt.md
    receipt.schema.json
  crm-contact-update-receipt/
    README.md
    workflow.md
    prompt.md
    sample-receipt.json
  client-portal-data-entry/
    README.md
    workflow.md
    prompt.md
  brand-radar-agent/
    README.md
    workflow.md
    prompt.md
docs/
  delegated-browser-access.md
  scopes-gates-receipts.md
  troubleshooting-login-state.md
  security-model.md
assets/
  diagrams/
```

## Example template

Each example should answer:

1. What business/user workflow is being automated?
2. Why does it require a real browser session?
3. What access is delegated?
4. What actions are read-only vs write/destructive?
5. Where should approval gates exist?
6. What receipt should the agent produce?
7. How does the user revoke/stop access?
8. How to run it with BrowserMan.

## First three examples to build

### 1. Support inbox approval queue

Problem: support inboxes need triage and drafts, but direct send/refund actions require human approval.

BrowserMan angle:

- real login state for support inbox / helpdesk,
- read-only collection by default,
- draft response queue,
- approval gate before send/refund/escalation,
- receipt showing message IDs, customer/order pages inspected, draft content, and skipped risky actions.

SEO/content link:

- `What happens when your company inbox gets an AI operator?`
- future X hook: “The useful support agent is not the one that sends everything. It is the one that queues the right decisions with evidence.”

### 2. Lead research with logged-in tools

Problem: sales research often needs logged-in surfaces: LinkedIn, CRM, company databases, internal notes.

BrowserMan angle:

- delegated browser session instead of credential sharing,
- scoped browsing across approved tabs/sites,
- structured output with sources,
- no outreach/send action without approval.

Receipt:

- lead name/company,
- sources visited,
- facts extracted,
- uncertainty notes,
- suggested next action.

### 3. CMS draft/publish gate

Problem: agents can draft content, but publishing is externally visible and risky.

BrowserMan angle:

- real CMS session,
- draft creation allowed,
- publish/delete/settings changes require approval,
- receipt includes title, slug, preview URL, changed fields, screenshots/logs.

## README sections

1. What this repo is
2. Why real browser sessions matter
3. Quick start with BrowserMan
4. Workflow examples
5. Safety model: scope, gates, receipts, revoke
6. How to adapt an example
7. Related BrowserMan essays
8. Contributing / requests

## Related BrowserMan content to link

- Browser agents should be auditable, not undetectable
- The browser-agent control plane: scope, audit, handoff, rollback
- The accountability layer for browser agents is the execution boundary
- Build a Daily Brand Radar Agent with OpenClaw and BrowserMan
- What happens when your company inbox gets an AI operator?

## Next action

Create the repo or update the existing BrowserMan-owned examples/awesome repo with:

1. a strong README,
2. the safety model page,
3. one polished `support-inbox-approval-queue` example,
4. links back to the new auditable-browser-agents article.

Keep the first version small. One excellent workflow is more valuable than ten thin examples.
