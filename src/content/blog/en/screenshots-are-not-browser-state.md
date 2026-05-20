---
title: Screenshots Are Not Browser State
description: Why coding agents need real Chrome loops — and why logged-in browser work needs delegated authority, approval lines, and receipts.
pubDate: 2026-05-19
heroImage: ../../../assets/og/screenshots-are-not-browser-state.png
author: Eli
tags:
  - AI Agents
  - Browser Automation
  - Chrome DevTools
  - MCP
---

# Screenshots Are Not Browser State

A coding agent that only sees screenshots is debugging theater.

Screenshots show what broke. They do not show why it broke.

The useful loop is real browser state: console errors, network requests, performance traces, DOM state, storage, cookies, session context, and the exact page the user is stuck on.

That distinction moved from niche to obvious today. Chrome for Developers announced that Chrome DevTools for agents is stable: coding agents can use Chrome DevTools MCP to test web apps in Chrome and inspect console logs, network requests, performance traces, and Lighthouse reports.

That is the right direction. Agents do not need prettier screenshots. They need runtime evidence.

## Screenshots show symptoms

A screenshot can tell an agent that a checkout button is disabled.

It cannot reliably tell the agent:

- which request failed;
- whether the API returned 401, 403, 429, or 500;
- whether a CSP rule blocked a script;
- whether hydration failed;
- whether a feature flag changed the DOM;
- whether local storage is stale;
- whether the user is in the wrong workspace;
- whether the bug only happens behind a logged-in account.

HTML snapshots have a similar problem. They are useful, but they are still partial. They miss runtime behavior, timing, auth state, network edges, and the browser’s actual execution context.

A developer would open DevTools. A useful coding agent should be able to do the same.

## The real browser loop

A real browser loop gives an agent evidence it can act on:

- **Console:** stack traces, warnings, failed hydration, client-side errors.
- **Network:** request payloads, response codes, headers, redirects, CORS failures.
- **Performance:** long tasks, layout shifts, slow resources, Lighthouse reports.
- **DOM and accessibility state:** what the page actually rendered, not what the template promised.
- **Cookies and storage:** auth state, workspace IDs, stale tokens, feature flags.
- **Session context:** the logged-in page where the user actually hit the problem.

This is why Chrome DevTools MCP matters. It turns the browser from a picture into an evidence source.

The same pattern is showing up elsewhere too. Developers are building tools that let coding agents drive real Chrome, inspect multi-tab sessions, and return structured results that agents can parse. Browser panes inside agent workspaces are becoming more than previews; they are becoming review surfaces, collaboration surfaces, and handoff surfaces.

The direction is clear: browser work is becoming part of the agent runtime.

## Machine-readable browser evidence

The next step is not just “let the agent see Chrome.” It is letting the agent receive browser evidence in a form it can use.

A screenshot forces the model to infer. A structured browser result lets the agent reason.

For example, a browser run can return:

- the action attempted;
- the URL and frame where it ran;
- console errors observed;
- network failures observed;
- performance warnings;
- resulting DOM or accessibility state;
- whether the intended after-state appeared.

That matters because agents are iterative. The output of one browser step becomes the input to the next coding step. If the browser result is only an image, the agent is guessing. If the browser result is structured evidence, the agent can repair, rerun, and verify.

This is the practical meaning of “screenshots are not browser state.”

## Logged-in Chrome changes the problem

For local development, real browser evidence is mostly about debugging.

But real browser work does not stop at local development.

Many useful tasks happen behind login:

- update a billing setting;
- check a support inbox;
- publish a CMS post;
- verify a CRM record;
- upload a file to a client portal;
- refund an order;
- change an ad campaign;
- inspect a production dashboard.

At that point, the browser is no longer just an inspection surface. It is authority.

A signed-in Chrome session contains cookies, SaaS access, internal tools, live customer data, and the ability to change state. If an agent can operate that session, it is not merely “using a browser.” It is acting through delegated authority.

That is a different product boundary.

## Prompts are not permissions

A prompt that says “be careful” is not a permission system.

A delay before deletion is not a permission system.

A log after the fact is not a permission system.

For signed-in browser workflows, the control layer needs to be explicit:

- which browser session is exposed;
- what sites or workspaces are in scope;
- which actions are read-only;
- which writes require approval;
- where the approval line sits;
- what receipt proves what changed;
- how access can be revoked.

The approval line is important. It is the point where browser-agent memory stops being notes and becomes a control surface.

Before the line, the agent can gather evidence: page state, previous failures, current auth boundary, intended action.

At the line, a human or policy gate decides whether the agent may write.

After the line, the system needs a receipt.

## Receipts are not logs

Logs are useful for debugging a run.

Receipts are useful for trusting delegated work.

A browser-action receipt should answer questions a team can check later:

- who or what agent acted;
- which browser session and account context were used;
- what authority was delegated;
- why the action was allowed;
- what data moved;
- what changed on the page;
- what after-state proves the change landed;
- what can be rolled back or revoked.

That is different from “the agent clicked a button.”

It is also different from a screenshot. A screenshot may show the final page. A receipt should preserve the authority, decision, action, and evidence trail around the change.

This is where real browser loops and delegated browser authority meet.

## Where BrowserMan fits

Chrome DevTools MCP is a strong answer for local coding loops. It gives agents runtime browser evidence: console, network, performance, Lighthouse, and the real page.

BrowserMan’s lane is adjacent.

BrowserMan gives agents controlled access to a user’s real Chrome session. The agent can run anywhere, while the signed-in browser stays on the user’s device. Cookies stay local. Access can be scoped, gated, audited, approved, and revoked.

The useful framing is not “more browser control.”

It is controlled delegation of real browser authority.

Local dev loop:

> Can the agent inspect and fix what is happening in Chrome?

Delegated browser workflow:

> Can the agent use the right signed-in session, within the right scope, with approval before risky writes and receipts after changes?

Both matter. They solve different parts of the same shift: agents are moving from text into real browser work.

## The browser is becoming an agent runtime

The browser is not just a viewport anymore.

For coding agents, it is an evidence source.

For workflow agents, it is an action surface.

For signed-in work, it is an authority surface.

That means the next generation of browser-agent tooling should not be judged only by whether the agent can click through a page. It should be judged by whether the system can preserve the state, authority, approval, and proof around the work.

Screenshots are not enough.

Real browser state is the evidence.

Logged-in browser state is the authority.

And delegated authority needs approval lines and receipts.
