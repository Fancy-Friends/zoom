<?php

declare(strict_types=1);

/*
 * Zoom — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/zoom-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Zoom\ZoomFaker;

$goldens = [
    [
        'operation' => 'meeting_get',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'obf_token_create',
        'config' => [],
        'expected' => [
            'token' => 'obf_fake_5d85a56fcc2e',
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('zoom', $operation, $config));
    $faked = ZoomFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
