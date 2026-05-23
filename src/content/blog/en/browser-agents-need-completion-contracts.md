---
title: "Browser agents need completion contracts, not just approval prompts"
description: "Approval gates stop risky browser actions. Completion contracts prove whether an agent used the right session, stayed inside scope, handled drift, and left evidence that the work actually finished."
lang: en
translationKey: browser-agents-need-completion-contracts
pubDate: 2026-05-23
heroImage: ../../../assets/og/browser-agents-need-completion-contracts.png
---

An approval prompt is a good start.

It is not enough.

A browser agent can ask before it refunds a customer, publishes a page, sends a message, or changes a setting. That gate matters. It separates drafting from doing. It prevents some expensive mistakes before they happen.

But the approval prompt only answers one question:

> Is this agent allowed to take this side effect right now?

It does not prove the agent used the right account. It does not prove the workflow finished. It does not prove the page state matched the plan. It does not prove the agent recovered when the site drifted. It does not prove what changed afterward.

For real browser work, the next primitive is a completion contract.

## The browser is becoming an authority surface

Browser agents are moving from demo loops into signed-in work.

They open tabs. Read dashboards. Fill forms. Draft support replies. Update CRMs. Publish CMS pages. Work through admin portals. Use the same messy web interfaces humans use every day.

That is exactly why they are useful.

It is also why the browser is not just a viewport anymore.

A signed-in Chrome session contains authority: cookies, account state, customer records, internal tools, billing screens, admin settings, support inboxes, analytics, partner portals, and production workflows.

Once an agent can use that session, the product question changes from:

> Can the agent click the right thing?

To:

> What authority did we delegate, what was it allowed to do, and what evidence proves the outcome?

Approval gates help with the middle part. They do not cover the whole contract.

## Approval gates are necessary but narrow

Approval gates are strongest at one boundary: high-risk side effects.

A practical browser-agent policy should not treat every browser action the same. Reading a page is not the same as sending a support reply. Drafting a CMS post is not the same as publishing it. Looking up an order is not the same as issuing a refund.

The useful model is side-effect based:

| Action class | Examples | Default posture |
| --- | --- | --- |
| Read-only | inspect dashboard, summarize ticket, compare records | broad autonomy with source-aware receipts |
| Draft/prep | fill form, write reply, stage CMS edit | allow, but do not submit |
| Low-risk write | save internal note, update non-sensitive metadata | allow with receipt or light gate |
| High-risk side effect | send, refund, delete, publish, spend, change settings, touch credentials | require approval before execution |
| Unknown surface | new account, new tenant, unexpected modal, permission drift | stop and escalate |

The point is not to put a human in front of every click.

The point is to gate the blast radius.

But even with the right gates, a workflow can still fail in quieter ways.

## The boring failure is confident incompletion

The most cinematic agent failure is the rogue click.

The more common failure is probably worse for operations: confident incompletion.

The agent starts the workflow. It gets halfway through. A modal appears. A page changes. A validation error hides below the fold. The wrong workspace is selected. A background save fails. The agent loses context, summarizes what it intended to do, and marks the task complete.

No alarm.

From the outside, the agent said “done.”

But the customer was not refunded. The CRM field did not update. The support reply stayed in draft. The CMS post never published. The wrong record changed. The agent stopped early and produced confidence instead of evidence.

An approval prompt does not solve that.

A completion contract does.

## What a completion contract defines

A completion contract is the workflow-level agreement an agent must satisfy before it can say “done.”

It should define at least six things.

### 1. Accepted inputs and target authority

The contract should name the expected account, workspace, customer, record, browser profile, or tenant.

For browser agents, this matters because the browser session carries authority. Acting in the wrong workspace is not a UI bug. It is wrong authority.

A browser agent should be able to prove:

- which account/session it used;
- which record or page it targeted;
- which identity was visible before execution;
- whether the target matched the requested task.

### 2. Forbidden shortcuts

Agents optimize for completion. That is useful until it becomes dangerous.

A completion contract should say what the agent must not do, even if the shortcut appears to finish the task.

Examples:

- do not issue refunds above a threshold without approval;
- do not send customer-facing messages without a visible final review;
- do not change account settings while trying to resolve a support ticket;
- do not use a different browser profile if the expected one is not available;
- do not scrape around an auth wall or CAPTCHA-like checkpoint;
- do not claim a record was updated unless the after-state is visible.

Forbidden shortcuts are how the workflow preserves intent when the page gets messy.

### 3. Checks to run

A browser workflow should include explicit checks, not just final narration.

For example:

- confirm the customer name and account ID before refunding;
- confirm the CMS slug and publish state before reporting success;
- confirm the support ticket status changed after sending;
- confirm the CRM field value after saving;
- confirm the current URL/workspace/profile before touching admin settings;
- confirm there is no unsaved-change warning after leaving a page.

These checks are not bureaucracy. They are the difference between “I clicked save” and “the state changed.”

For browser work, the most useful checks are usually concrete: target text, visible role or account, expected URL, and a post-action assertion that the page now shows the intended state.

### 4. Evidence to produce

The agent saying “done” is not a completion signal.

The receipt is.

Evidence can be lightweight. It should match the risk of the action.

For read-only work, a source URL and visible-state summary may be enough.

For draft work, the receipt should include where the draft was staged and what remains unsubmitted.

For high-risk work, the receipt should include stronger proof:

- final URL or record ID;
- before/after visible state;
- screenshot or DOM/text verification;
- approval event, if any;
- exact object changed;
- blocked or fallback status if the agent stopped;
- rollback or revoke path when relevant.

This turns receipts from debugging artifacts into the boundary of trust.

### 5. Blocked vs done

A good browser agent needs a clean way to stop.

“Blocked” should be a first-class outcome, not a failure hidden under a confident summary.

The contract should tell the agent when to stop and ask for help:

- unexpected login or permission prompt;
- unknown workspace or account mismatch;
- unapproved high-risk side effect;
- page state differs from the expected workflow;
- form validation fails;
- the agent cannot verify the after-state;
- the site asks for a credential, payment method, or sensitive secret.

A blocked task with evidence is better than a fake completion.

### 6. Drift handling

Web apps drift constantly.

Buttons move. Modals appear. Auth expires. Tables paginate differently. Feature flags change the UI. A support tool shows a different layout for a different customer. A CRM introduces a new required field.

A completion contract should define what happens when the page no longer matches the plan.

The agent should not improvise through every surprise. Some drift is safe to recover from. Some drift should trigger a stop.

For browser agents, recovery policy is part of the product.

## Four failure modes the contract should catch

A useful completion contract catches more than rogue behavior.

### Rogue action

The agent takes a side effect it should not take: sends, deletes, spends, refunds, publishes, submits, changes settings, or touches credentials.

Control: approval gates for high-risk side effects.

### Confident incompletion

The agent stops halfway and reports success.

Control: required checks and evidence-attached reporting.

### Wrong authority

The agent acts through the wrong account, workspace, browser profile, tenant, customer, or admin surface.

Control: scoped session delegation and pre-run target checks.

### Unverifiable outcome

The action may have worked, but nobody can prove what changed.

Control: browser-action receipts tied to final state, not just agent logs.


## A practical completion checklist

Before a browser agent reports success, the workflow should be able to answer a short checklist:

| Question | Why it matters |
| --- | --- |
| Did it use the expected account, workspace, browser profile, tenant, or customer record? | Prevents wrong-authority failures. |
| Did the agent identify the side-effect class before acting? | Separates read/draft work from send, spend, delete, publish, refund, or settings changes. |
| Were forbidden shortcuts avoided? | Keeps the agent from “finishing” by changing the task boundary. |
| Was approval captured for high-risk side effects? | Makes consequential actions intentional. |
| Did the page show the expected post-action state? | Catches confident incompletion. |
| Is there a receipt artifact? | Gives humans something to trust, debug, or reverse. |
| If blocked, did the agent stop with evidence instead of improvising? | Turns drift into a safe handoff instead of a hidden failure. |

The exact artifact can vary. It might be a screenshot, a trace, a final URL, a DOM/text assertion, a created record ID, or a short blocked-state report. The important part is that completion is verified against the browser state, not just narrated by the agent.

## Where BrowserMan fits

BrowserMan’s view is simple:

If an agent needs a real logged-in browser, the browser session has become delegated authority. Treat it that way.

That is different from giving an agent a generic cloud browser. It is also different from running a local browser-control demo with no delegation boundary.

BrowserMan connects agents to a user’s real Chrome session so the agent can work in the same web environment the user already uses. The important product shape is not just the browser connection. It is the delegation layer around it:

- give access, not credentials;
- keep cookies and credentials local in the browser;
- scope the browser authority before execution;
- gate risky writes, submits, publishes, refunds, deletes, and spends;
- leave receipts after the run;
- revoke access when the work is done.

A completion contract gives that delegation a practical workflow shape.

It tells the agent what authority it has, where the line is, what evidence it owes, and when it must stop.

## The agent should not get to declare victory alone

Browser agents are going to become more capable. They will click better. They will recover better. They will use more tools. They will operate more of the messy web.

That makes completion contracts more important, not less.

The future production question is not whether an agent can navigate a page.

It is whether a team can trust the handoff:

- right session;
- right scope;
- right side-effect gate;
- right after-state;
- right evidence;
- clean stop when the workflow drifts.

Approval prompts are the beginning.

Completion contracts are how browser-agent work becomes operationally trustworthy.
