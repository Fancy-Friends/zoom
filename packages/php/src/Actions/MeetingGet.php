<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom\Actions;

use ParticleAcademy\Zoom\Zoom;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Zoom or calls the faker.
 */
final class MeetingGet
{
    public const OPERATION = 'meeting_get';
    public const METHOD = 'GET';
    public const PATH = '/meetings/{meetingId}';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Zoom.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['meetingId'] ?? null) === null || ($config['meetingId'] ?? null) === '') {
            throw new ConnectorConfigException('meeting_get: "meetingId" is required (Meeting ID).');
        }

        $body = [];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/meetings/'.rawurlencode((string) ($config['meetingId'] ?? ''));
    }
}
