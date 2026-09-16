/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */

/**
 * Zoom's node kinds with their TypeScript executors attached — for hosts that
 * EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/zoom-ui carries no executor: the
 * editor is React on every host, so a PHP or Python project installs the ui
 * package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { ZOOM } from "./service.js";

import {
  zoomMeetingGetKind,
  zoomObfTokenCreateKind,
} from "@particle-academy/zoom-ui";

import { zoomMeetingGet } from "./actions/meeting-get.js";
import { zoomObfTokenCreate } from "./actions/obf-token-create.js";

export const zoomMeetingGetExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await zoomMeetingGet({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `zoom meeting_get ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const zoomObfTokenCreateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await zoomObfTokenCreate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `zoom obf_token_create ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

/** The kinds a TypeScript host registers. */
export const ZOOM_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...zoomMeetingGetKind, executor: zoomMeetingGetExecutor },
  { ...zoomObfTokenCreateKind, executor: zoomObfTokenCreateExecutor },
];
