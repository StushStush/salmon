<section
  x-data="{ img: '' }"
  x-init="
    img = __isMobile
      ? '<?= $section->img_xs()->toFile()->resize(1920)->url() ?>'
      : '<?= $section->img()->toFile()->resize(1920)->url() ?>'
  "
  class="salmon-description max-h-80v lg:max-h-unset h-95v mb-120 md:h-80v md:mb-162 md:min-h-550 md:px-66 md:pb-66 lg:h-auto py-30 sm:p-42 rounded-s md:rounded-lg 2xl:min-h-800 flex px-24 text-white bg-center bg-no-repeat bg-cover"
  :style="`background-image: url(${img})`">
  <div class="flex flex-col flex-wrap mt-auto">
    <h1 class="title text-h2-mobile mb-18 md:text-h2-tabl lg:text-h2-desk lg:mb-30 font-semibold">
      <?= kti($section->headline()) ?>
    </h1>
    <p class="text-text-s lg:text-text sm:w-2/5 xl:w-5/12 lg:1/3 md:1/2">
      <?= kti($section->caption()) ?>
    </p>
  </div>
</section>
