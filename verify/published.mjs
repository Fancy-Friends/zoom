/*
 * Zoom — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { zoomFaker } from "@particle-academy/zoom-js";
import { ZOOM_KINDS } from "@particle-academy/zoom-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/zoom-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "meeting_get",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "obf_token_create",
    "config": {},
    "expected": {
      "token": "obf_fake_5d85a56fcc2e"
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = zoomFaker(operation, fakeRequest("zoom", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(ZOOM_KINDS.length, 2);
for (const kind of ZOOM_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/zoom-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
