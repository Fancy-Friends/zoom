/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */

/**
 * Zoom's identity on the authoring surface, shared by every Zoom node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Zoom has no test estate distinct from a real account, as far as this review
 * found (2026-09-15) -- but it is UNVERIFIED, not confirmed. Every call
 * authorizes against the caller's own Zoom account and can read real meeting
 * data. Use fake mode while building.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const ZOOM_SERVICE = {
  service: "zoom",
  serviceTitle: "Zoom",
  domain: "messaging",
  sandbox: "unverified",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Zoom connection holds. */
export const ZOOM_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "OAuth client ID",
    "scope": "provider",
    "secret": false,
    "help": "From the Zoom app you registered at marketplace.zoom.us. One value for the whole installation -- the same app serves every connected Zoom account."
  },
  {
    "key": "clientSecret",
    "label": "OAuth client secret",
    "scope": "provider",
    "secret": true,
    "help": "From the same app. Used to exchange the code and to refresh; never sent with an API request."
  },
  {
    "key": "accessToken",
    "label": "Access token",
    "scope": "account",
    "secret": true,
    "help": "Obtained by the host's OAuth exchange, PER CONNECTED ZOOM ACCOUNT. Expires after one hour -- a host that does not refresh will work for a while and then fail with no warning."
  },
  {
    "key": "refreshToken",
    "label": "Refresh token",
    "scope": "account",
    "secret": true,
    "help": "Also per account. A NEW one is issued on every refresh -- persist the replacement atomically, and never retry a refresh that may have already succeeded: replaying an old refresh token is Zoom's own reported failure mode for a rotating grant."
  }
] as const;

/**
 * The OAuth2 exchange Zoom requires — DECLARED here, performed by the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 3600 seconds. A host that never refreshes will work
 * all afternoon and be broken by morning, which is why the lifetime is stated
 * rather than left to be discovered.
 *
 * Its refresh tokens ROTATE, and they are single use. Every refresh returns a
 * new one and spends the one submitted, so REPLAYING a spent token revokes the
 * entire grant — the user is signed out, with nothing in the failure that says
 * why.
 *
 * Two consequences, both of which a host gets wrong by default. Do not RETRY a
 * failed refresh with the same token: a response that arrived but was not
 * persisted — a crash between the reply and the write — makes the retry a
 * replay. And do not refresh concurrently, because two workers refreshing at
 * once means one of them replays. Persist the returned token BEFORE using the
 * access token it came with.
 */
export const ZOOM_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://zoom.us/oauth/authorize",
  "tokenUrl": "https://zoom.us/oauth/token",
  "scopes": [
    "meeting:read:meeting",
    "user:read:token"
  ],
  "accessTokenCredential": "accessToken",
  "refreshTokenCredential": "refreshToken",
  "refreshTokenRotates": true,
  "accessTokenTtlSeconds": 3600
} as const;

/** Build a Zoom node's connector metadata from the operation it performs. */
export function zoomMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...ZOOM_SERVICE, role, operation, docs };
}
