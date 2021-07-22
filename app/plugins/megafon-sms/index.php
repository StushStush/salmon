<?php

@include_once __DIR__ . '/MegafonSms.php';

if (!function_exists('sendsms')) {
  function sendsms()
  {
    $client = new MegafonSms('', '');
  }
}
