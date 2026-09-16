<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Zoom\Actions\MeetingGet;
use ParticleAcademy\Zoom\Zoom;

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
 * Get meeting, run on a fancy-flow-php host.
 *
 * The PHP twin of `zoomMeetingGetExecutor` in @particle-academy/zoom-js: the
 * same request, built from the node's config by the same `Actions\MeetingGet`
 * a host would call directly, and the same value on `out` — the client's
 * `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Zoom. To reach a real estate, pass a `ConnectorClient`
 * that knows the host's connections — or bind one in the container, which
 * resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/zoom_meeting_get',
    aliases: [
        'zoom_meeting_get',
    ],
    category: 'io',
    label: 'Get meeting',
    description: 'Read a Zoom meeting\'s join details and settings.',
    icon: '🎥',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'number',
            'description' => 'The meeting\'s numeric id (also called the meeting number).',
        ],
        [
            'path' => 'data.uuid',
            'type' => 'string',
            'description' => 'A unique id for THIS instance of a recurring meeting; the meeting id alone is shared across occurrences.',
        ],
        [
            'path' => 'data.host_id',
            'type' => 'string',
            'description' => 'The Zoom user id of the meeting\'s host.',
        ],
        [
            'path' => 'data.topic',
            'type' => 'string',
            'description' => 'The meeting\'s title.',
        ],
        [
            'path' => 'data.type',
            'type' => 'number',
            'description' => 'Zoom\'s numeric meeting type: 1 instant, 2 scheduled, 3 recurring with no fixed time, 8 recurring with a fixed time.',
        ],
        [
            'path' => 'data.status',
            'type' => 'string',
            'description' => 'waiting, started, or finished.',
        ],
        [
            'path' => 'data.start_time',
            'type' => 'string',
            'description' => 'ISO 8601 with a Z offset, e.g. 2026-09-15T14:00:00Z.',
        ],
        [
            'path' => 'data.duration',
            'type' => 'number',
            'description' => 'Scheduled length, in minutes.',
        ],
        [
            'path' => 'data.timezone',
            'type' => 'string',
            'description' => 'An IANA zone Zoom uses to render start_time in its own UI, e.g. America/New_York.',
        ],
        [
            'path' => 'data.agenda',
            'type' => 'string',
            'description' => 'The meeting\'s description, when the host set one.',
        ],
        [
            'path' => 'data.join_url',
            'type' => 'string',
            'description' => 'The link a participant (or a meeting bot) uses to join.',
        ],
        [
            'path' => 'data.password',
            'type' => 'string',
            'description' => 'The passcode required to join, when the meeting has one.',
        ],
        [
            'path' => 'data.settings.waiting_room',
            'type' => 'boolean',
            'description' => 'Whether Zoom holds joiners in a waiting room before admitting them -- a bot must be admitted like any guest.',
        ],
        [
            'path' => 'data.settings.join_before_host',
            'type' => 'boolean',
            'description' => 'Whether a participant may join before the host has started the meeting.',
        ],
        [
            'path' => 'data.settings.approval_type',
            'type' => 'number',
            'description' => '0 automatically approve, 1 manually approve, 2 no registration required.',
        ],
    ],
)]
final class MeetingGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Zoom::descriptor(),
            MeetingGet::OPERATION,
            $config,
            [
                'method' => MeetingGet::METHOD,
                'path' => MeetingGet::path($config),
                'query' => MeetingGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'zoom meeting_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
