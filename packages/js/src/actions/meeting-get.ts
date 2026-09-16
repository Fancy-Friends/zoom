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
 * Read a Zoom meeting's join details and settings.
 *
 * GET /meetings/{meetingId} — https://developers.zoom.us/docs/api/meetings/
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Zoom or calls the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { ZOOM } from "../service.js";

export const MEETING_GET_OPERATION = "meeting_get";

export type MeetingGetOptions = {
  /** The node's resolved config. Keys: meetingId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function zoomMeetingGet(options: MeetingGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.meetingId === undefined || config.meetingId === null || config.meetingId === "") {
    throw new Error(`meeting_get: "meetingId" is required (Meeting ID).`);
  }

  return callConnector(ZOOM, {
    operation: MEETING_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/meetings/${encodeURIComponent(String(config.meetingId))}`,
      query: {},
    },
  });
}
