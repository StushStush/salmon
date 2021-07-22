<section class="app bg-gray mb-120 py-42 md:py-66 md:px-102 md:mb-162 lg:py-120 lg:px-66 lg:text-left lg:flex lg:static lg:h-auto 2xl:py-120 2xl:px-162 relative px-24 text-center rounded-s md:rounded-lg md:max-h-95v">
  <div class="app__description lg:mb-0 lg:relative lg:min-h-appBlock lg:mr-102 lg:max-w-appBlock mb-24">
    <h1 class="title lg:mb-30 text-h2-mobile md:text-h2-tabl lg:text-h2-desk lg:pt-42 mb-24 font-semibold">
      <?= kti($section->headline()) ?>
    </h1>
    <p class="description text-text-s md:text-text md:mb-66 lg:mb-0 mb-48">
      <?= kti($section->caption()) ?>
    </p>
    <button
      x-data
      @click="$dispatch('modal:open')"
      class="app__button bg-primary font-semibold hover:shadow-xl md:px-42 md:py-24 md:text-sm lg:block lg:mb-42 absolute bottom-0 hidden w-full text-white transition rounded-xl">Скачать приложение</button>
  </div>

  <!-- @todo: сделать видео, поверх него png мокап с айфоном -->
  <div class="app__phone w-8/12 ml-auto mr-auto md:w-2/5 h-auto">
    <div class="app__border">
       <video
          class="app__video md:max-h-70v md:ml-auto"
          autoplay loop muted playsinline
          src="<?= $section->video()->toFile()->url() ?>">
      </video>
    </div>

  </div>

  <button
    x-data
    @click="$dispatch('modal:open')"
    class="bg-primary font-semibold text-button-mobile px-72 mt-30 md:py-30 lg:px-60 lg:py-30 lg:hidden md:w-3/5 lg:w-auto block py-24 ml-auto mr-auto text-white rounded-lg">Скачать</button>
</section>
