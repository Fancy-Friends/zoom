# Zoom

[![Fancified](art/fancified.svg)](https://particle.academy)

Zoom for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/zoom-ui` | `npm install @particle-academy/zoom-ui` |
| Node | `@particle-academy/zoom-js` | `npm install @particle-academy/zoom-js` |
| PHP 8.4+ | `particle-academy/zoom-php` | `composer require particle-academy/zoom-php` |
| Python 3.11+ | `fancy-zoom` | `pip install fancy-zoom` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Zoom SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Zoom connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From the Zoom app you registered at marketplace.zoom.us. One value for the whole installation -- the same app serves every connected Zoom account. |
| **OAuth client secret** | per installation | **secret** | From the same app. Used to exchange the code and to refresh; never sent with an API request. |
| **Access token** | per connected account | **secret** | Obtained by the host's OAuth exchange, PER CONNECTED ZOOM ACCOUNT. Expires after one hour -- a host that does not refresh will work for a while and then fail with no warning. |
| **Refresh token** | per connected account | **secret** | Also per account. A NEW one is issued on every refresh -- persist the replacement atomically, and never retry a refresh that may have already succeeded: replaying an old refresh token is Zoom's own reported failure mode for a rotating grant. |

### Authorising

Zoom uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://zoom.us/oauth/authorize
- **Token URL** — https://zoom.us/oauth/token
- **Scopes** — `meeting:read:meeting`, `user:read:token`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

**The refresh tokens ROTATE, and they are single use.** Every refresh returns a new one and spends the one submitted, so replaying a spent token revokes the ENTIRE grant — the user is signed out, with nothing in the failure that says why.

Two consequences, both of which a host gets wrong by default:

1. **Do not RETRY a failed refresh with the same token.** A response that arrived but was not persisted — a crash between the reply and the write — turns the reflexive retry into a replay.
2. **Do not refresh CONCURRENTLY.** Two workers refreshing at once means one of them replays.

Persist the returned token before using the access token it came with.

### The estate

**Nobody has checked whether Zoom has a test estate.** Treat every call as real.

> Zoom has no test estate distinct from a real account, as far as this review found (2026-09-15) -- but it is UNVERIFIED, not confirmed. Every call authorizes against the caller's own Zoom account and can read real meeting data. Use fake mode while building.

## What it can do

### Actions

#### `meeting_get` — Get meeting

Read a Zoom meeting's join details and settings.

`GET /meetings/{meetingId}` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `meetingId` | yes | The meeting's numeric id, from its join URL or from Zoom's own meeting list. |

#### `obf_token_create` — Mint on-behalf-of token

Mint a short-lived token so a bot can join a Zoom meeting on the authorising user's behalf.

`GET /users/me/token` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `meetingId` | yes | The meeting the bot is about to join. The minted token works for this meeting only. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Zoom has a sandbox. Set a
node's mode to `fake` and it returns the shape Zoom actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/zoom`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
