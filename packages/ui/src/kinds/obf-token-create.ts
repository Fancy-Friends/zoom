/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/obf-token-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/obf-token-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */

/**
 * Mint on-behalf-of token — Mint a short-lived token so a bot can join a Zoom
 * meeting on the authorising user's behalf.
 *
 * https://developers.zoom.us/blog/transition-to-obf-token-meetingsdk-apps/
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { zoomMeta } from "../service.js";

export const ZOOM_OBF_TOKEN_CREATE_KIND = "@particle-academy/zoom_obf_token_create";
export const ZOOM_OBF_TOKEN_CREATE_OPERATION = "obf_token_create";

export const ZOOM_OBF_TOKEN_CREATE_META = zoomMeta("action", "an on-behalf-of token", "https://developers.zoom.us/blog/transition-to-obf-token-meetingsdk-apps/");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const ZOOM_OBF_TOKEN_CREATE_OUTPUT: OutputField[] = [
  {
    "path": "data.token",
    "type": "string",
    "description": "The OBF token. Present it the way the Meeting SDK's join call expects; it is not a Bearer header value on Zoom's REST API."
  }
];

export const zoomObfTokenCreateKind: NodeKindDefinition = defineConnectorKind(ZOOM_OBF_TOKEN_CREATE_META, {
  name: ZOOM_OBF_TOKEN_CREATE_KIND,
  aliases: ["zoom_obf_token_create"],
  label: "Mint on-behalf-of token",
  description: "Mint a short-lived token so a bot can join a Zoom meeting on the authorising user's behalf.",
  icon: "🔑",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: ZOOM_OBF_TOKEN_CREATE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "meetingId",
      "label": "Meeting ID",
      "required": true,
      "description": "The meeting the bot is about to join. The minted token works for this meeting only."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(ZOOM_OBF_TOKEN_CREATE_META, config as Record<string, unknown>, "an on-behalf-of token"),
});
