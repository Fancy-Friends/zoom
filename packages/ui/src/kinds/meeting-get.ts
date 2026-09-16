/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/meeting-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/meeting-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */

/**
 * Get meeting — Read a Zoom meeting's join details and settings.
 *
 * https://developers.zoom.us/docs/api/meetings/
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { zoomMeta } from "../service.js";

export const ZOOM_MEETING_GET_KIND = "@particle-academy/zoom_meeting_get";
export const ZOOM_MEETING_GET_OPERATION = "meeting_get";

export const ZOOM_MEETING_GET_META = zoomMeta("action", "a Zoom meeting", "https://developers.zoom.us/docs/api/meetings/");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const ZOOM_MEETING_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "number",
    "description": "The meeting's numeric id (also called the meeting number)."
  },
  {
    "path": "data.uuid",
    "type": "string",
    "description": "A unique id for THIS instance of a recurring meeting; the meeting id alone is shared across occurrences."
  },
  {
    "path": "data.host_id",
    "type": "string",
    "description": "The Zoom user id of the meeting's host."
  },
  {
    "path": "data.topic",
    "type": "string",
    "description": "The meeting's title."
  },
  {
    "path": "data.type",
    "type": "number",
    "description": "Zoom's numeric meeting type: 1 instant, 2 scheduled, 3 recurring with no fixed time, 8 recurring with a fixed time."
  },
  {
    "path": "data.status",
    "type": "string",
    "description": "waiting, started, or finished."
  },
  {
    "path": "data.start_time",
    "type": "string",
    "description": "ISO 8601 with a Z offset, e.g. 2026-09-15T14:00:00Z."
  },
  {
    "path": "data.duration",
    "type": "number",
    "description": "Scheduled length, in minutes."
  },
  {
    "path": "data.timezone",
    "type": "string",
    "description": "An IANA zone Zoom uses to render start_time in its own UI, e.g. America/New_York."
  },
  {
    "path": "data.agenda",
    "type": "string",
    "description": "The meeting's description, when the host set one."
  },
  {
    "path": "data.join_url",
    "type": "string",
    "description": "The link a participant (or a meeting bot) uses to join."
  },
  {
    "path": "data.password",
    "type": "string",
    "description": "The passcode required to join, when the meeting has one."
  },
  {
    "path": "data.settings.waiting_room",
    "type": "boolean",
    "description": "Whether Zoom holds joiners in a waiting room before admitting them -- a bot must be admitted like any guest."
  },
  {
    "path": "data.settings.join_before_host",
    "type": "boolean",
    "description": "Whether a participant may join before the host has started the meeting."
  },
  {
    "path": "data.settings.approval_type",
    "type": "number",
    "description": "0 automatically approve, 1 manually approve, 2 no registration required."
  }
];

export const zoomMeetingGetKind: NodeKindDefinition = defineConnectorKind(ZOOM_MEETING_GET_META, {
  name: ZOOM_MEETING_GET_KIND,
  aliases: ["zoom_meeting_get"],
  label: "Get meeting",
  description: "Read a Zoom meeting's join details and settings.",
  icon: "🎥",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: ZOOM_MEETING_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "meetingId",
      "label": "Meeting ID",
      "required": true,
      "description": "The meeting's numeric id, from its join URL or from Zoom's own meeting list."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(ZOOM_MEETING_GET_META, config as Record<string, unknown>, "a Zoom meeting"),
});
