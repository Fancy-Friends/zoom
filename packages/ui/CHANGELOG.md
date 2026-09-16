# Changelog — Zoom

All four packages — `@particle-academy/zoom-ui`, `@particle-academy/zoom-js`,
`particle-academy/zoom-php` and `fancy-zoom` — are released together under one
version. They are generated from one `provider/` definition, so a change to it
changes all four, and separate version lines would only record which of the
four somebody remembered to bump.

**Write entries HERE**, in the weaver envelope at `providers/zoom/CHANGELOG.md`,
then regenerate. This file is the one thing in a release that cannot be derived
— somebody has to write what changed — but writing it in the provider repo
would be a hand-edit that `.weaver.json` flags and the next sync destroys.

## [0.1.0] — 2026-09-16

### Added

- **`meeting_get`** — read a meeting's join link and settings (`GET /meetings/{meetingId}`, scope `meeting:read:meeting`).
- **`obf_token_create`** — mint the on-behalf-of token a Meeting SDK bot needs to join a meeting it did not create (`GET /users/me/token?type=onbehalf`, scope `user:read:token`), required since Zoom's own 2026-02-23 enforcement date. Meeting-scoped and single-use, so it is minted fresh before every join rather than cached.
- OAuth2 authorization-code, with `refreshTokenRotates: true` — Zoom issues a new refresh token on every refresh and treats reuse of an old one as an error, the same shape this vocabulary already refuses to retry or run concurrently.
- Sandbox is `unverified`: Zoom documents no test estate distinct from a real account, but nobody has confirmed there is truly nothing rather than simply not having found it.

Tynn #10 (MOIC U15) — the OAuth flow, both endpoints and the sandbox note were checked against Zoom's own docs, its developer forum and its migration blog on 2026-09-15; `meeting_get`'s field list is the long-stable v2 shape rather than a page transcription (Zoom's detail page did not render for review) and is flagged for a live spot-check before an account depends on it.
