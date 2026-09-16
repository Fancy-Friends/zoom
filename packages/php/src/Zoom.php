<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- zoom
 */
/**
 * Zoom, as one service descriptor shared by every Zoom operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Zoom has no test estate distinct from a real account, as far as this review
 * found (2026-09-15) -- but it is UNVERIFIED, not confirmed. Every call
 * authorizes against the caller's own Zoom account and can read real meeting
 * data. Use fake mode while building.
 */
final class Zoom
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'zoom';

    public const LIVE_URL = 'https://api.zoom.us/v2';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'accessToken',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Zoom',
            sandbox: SandboxKind::Unverified,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            // The core calls a faker ($operation, $config, $fake, $input); respond()
            // takes TypeScript's FakeRequest shape. This is the translation.
            faker: static fn (string $operation, array $config, FakeValues $fake, mixed $input = null): mixed => ZoomFaker::respond(
                $operation,
                ['config' => $config, 'fake' => $fake, 'input' => $input],
            ),
        );
    }

    /**
     * Apply Zoom's auth scheme to an outgoing request.
     *
     * Every Zoom REST call is a Bearer token on the Authorization header, OAuth or
     * Server-to-Server alike; this provider declares the user OAuth shape so a
     * host can connect a rep's own Zoom account rather than one shared app-wide
     * identity.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('Authorization', 'Bearer '.($credentials['accessToken'] ?? ''));
    }
}
