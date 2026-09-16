<?php

declare(strict_types=1);

namespace ParticleAcademy\Zoom\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Zoom\Actions\ObfTokenCreate;
use ParticleAcademy\Zoom\Zoom;

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
 * Mint on-behalf-of token, run on a fancy-flow-php host.
 *
 * The PHP twin of `zoomObfTokenCreateExecutor` in @particle-academy/zoom-js:
 * the same request, built from the node's config by the same
 * `Actions\ObfTokenCreate` a host would call directly, and the same value on
 * `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Zoom. To reach a real estate, pass a `ConnectorClient`
 * that knows the host's connections — or bind one in the container, which
 * resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/zoom_obf_token_create',
    aliases: [
        'zoom_obf_token_create',
    ],
    category: 'io',
    label: 'Mint on-behalf-of token',
    description: 'Mint a short-lived token so a bot can join a Zoom meeting on the authorising user\'s behalf.',
    icon: '🔑',
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
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.token',
            'type' => 'string',
            'description' => 'The OBF token. Present it the way the Meeting SDK\'s join call expects; it is not a Bearer header value on Zoom\'s REST API.',
        ],
    ],
)]
final class ObfTokenCreateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Zoom::descriptor(),
            ObfTokenCreate::OPERATION,
            $config,
            [
                'method' => ObfTokenCreate::METHOD,
                'path' => ObfTokenCreate::PATH,
                'query' => ObfTokenCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'zoom obf_token_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
