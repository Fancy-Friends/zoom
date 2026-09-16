<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom\Actions;

use ParticleAcademy\Zoom\Zoom;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Zoom or calls the faker.
 */
final class ObfTokenCreate
{
    public const OPERATION = 'obf_token_create';
    public const METHOD = 'GET';
    public const PATH = '/users/me/token';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

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
            throw new ConnectorConfigException('obf_token_create: "meetingId" is required (Meeting ID).');
        }

        $body = [];

        $value = $config['meetingId'] ?? null;
        $body['meeting_id'] = (string) $value;

        $body['type'] = 'onbehalf';
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }
}
