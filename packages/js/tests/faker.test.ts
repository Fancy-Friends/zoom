/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { zoomFaker } from "../src/faker.js";

test("meeting_get fakes the shape Zoom publishes", () => {
  const config = {};

  const faked = zoomFaker("meeting_get", fakeRequest("zoom", "meeting_get", config));

  assert.deepEqual(faked, {
    "id": "9811075371",
    "uuid": "034dacf2-6ca5-4372-16fc-1db008fa8947",
    "host_id": "u_fake_1fe7dd5e6dc1",
    "topic": "Weekly sync",
    "type": 2,
    "status": "waiting",
    "start_time": "2026-09-22T14:00:00Z",
    "duration": 30,
    "timezone": "America/New_York",
    "agenda": "",
    "join_url": "https://zoom.us/j/1234567890?pwd=fake",
    "password": "798415",
    "settings": {
      "waiting_room": true,
      "join_before_host": false,
      "approval_type": 2
    }
  });
});

test("obf_token_create fakes the shape Zoom publishes", () => {
  const config = {};

  const faked = zoomFaker("obf_token_create", fakeRequest("zoom", "obf_token_create", config));

  assert.deepEqual(faked, {
    "token": "obf_fake_5d85a56fcc2e"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => zoomFaker("no_such_operation", fakeRequest("zoom", "no_such_operation", {})), /no fake response/);
});
