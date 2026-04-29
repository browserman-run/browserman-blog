# BrowserMan CLI / extension platform mismatch report

Status: bug note
Created: 2026-04-29

## Summary

After reinstalling BrowserMan skills and upgrading `browserman-cli` to `0.3.0`, script discovery works, but `script run` fails because the CLI/API layer and browser extension execution layer disagree about platform identifiers.

This blocks X and DEV.to script automation from the heartbeat flow.

## Environment

- CLI path: `/data/openclaw/user-tools/npm-global/bin/browserman`
- CLI version: `0.3.0`
- Browser: `cedar-vale`
- `browserman doctor` status: delegated auth OK, browser OK
- Skill reinstalled with: `npx -y skills add browserman-run/skills -y`

## Reproduction

Discovery succeeds:

```bash
browserman script actions --platform x --json
browserman script describe --platform x --action search --json
```

`describe` reports canonical platform id `x`, aliases `x.com`, `twitter.com`.

Run with canonical id fails in extension execution layer:

```bash
browserman script run --platform x --action search --text "support inbox automation" --json --wait --wait-timeout 90000
```

Error:

```text
Unknown platform: "x". Available: x.com, linkedin.com, reddit.com, medium.com, youtube.com, ...
```

Run with domain id fails in API/CLI validation layer:

```bash
browserman script run --platform x.com --action search --text "support inbox automation" --json --wait --wait-timeout 90000
```

Error:

```text
Unknown platform: "x.com". Use canonical platform ids only: x, linkedin, reddit, medium, youtube, ... Did you mean --platform x?
```

Same issue for DEV.to / Forem:

```bash
browserman script run --platform forem --base-url https://dev.to --action get_article --url <url> --json --wait
```

Error:

```text
Unknown platform: "forem". Available: x.com, linkedin.com, reddit.com, medium.com, youtube.com, ... dev.to ...
```

## Expected behavior

`script run --platform x ...` should resolve to the extension's X script implementation, or the bridge should normalize canonical ids to runtime domains before dispatch.

Likewise `--platform forem --base-url https://dev.to` should resolve to `dev.to` execution.

## Impact

- X search/reply/post/like scripts cannot be used reliably from CLI.
- DEV.to scripts cannot be used reliably from CLI.
- BrowserMan Social Ops heartbeat must fall back to low-level page commands or private content work.

## Workaround

Use low-level BrowserMan page commands for public pages / logged-in UI work:

```bash
browserman page open --url https://x.com/search?q=... --json
browserman page read --json
```

For publishing or authenticated edits, use page automation carefully and verify public DOM afterward.

## Suggested fix direction

Normalize platform IDs at the `script run` boundary:

- API/CLI accepts canonical IDs (`x`, `forem`).
- Execution layer maps canonical IDs to runtime hostnames (`x.com`, `dev.to`) before script lookup.
- Or update extension script registry to use canonical IDs internally.

The important part: `script list/actions/describe/run` should agree on the same public platform identifier.
