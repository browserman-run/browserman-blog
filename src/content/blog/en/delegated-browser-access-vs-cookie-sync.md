---
title: "Delegated browser access vs cookie sync: the browser session is authority"
description: "Cloud cookie sync, isolated profiles, local Chrome attach, and delegated browser access are different authority models for AI agents. Here is how to tell them apart."
lang: en
translationKey: delegated-browser-access-vs-cookie-sync
pubDate: 2026-05-03
heroImage: ../../../assets/og/delegated-browser-access-vs-cookie-sync.png
---

For browser agents, the hard part is no longer just giving the model a logged-in browser.

That part is getting solved from several directions. Cloud browser platforms can run managed browsers. Local browser tools can attach to a user’s existing Chrome profile. Agentic browsers can isolate the agent in a clean profile. Cookie-sync experiments can move authenticated state into a remote runtime.

All of that is useful.

But the production question is not only:

> Can the agent use a logged-in session?

The better question is:

> Where does browser-session authority live, how is it delegated, and what identity, policy, isolation, and audit trail follow the agent?

A logged-in browser is not just state. It is authority.

It can contain your inbox, CRM, support queue, billing portal, admin dashboard, SaaS console, ad account, CMS, private docs, customer records, social accounts, and internal tools. That is why agents want browser access. It is also why the permission model matters.

Once an agent can use a real browser session, “browser access” stops being a convenience feature. It becomes a delegation model.

There are at least four different models emerging.

## 1. Cloud browser plus cookie sync

The first model is the most infrastructure-friendly:

> Run the browser in the cloud, then move or copy enough session material into that browser so the agent can act as an authenticated user.

This is appealing for obvious reasons. Cloud browsers are easy to schedule, scale, observe, reset, and integrate into server-side agent systems. They do not depend on the user’s laptop being online. They can be provisioned like infrastructure.

Cookie sync adds the missing piece: authenticated state.

Instead of asking the user to log into a fresh remote browser, the system can copy cookies or session state from the user’s local browser into a remote browser. The agent gets the convenience of a managed runtime with the usefulness of a logged-in session.

That is powerful.

It also changes the trust boundary.

If the cookie jar is exported, copied, or synced into a remote runtime, the security and revocation story becomes about how that session material is moved, stored, scoped, expired, and destroyed.

This model solves remote execution by exporting the jar.

That may be a good tradeoff for some workflows. If the goal is high-scale cloud automation, a managed remote browser may be exactly right. But it is not the same as keeping the user’s credentials and cookies inside the browser they already use.

The key question is not whether the agent can act. It can.

The key question is what had to move to make that possible.

## 2. Isolated agent browser or profile

The second model goes in the opposite direction:

> Put the agent in a separate browser profile so it cannot touch the user’s main cookies, logins, or browsing data.

This is a strong security default.

Agentic browsing has a prompt-injection problem. A page can contain instructions. The agent can misread them as task instructions. If that agent has access to the user’s real logged-in profile, the blast radius can be large.

A clean or isolated profile limits that blast radius. The agent gets a browser, but not the user’s main browser. It can browse, search, test flows, fill public forms, read pages, or perform low-auth tasks without inheriting the user’s entire web authority.

That is useful and often correct.

But isolation has a tradeoff: it removes the very state that makes many work tasks valuable.

A separate browser profile is safer because it is not logged into everything. But if the workflow requires the user’s actual SaaS dashboard, support inbox, ad account, internal tool, or customer portal, then the isolated profile still needs one of the other routes: a fresh login, an API, OAuth, cookie sync, or a controlled way to borrow the real session.

So isolated profiles protect cookies. They do not automatically provide delegated access to the user’s real work surface.

This distinction matters because “safe browser agent” and “use my actual logged-in workflow” are often in tension. A clean profile is good when isolation is the goal. It is less useful when continuity with the user’s real browser state is the goal.

## 3. Local attach to existing Chrome

The third model says:

> Do not create a separate browser. Attach to the browser the user already has.

This solves the login problem cleanly.

The user is already logged into X, Gmail, Vercel, GitHub, Salesforce, Stripe, Notion, Linear, Intercom, Shopify, or whatever else they use. The agent does not need a separate login flow. It can operate in the same browser state the user already trusts.

For local developer workflows, this is extremely attractive.

It can also preserve a lot of context that cloud or isolated browsers do not have: existing tabs, extensions, cookies, permissions, session history, and the messy state of real work.

But existing Chrome attach is not the same thing as delegation.

It solves access. It may not solve boundaries.

If the agent runs on the same machine and gets broad control over the user’s active browser profile, the trust model is often coarse. The user has granted local control, and now the question becomes: which tabs, sites, actions, files, tools, and workflows are actually in scope?

Local execution is also not magic security. A browser agent may run locally, but the sites it acts on do not. Every logged-in action still sends requests to external services with the user’s session authority.

Existing Chrome attach solves login.

It does not automatically solve delegation.

## 4. Delegated real-browser access

The fourth model is the one BrowserMan is built around:

> Let the agent run anywhere, but delegate access to the user’s real Chrome session while cookies and credentials stay in the browser.

The agent does not need the user’s password. It does not need the cookie jar exported into a cloud browser. It does not have to run on the same machine as the browser.

Instead, the user’s browser stays local. The agent receives controlled browser access through a relay and extension. Commands move through the system; the browser session remains the authority source.

This model is trying to solve a different problem from pure cloud browser infrastructure, isolated profiles, or local attach.

The problem is not:

> How do I give an agent any browser?

The problem is:

> How do I let an agent use my real browser authority without handing over credentials or exporting the session?

That requires explicit delegation.

The useful primitives are scope, gates, audit, approval, and revoke:

- which browser is available;
- which sites or tabs are in scope;
- which task the agent is supposed to perform;
- which actions are safe to take automatically;
- which actions need human approval;
- what gets recorded as a receipt;
- how access can be revoked quickly.

This is why “browser session” is the wrong abstraction by itself.

The better abstraction is controlled browser authority.

## The comparison is really about authority models

These four patterns are not just implementation choices. They are authority models.

| Question | Cloud browser + cookie sync | Isolated browser/profile | Local attach / existing Chrome | Delegated real-browser access |
| --- | --- | --- | --- | --- |
| Uses real logged-in state? | Yes, via copied/imported cookies | No, unless separately logged in | Yes, current browser/profile | Yes, current browser/session |
| Agent can run elsewhere? | Yes | Usually local or managed runtime | Usually local / setup-dependent | Yes |
| Cookies stay in the user’s browser? | No, not if synced/exported | Main cookies stay protected because they are absent | Yes | Yes |
| Main safety primitive | Managed remote runtime | Isolation | Local trust / process boundary | Explicit delegation |
| Delegation is explicit? | Depends on product | Limited by isolated profile | Often coarse | Core product primitive |
| Revocation model | Revoke cloud session/token | Delete or stop isolated profile | Stop local process/access | Revoke delegated access |
| Best for | Scalable remote browser automation | Safe low-auth browsing and blast-radius reduction | Local developer workflows and private tasks | Controlled use of a user’s real browser authority |

None of these models is universally best.

Cloud browsers are excellent when the agent needs managed infrastructure and scale.

Isolated profiles are excellent when the priority is protecting the user’s main browser from prompt injection and broad access.

Local attach is excellent when the developer wants the agent to use their current machine and browser state directly.

Delegated real-browser access is useful when an agent running elsewhere needs controlled access to the user’s actual logged-in browser, without exporting cookies or sharing credentials.

The right choice depends on what kind of authority the workflow needs.

## The missing enterprise axis: identity and isolation

There is another layer beyond the browser session itself.

As soon as multiple agents enter the picture, the question becomes:

> Which agent acted, under whose authority, with what policy, and inside what isolation boundary?

This is where agent identity, policy, and audit logs become more important than model capability.

A company may not want one generic “AI agent” with broad browser access. It may want six agents, each with its own browser window, file scope, tool access, task boundary, and audit trail.

The sales agent should not inherit the finance agent’s authority. The support agent should not be able to publish marketing pages. The research agent should not be able to issue refunds. A vendor’s agent should not get permanent access to the founder’s browser profile.

This is not science fiction governance. It is basic operational hygiene.

The agent needs a policy. The policy needs a scope. The scope needs an audit trail. The audit trail needs to trace back to a human or organization that intentionally delegated the authority.

Without that, agents carry credentials but not identity.

And credentials without identity are hard to govern.

## Questions to ask before choosing a browser access model

Before giving an agent browser access, ask:

- Does the agent need a real existing login, or can it use a clean browser?
- Is the goal isolation from the user’s main profile, or controlled access to that real profile?
- Does the agent need to run in the cloud or from another machine?
- Are cookies exported, copied, synced, or kept inside the user’s browser?
- Which identity or policy is the agent acting under?
- Are multiple agents isolated by browser profile, browser window, file scope, and tool access?
- Can access be scoped by site, tab, task, or action class?
- Are high-risk actions gated before execution?
- Is there a receipt of what changed?
- Can the user revoke the delegation quickly?

The browser itself is only one part of the answer.

The authority model is the product.

## Where BrowserMan fits

BrowserMan should not pretend every workflow needs delegated local Chrome.

Some agents should use cloud browsers. Some should use isolated profiles. Some should attach locally during development. Some should use APIs or MCP servers instead of a browser at all.

BrowserMan’s lane is narrower and more specific:

> an agent running anywhere, using the user’s real browser authority, without exporting cookies or sharing credentials.

The user’s signed-in Chrome stays local. Cookies and credentials stay in the browser. Access can be scoped, audited, approved, and revoked.

That is the distinction.

Browser agents do not just need sessions.

They need a permission model for sessions.

And once the browser session becomes authority, the product category is how safely that authority is delegated.