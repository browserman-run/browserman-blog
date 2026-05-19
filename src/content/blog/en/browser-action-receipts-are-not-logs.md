---
title: "Browser-action receipts are not logs"
description: "Browser-agent logs help developers debug. Browser-action receipts prove what authority was delegated, what changed, and how a team can review or undo the handoff."
lang: en
translationKey: browser-action-receipts-are-not-logs
pubDate: 2026-05-19
heroImage: ../../../assets/og/browser-action-receipts-are-not-logs.png
---

The browser-agent demo is easy to understand.

The agent opens a page. It clicks. It fills a form. It submits.

That makes browser agents feel like a UI problem. Can the model see the page? Can it find the right button? Can it recover when the layout changes?

Those questions matter. But they are not the production boundary.

The production boundary is this:

> When an agent uses a real browser session, what authority did we delegate, what changed, and what proof remains after the handoff?

A generic log is not enough for that.

A log says the agent ran.

A browser-action receipt should prove what the agent was allowed to do.

## Logs are useful. They are not receipts.

Most agent observability starts with run logs:

- the prompt;
- the model response;
- the tools called;
- the timestamps;
- maybe a trace or screenshot.

That is useful for debugging.

But a browser agent working inside a logged-in session is not only producing output. It may be using account authority.

It might publish a CMS article. Update a CRM record. Refund a customer. Change a billing plan. Submit a claim. Send a reply from a real support inbox.

For those actions, “the agent clicked the button” is not the question.

The questions are:

- Who delegated the browser session?
- What scope was granted?
- What visible state did the agent see before acting?
- What exact object did it change?
- What evidence proves the after-state?
- Was there an approval gate before the action?
- Is there a rollback or revoke path?
- Why was the action allowed?

That is the difference between a log and a receipt.

## The receipt should match the risk of the action

Not every browser action needs the same receipt.

A read-only research task does not need the same proof as a billing refund. A draft does not need the same proof as a published article. A CRM note does not need the same proof as a payment or claim submission.

A practical receipt model can be tiered by action risk.

### 1. Read-only browser work

For read-only work, the receipt should answer:

- what page or account context was read;
- when it was read;
- what visible state or source was used;
- what summary or artifact was produced.

The important boundary is source integrity. The agent should not pretend a private or logged-in page is a generic web result.

### 2. Drafting work

For draft work, the receipt should include:

- the generated draft;
- the target surface;
- the account or workspace context;
- who owns approval before publishing or sending.

A draft is not a final action. The receipt should make that obvious.

### 3. Browser write actions

For write actions, the receipt needs to be stronger:

- before-state snapshot;
- exact target and action;
- changed object;
- approval or authority gate;
- after-state verification;
- rollback or revoke path.

This is where many demos become ambiguous. The agent did something, but no one can later tell exactly what was allowed, what changed, or how to undo it.

### 4. External-consequence actions

Some browser actions cross into real-world consequences:

- issuing a refund;
- changing a subscription;
- publishing to a public channel;
- submitting a form to a third party;
- sending a message from a company account;
- changing a claim, invoice, or customer record.

For these, a receipt should be more than observability. It should be an accountability artifact.

## Concrete workflows make receipts obvious

“Agent audit trail” sounds abstract until you put it inside an actual workflow.

### Refund and support workflows

A support agent handling a refund needs more than a chat transcript.

A useful receipt might include:

- the support ticket;
- the customer account viewed;
- the order or billing state before action;
- the policy used;
- the refund amount;
- the approval gate;
- the Stripe/admin state after action;
- the rollback or escalation path.

If the refund is disputed later, the receipt should show why the action was allowed.

### CMS and publishing workflows

A publishing agent needs to prove more than “content was generated.”

A useful receipt might include:

- the draft body;
- the target account/site;
- the preview URL;
- the final published URL;
- the canonical URL and tags;
- the approval owner;
- the unpublish or rollback path.

For public publishing, the browser session is not just a renderer. It is authority to speak.

### CRM workflows

A CRM agent touching records should leave evidence of:

- the record before the update;
- the source evidence used;
- the field changed;
- the follow-up created;
- the owner notified;
- the after-state.

Without that, CRM automation becomes silent drift.

### Regulated or operational workflows

In healthcare revenue-cycle management, insurance claims, finance ops, procurement, or compliance-heavy support, the audit trail can become the product.

If a claim is denied, a refund is challenged, or a regulator asks what happened, the company needs an explanation.

A browser agent receipt should make that explanation recoverable.

## What should a browser-action receipt contain?

A useful browser-action receipt should be boring and specific.

At minimum:

1. **Session/account context**  
   Which browser profile, account, workspace, or app context was used?

2. **Delegated scope**  
   What was the agent allowed to read, draft, click, submit, or change?

3. **Before-state evidence**  
   What visible state existed before the action?

4. **Exact target/action**  
   Which button, field, record, form, or publishing surface was targeted?

5. **Changed object**  
   What record, article, ticket, order, message, or setting changed?

6. **Approval gate**  
   Was a human approval required? Who approved what?

7. **After-state verification**  
   What proves the action completed as intended?

8. **Rollback or revoke path**  
   How can the action be undone, revoked, unpublished, escalated, or reviewed?

9. **Durable receipt link or export**  
   Where can the team inspect the evidence later?

The point is not to make every browser action bureaucratic.

The point is to make consequential actions legible.

## Browser control is not the same as delegated browser authority

Browser-agent tooling often starts with control:

- open a page;
- click a button;
- fill a form;
- scrape a table;
- submit something.

Control is necessary. But production workflows need delegated authority.

That means the user or team should be able to decide:

- which browser session is available;
- what scope the agent receives;
- when approval is required;
- what evidence is captured;
- when access is revoked.

This is the line BrowserMan is built around.

BrowserMan connects AI agents to a user’s real Chrome session while cookies and credentials stay in the browser. The agent can run elsewhere — Claude Code, Cursor, OpenClaw, n8n, a shell script, or another MCP/HTTP client — but the browser authority remains anchored in the user’s local Chrome.

That distinction matters.

If the browser session is authority, the product is not “let the agent click.”

The product is: delegate authority carefully, gate consequential actions, and leave receipts after the handoff.

## The quiet test

The quiet test for a browser agent is not whether it can complete the happy-path demo.

It is whether someone can come back tomorrow and answer:

- What did the agent see?
- What was it allowed to do?
- What did it change?
- Who approved it?
- What proof remains?
- How do we undo or revoke it?

If the answer is “check the logs,” the system is not finished.

Logs help developers debug agents.

Receipts help teams trust delegated browser work.
