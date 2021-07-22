<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?= snippet('site/seo') ?>
  <?= snippet('site/icons') ?>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

  <?= mix('/css/index.css') ?>

  <style>
    [x-cloak] { display: none !important; }

  .lazyload,
  .lazyloading { opacity: 0; }
  .lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
  }
  </style>

  <?= js('https://maps.googleapis.com/maps/api/js?key=AIzaSyBGp34ZYm72iLOkiRSLkjEY0VuL4Twtr5A', ['defer' => true]) ?>

  <?= mix('/js/manifest.js', ['defer' => true]) ?>
  <?= mix('/js/vendor.js', ['defer' => true]) ?>
  <?= mix('/js/index.js', ['defer' => true]) ?>

  <?php if (!option('debug') and $site->scrips_head()->isNotEmpty()) : ?>
    <?= $site->scrips_head() ?>
  <?php endif; ?>
</head>

<body class="antialiased debug-mq font-sans font-normal <?= e($page->template() == 'error', 'bg-primary') ?>">
