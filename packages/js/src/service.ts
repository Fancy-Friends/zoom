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
 * Zoom, as one service descriptor shared by every Zoom operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Zoom: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Zoom has no test estate distinct from a real account, as far as this review
 * found (2026-09-15) -- but it is UNVERIFIED, not confirmed. Every call
 * authorizes against the caller's own Zoom account and can read real meeting
 * data. Use fake mode while building.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { zoomFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const ZOOM_BASE_URLS = {
  "live": "https://api.zoom.us/v2"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const ZOOM_REQUIRES = [
  "accessToken"
] as const;

/**
 * Apply Zoom's auth scheme to an outgoing request.
 *
 * Every Zoom REST call is a Bearer token on the Authorization header, OAuth or
 * Server-to-Server alike; this provider declares the user OAuth shape so a
 * host can connect a rep's own Zoom account rather than one shared app-wide
 * identity.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function zoomAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Zoom service, for the TypeScript runtime. */
export const ZOOM: ServiceDescriptor = {
  service: "zoom",
  title: "Zoom",
  sandbox: "unverified",
  baseUrls: { ...ZOOM_BASE_URLS },
  requires: [...ZOOM_REQUIRES],
  authorize: zoomAuthorize,
  faker: zoomFaker,
};
