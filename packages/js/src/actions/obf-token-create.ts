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
 * Mint a short-lived token so a bot can join a Zoom meeting on the authorising
 * user's behalf.
 *
 * GET /users/me/token —
 * https://developers.zoom.us/blog/transition-to-obf-token-meetingsdk-apps/
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Zoom or calls the faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { ZOOM } from "../service.js";

export const OBF_TOKEN_CREATE_OPERATION = "obf_token_create";

export type ObfTokenCreateOptions = {
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

export async function zoomObfTokenCreate(options: ObfTokenCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.meetingId === undefined || config.meetingId === null || config.meetingId === "") {
    throw new Error(`obf_token_create: "meetingId" is required (Meeting ID).`);
  }

  return callConnector(ZOOM, {
    operation: OBF_TOKEN_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: "/users/me/token",
      query: {
        "meeting_id": String(config.meetingId),
        "type": "onbehalf",
      },
    },
  });
}
