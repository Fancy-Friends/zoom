<?php

declare(strict_types=1);

use ParticleAcademy\Zoom\ZoomFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('meeting_get fakes the shape Zoom publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('zoom', 'meeting_get', $config));

    $faked = ZoomFaker::respond('meeting_get', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'id' => '9811075371',
        'uuid' => '034dacf2-6ca5-4372-16fc-1db008fa8947',
        'host_id' => 'u_fake_1fe7dd5e6dc1',
        'topic' => 'Weekly sync',
        'type' => 2,
        'status' => 'waiting',
        'start_time' => '2026-09-22T14:00:00Z',
        'duration' => 30,
        'timezone' => 'America/New_York',
        'agenda' => '',
        'join_url' => 'https://zoom.us/j/1234567890?pwd=fake',
        'password' => '798415',
        'settings' => [
            'waiting_room' => true,
            'join_before_host' => false,
            'approval_type' => 2,
        ],
    ]);
});

it('obf_token_create fakes the shape Zoom publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('zoom', 'obf_token_create', $config));

    $faked = ZoomFaker::respond('obf_token_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'token' => 'obf_fake_5d85a56fcc2e',
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('zoom', 'no_such_operation', []));

    expect(fn () => ZoomFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
