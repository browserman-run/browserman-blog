---
title: "Browser access is not one permission"
description: "A logged-in browser session is delegated authority. Browser agents need separate gates for read, draft, update, publish, refund, delete, and spend."
lang: en
translationKey: browser-access-is-not-one-permission
pubDate: 2026-05-01
heroImage: ../../../assets/og/browser-access-is-not-one-permission.png
---

Do not give an agent “browser access.”

Give it read access. Give it draft access. Maybe give it update access with receipts. Put a gate in front of publish, refund, delete, merge, and spend.

The browser is not the hard part anymore. A logged-in browser session is authority, and authority needs shape.

## The bug is the permission shape

Most browser-agent demos compress the whole problem into one checkbox:

> Can the agent use a browser?

That question is too broad.

A browser agent that reads public pages is one thing. A browser agent that operates inside your logged-in Chrome session is another. Once the agent can see private dashboards, submit forms, edit CRM records, issue refunds, publish content, or change ad budgets, “browser access” stops being a tool permission.

It becomes delegated authority.

And delegated authority should not be one permission.

## A signed-in browser is authority

A signed-in browser is where work actually happens.

It has your CRM, support inbox, admin dashboards, analytics, CMS, ad accounts, billing portals, SaaS consoles, customer records, docs, and internal tools.

That is why browser agents are useful. They can operate where APIs are incomplete, absent, fragmented, or too slow to integrate.

But that is also why they are dangerous.

If the agent can use the same browser session you use, it may be able to:

- read private customer data,
- draft replies from your account,
- update CRM fields,
- route tickets,
- submit refunds,
- cancel subscriptions,
- merge customer accounts,
- publish pages,
- launch posts,
- change ad budgets,
- buy things,
- or change admin settings.

Those are not the same action.

They should not share the same permission.

## The action-class ladder

The useful abstraction is not “browser access.”

The useful abstraction is action class.

### 1. Read

The agent can inspect pages, dashboards, tickets, records, reports, and private context.

This is the lowest-risk class, but it is still not risk-free. Read access can expose customer data, internal metrics, private messages, and credentials visible in the UI.

Still, for many workflows, read access can run with relatively broad autonomy.

### 2. Draft

The agent can prepare a reply, CRM note, campaign edit, page change, support response, or internal summary, but it does not submit it.

Drafting is where many agents should start. It saves time without crossing the line into irreversible action.

### 3. Annotate

The agent can add non-destructive metadata: internal notes, tags, labels, comments, todo items, or follow-up tasks.

This is more active than drafting, but usually less risky than changing core records or sending external messages.

### 4. Update

The agent can change fields, statuses, owners, routing, priorities, labels, or internal records.

This is where receipts start to matter. If an agent changes a CRM field or ticket state, you should know what changed, when it changed, and why.

### 5. Submit

The agent can send a form, reply to a customer, create an external-facing record, or trigger a workflow.

Submit actions need more care because they leave the internal system and affect other people.

### 6. Publish

The agent can push content live: website pages, docs, social posts, changelogs, campaigns, or public updates.

Drafting a page and publishing a page are different permissions.

### 7. Refund, cancel, merge, delete

These actions can affect customers, accounts, money, history, or compliance.

They are often hard to reverse, and sometimes impossible to reverse cleanly.

Read access and refund access should never be the same permission.

### 8. Spend

The agent can move money: ad budgets, purchases, paid APIs, wallets, subscriptions, cloud resources, or agent-to-agent payments.

Viewing a budget and spending a budget are different permissions.

Spend actions need explicit ceilings, approvals, and circuit breakers.

## A better default policy

A practical browser-agent policy can start simple:

- **Read and draft** can often run freely.
- **Annotate and update** need receipts and rollback awareness.
- **Submit and publish** need approval gates.
- **Refund, cancel, merge, delete, and spend** need explicit gates, limits, and after-action receipts.

This does not mean every workflow needs a heavy compliance system.

It means the agent should not receive one ambient permission called “use browser.”

A support triage agent might read tickets freely, draft replies freely, add internal notes with receipts, but require approval before refunding a customer.

A marketing agent might draft posts freely, propose edits freely, but require approval before publishing.

A sales agent might summarize a lead freely, draft a follow-up freely, but require confirmation before sending from a real inbox or updating a CRM opportunity stage.

A finance agent might view invoices freely, extract data freely, but require explicit approval before paying, refunding, or changing billing settings.

That is the difference between a useful agent and a risky one.

## Execution trace vs authority receipt

Browser traces are useful.

They tell you what the agent saw, clicked, requested, rendered, and logged. Screenshots, DOM snapshots, network requests, and CDP logs make browser agents easier to debug.

But execution traces are not enough.

If an agent submits a refund, publishes a page, changes an ad budget, or updates a CRM record, the important question is not only:

> What happened in the browser?

It is also:

> Why was the agent allowed to do that?

That is the authority receipt.

A good authority receipt should answer:

- Which browser session was delegated?
- Which site or app was in scope?
- What action class was attempted?
- Was the action reversible?
- Was approval required?
- Who or what approved it?
- What changed before and after?
- Can access be revoked?

The browser trace tells you what happened.

The authority receipt tells you why it was allowed.

## Real workflows make this obvious

### Sales workflow

A sales agent may need to read LinkedIn, Gmail, HubSpot, Salesforce, call notes, and a company website.

Summarizing the lead is low-risk.

Drafting the follow-up is still fairly safe.

Sending the email from a real inbox is a different action.

Updating the CRM stage is another.

Creating a discount, changing contract terms, or booking a customer-facing meeting may require approval.

### Support workflow

A support agent may read a ticket, inspect order history, summarize context, and draft a response.

But issuing a refund, cancelling a subscription, merging accounts, or changing account status should cross a gate.

### Publishing workflow

A content agent may draft a page, update a preview, generate screenshots, and check links.

Publishing the page live is a separate permission.

So is deleting a page, changing canonical URLs, editing pricing pages, or posting from a brand account.

### Ads workflow

An ads agent may inspect campaign performance and recommend budget movement.

Changing the budget is different.

Launching a campaign is different again.

Turning on spend should have ceilings and circuit breakers.

### Coding workflow

An in-browser PR testing agent may click through a product, reproduce bugs, and report findings.

That is different from changing production settings, migrating data, or editing customer-facing configuration.

Same browser, different authority.

## What good infrastructure should expose

Browser-agent infrastructure should expose action boundaries directly.

At minimum:

- per-site scopes,
- per-action scopes,
- read vs write separation,
- approval gates,
- before/after diffs,
- receipts,
- revocation,
- loop detection,
- spend limits,
- and kill switches.

The boring pieces are the product.

Not because autonomy is unimportant, but because autonomy without boundaries becomes operational debt.

A browser agent that can do everything is impressive in a demo. In production, you want the agent to know when it can act, when it should draft, when it should ask, and when it must stop.

## Where BrowserMan fits

BrowserMan is built around delegated real-browser access.

The point is not just to give an AI agent a browser. The point is to let agents use the real Chrome session you already use, while keeping cookies local and making access controllable.

That matters because useful browser work happens inside logged-in tools.

But logged-in tools need boundaries.

BrowserMan’s category is controlled browser authority: agents can operate from anywhere, use real sessions when delegated, and work inside scopes that can be audited, gated, and revoked.

That is the difference between “the agent has a browser” and “the agent has the right browser authority for this task.”

## The practical rule

Do not ask whether an agent should have browser access.

Ask what kind.

Can it read?
Can it draft?
Can it annotate?
Can it update?
Can it submit?
Can it publish?
Can it refund?
Can it delete?
Can it spend?

Those are different questions.

They deserve different answers.

Browser access is not one permission.
