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
 * Zoom's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/meeting-get.js";
export * from "./kinds/obf-token-create.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { zoomMeetingGetKind } from "./kinds/meeting-get.js";
import { zoomObfTokenCreateKind } from "./kinds/obf-token-create.js";

/** Every Zoom kind, for a host that registers the lot. */
export const ZOOM_KINDS: NodeKindDefinition[] = [
  zoomMeetingGetKind,
  zoomObfTokenCreateKind,
];
