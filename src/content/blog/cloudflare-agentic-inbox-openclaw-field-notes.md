---
title: "Field notes from wiring an agent to a real inbox with Cloudflare Access"
description: A practical account of connecting an AI agent to a real company inbox through Cloudflare Access, Workers, and MCP — including the failure modes that mattered most.
pubDate: 2026-04-24
heroImage: ../../assets/og/cloudflare-agentic-inbox-openclaw.png
---

Giving an AI agent access to a company inbox sounds simple until you try to do it for real.

At first, it looks like a tool problem:

- expose an MCP endpoint
- add a few mailbox tools
- let the agent call `list_emails` and `send_email`

But the hard parts show up somewhere else.

They show up in the access boundary.
They show up in token validation.
They show up in Cloudflare challenge behavior.
They show up in the gap between "the page works in a browser" and "a machine client can actually initialize an MCP session."

This is a field note from wiring an agent to a real inbox through Cloudflare Access, Workers, and MCP from inside OpenClaw.

The goal was not to build a demo inbox. The goal was to let an agent operate against real company mailboxes in a controlled way:

- list mailboxes
- read inbox messages
- search email
- inspect threads
- draft replies
- send email
- mark messages read
- move messages between folders

That is the point where an agent stops being a chatbot and starts touching real operational workflows.

Which means the implementation details matter.

## The shape of the system

The final system looked roughly like this:

```text
OpenClaw agent
  ↓ HTTPS MCP
Cloudflare Access
  ↓ service token / browser login
Cloudflare Worker
  ↓ mailbox tools
Company inboxes
```

The same application had two kinds of users:

1. humans opening the inbox UI in a browser
2. agents connecting to the MCP endpoint as machines

That distinction sounds obvious, but it drives most of the complexity.

A human browser can pass an Access login flow. A command-line MCP client cannot. A browser can run a Cloudflare challenge. A server-side fetch cannot. A human can recover from a confusing sign-in page. An agent just gets HTML where it expected JSON-RPC.

So the first lesson is simple:

> Human access and machine access may use the same hostname, but they are not the same path.

## Protect the whole application, not just one path

For the Access application, the clean configuration was to protect the full app hostname:

```text
https://inbox.example.com
```

Not only:

```text
/mcp
```

And not only the UI path.

The reason is that the application is not really two separate things. The UI, the API, and the MCP endpoint all belong to the same security boundary.

If you protect only one path, you can easily create a system where:

- the MCP endpoint is protected but the UI is not
- the UI is protected but some API path is not
- debugging becomes ambiguous because each path behaves differently

For this kind of app, path-level cleverness is usually not worth it at the beginning. Protect the whole app first. Narrow later only if you have a clear reason.

## `Invalid or expired Access token` may be an audience mismatch

One of the first errors looked like this:

```text
Invalid or expired Access token
```

That sounds like an expired session.

In this case, it was not.

The Access application had been recreated. Cloudflare generated a new audience tag for the new app. The Worker was still validating tokens against the old audience value.

So the browser could complete the Access flow, but the Worker rejected the token because its `AUD` did not match what the Worker expected.

The fix was to update the Worker secret used for Access token validation and redeploy.

The broader lesson:

> If you recreate a Cloudflare Access app, treat the audience value as new infrastructure state. Anything validating Access tokens needs to be updated.

This is easy to miss because the error message points your attention toward token freshness, not policy identity.

## A browser response from `/mcp` is only a partial signal

After the Access audience was fixed, visiting the MCP endpoint in a browser returned something like:

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32000,
    "message": "Not Acceptable: Client must accept text/event-stream"
  },
  "id": null
}
```

That is actually a good sign.

It means:

- the route exists
- the request reached the Worker
- the MCP server is alive
- the endpoint expects an SSE / streamable HTTP style client

But it does not prove that a real MCP client can connect.

To prove that, you need to send an actual MCP `initialize` request with the right headers:

```http
Accept: application/json, text/event-stream
Content-Type: application/json
```

And then you need to receive a real MCP session header:

```text
mcp-session-id: ...
```

Only after that should you move on to `tools/list` and `tools/call`.

A browser test can tell you the route is alive. It cannot tell you that your agent path works.

## Cloudflare challenge is not the same as Cloudflare Access

The most confusing failure was not an MCP error at all.

A direct machine request to `/mcp` returned:

```text
HTTP 403
cf-mitigated: challenge
Cloudflare “Just a moment...” page
```

That means the request did not fail at the Worker.
It did not fail at MCP initialization.
It did not even fail at the Access policy layer.

It was blocked earlier by Cloudflare challenge behavior.

This distinction matters:

```text
Cloudflare challenge → machine request never reaches Access/MCP
Cloudflare Access sign-in page → request reached Access, but auth did not pass
MCP JSON-RPC error → request reached the MCP server
```

Those are three different layers.

In our case, the machine request came from a server IP that Cloudflare treated as suspicious. Allowlisting that IP moved the failure forward: the challenge page disappeared, and the response became an Access sign-in page.

That was progress.

It meant we had crossed one boundary and found the next one.

## Service tokens should use Service Auth, not a mixed human allow policy

The next issue was Access policy shape.

The tempting configuration is to create a single allow policy that includes both:

```text
email = human@example.com
service token = inbox agent token
```

That looks reasonable, but it is not the cleanest model for machine access.

The more reliable shape was two separate policies:

### Human browser access

```text
decision: allow
include: email = human@example.com
```

### Machine MCP access

```text
decision: non_identity
include: service token = inbox agent token
```

In Cloudflare terms, the second path is Service Auth.

Once the service token was moved into its own non-identity policy, the machine client could authenticate cleanly and proceed to MCP initialization.

This is one of the most important practical lessons from the whole setup:

> Do not treat a service token like another human identity rule. Machine access deserves its own policy.

## OpenClaw did not need native MCP registration to make this useful

Another assumption we had to discard: the remote MCP server had to be registered as a native OpenClaw MCP tool before it could be useful.

That would be elegant, but it was not necessary.

In the current environment, trying to add a root-level `mcpServers` config was not accepted. Instead of forcing that path, we used direct HTTPS MCP calls from inside OpenClaw.

That turned out to be useful for debugging because every layer was visible:

- request headers
- Access behavior
- MCP initialization
- session id
- `tools/list`
- `tools/call`

Native integration can come later. Direct protocol access was better for first contact.

The practical takeaway:

> When debugging an agent-facing MCP service, prove the protocol path first. Integrate it into the agent runtime after the service is known-good.

## The moment it actually became real

The setup was not complete when the page loaded.

It was not complete when the MCP endpoint returned an SSE-related error.

It was not complete when `initialize` worked.

It became real when the agent could call inbox tools and produce side effects.

The tool list included operations like:

- `list_mailboxes`
- `list_emails`
- `get_email`
- `get_thread`
- `search_emails`
- `draft_reply`
- `send_email`
- `send_reply`
- `mark_email_read`
- `move_email`

We verified both sides of the loop:

1. reading email from a real mailbox
2. sending email from a real company address

That is the boundary where the system changes category.

Before that, it is an integration.
After that, it is an operational capability.

## What this changed in how I think about agentic inboxes

The inbox is a deceptively good test case for agent infrastructure.

It has everything that makes real agent work hard:

- private data
- external messages
- identity
- authentication
- side effects
- audit concerns
- human review needs
- irreversible actions if handled badly

Reading email is one level of risk.
Sending email is another.

Once an agent can send from a company mailbox, it is not just answering questions. It is representing the organization.

So the interesting problem is not only:

```text
Can the model write the reply?
```

It is:

```text
Can the system safely let the agent access, draft, and act?
```

That is a much harder and more useful question.

## The debugging checklist I would use next time

If I had to connect another agentic inbox, I would debug it in this order:

### 1. Confirm the app boundary

Protect the full app hostname first. Avoid clever path-only Access rules until the whole system works.

### 2. Confirm the Access audience

If the Access app was recreated, update any Worker or backend validation state that depends on the audience tag.

### 3. Test browser access and machine access separately

A human browser passing Access does not prove a service token path works.

### 4. Watch for Cloudflare challenge pages

If the response is HTML with `cf-mitigated: challenge`, you are not debugging MCP yet.

### 5. Split human and machine policies

Use human `allow` policies for browser login and `non_identity` / Service Auth policies for service tokens.

### 6. Prove MCP with `initialize`

Do not stop at a browser response from `/mcp`. Send a real JSON-RPC `initialize`, capture the `mcp-session-id`, then run `tools/list`.

### 7. Verify a real side effect

For inboxes, prove both read and send paths. Otherwise the integration may only be half alive.

## The larger lesson

Agentic inboxes are not mainly an email problem.

They are an execution-boundary problem.

The same pattern appears in browser automation, dashboards, internal tools, CRMs, support consoles, and publishing workflows.

At some point the question stops being:

```text
Can the agent reason about this task?
```

And becomes:

```text
Can the system safely give the agent the authority to act?
```

That is where a lot of agent infrastructure work actually lives.

It is less glamorous than model demos, but it is closer to production reality.

---

We ran into this while building and operating BrowserMan workflows. The product angle is simple: browser sessions, inboxes, and other authenticated tools all need delegated access, scoped permissions, and revocation once agents start acting in real environments. The inbox was just a particularly clear example of that larger problem.
