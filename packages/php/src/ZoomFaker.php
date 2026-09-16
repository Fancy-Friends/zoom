<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom;

use ParticleAcademy\Connectors\FakeRequest;

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
 * The Zoom faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class ZoomFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'meeting_get' => self::MeetingGet($config, $fake),
            'obf_token_create' => self::ObfTokenCreate($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'zoom: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function MeetingGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'id' => ((($v = $config['meetingId'] ?? null) !== null && $v !== '') ? (is_numeric($v) ? (int) $v : null) : implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 10)))),
        'uuid' => $fake->hex(8).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(4).'-'.$fake->hex(12),
        'host_id' => $fake->id('u'),
        'topic' => 'Weekly sync',
        'type' => 2,
        'status' => 'waiting',
        'start_time' => '2026-09-22T14:00:00Z',
        'duration' => 30,
        'timezone' => 'America/New_York',
        'agenda' => '',
        'join_url' => 'https://zoom.us/j/1234567890?pwd=fake',
        'password' => implode('', array_map(static fn (): int => $fake->int(0, 9), range(1, 6))),
        'settings' => [
            'waiting_room' => true,
            'join_before_host' => false,
            'approval_type' => 2,
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function ObfTokenCreate(array $config, mixed $fake): array|\stdClass
    {
        return [
        'token' => $fake->id('obf'),
    ];
    }
}
