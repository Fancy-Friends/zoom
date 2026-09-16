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
 * The Zoom faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Zoom actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeMeetingGet({ config, fake }: FakeRequest): unknown {
  return {
    "id": (config.meetingId !== undefined && config.meetingId !== null && config.meetingId !== "" ? (Number.isFinite(Number(config.meetingId)) ? Math.trunc(Number(config.meetingId)) : null) : Array.from({ length: 10 }, () => fake.int(0, 9)).join("")),
    "uuid": `${fake.hex(8)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(4)}-${fake.hex(12)}`,
    "host_id": fake.id("u"),
    "topic": "Weekly sync",
    "type": 2,
    "status": "waiting",
    "start_time": "2026-09-22T14:00:00Z",
    "duration": 30,
    "timezone": "America/New_York",
    "agenda": "",
    "join_url": "https://zoom.us/j/1234567890?pwd=fake",
    "password": Array.from({ length: 6 }, () => fake.int(0, 9)).join(""),
    "settings": {
      "waiting_room": true,
      "join_before_host": false,
      "approval_type": 2,
    },
  };
}

function fakeObfTokenCreate({ config, fake }: FakeRequest): unknown {
  return {
    "token": fake.id("obf"),
  };
}

export const zoomFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "meeting_get":
      return fakeMeetingGet(request);

    case "obf_token_create":
      return fakeObfTokenCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `zoom: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
