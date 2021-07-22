<?php

return function ($page, $site, $kirby) {
  if($kirby->request()->is('POST')) {
    $alert = [];
    $data = get(null);

    if(count($alert)) {
      echo Response::json($alert, 400, true);
      exit;
    }
    
    echo Response::json([
      'alert'   => $alert,
      'data'    => $data ?? null,
      'success' => $success ?? null
    ], 200, true);

    exit;
  }
};
