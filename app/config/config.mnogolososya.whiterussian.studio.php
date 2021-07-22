<?php

return [
  'debug' => false,
  'diverently.laravel-mix-kirby.manifestPath' => 'assets/mix-manifest.json',
  'diverently.laravel-mix-kirby.assetsDirectory' => 'assets',
  'cache' => [
    'pages' => [
      'active' => true,
      'type'   => 'memcached',
      'host'   => '127.0.0.1',
      'port'   => '11211',
      'prefix'  => 'mnogolososya_1_',
    ]
  ],
];
