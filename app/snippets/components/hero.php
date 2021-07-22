<section class="header m:h-screen mb-162 m:mb-162 mt:md-204 m:flex-nowrap flex flex-wrap text-black">
  <div class=" mb-78 m:text-left m:w-1/2 m:mr-126 m:flex m:flex-col m:justify-between 3xl:w-1/3 xl:w-2/5 text-center">

    <svg class="md:h-60 md:w-186 h-42 w-120 md:mt-60 m:ml-0 flex-shrink-0 ml-auto mr-auto" viewBox="0 0 187 60">
      <use xlink:href='assets/static/sprite.svg#logo-icon'/>
    </svg>

    <div class="header__description">
      <div class="m:mb-60 mt-42">
        <h1 class="text-h1-mobile md:text-h1-tabl m:text-h1-desk m:mb-30 sm:mr-auto sm:ml-auto sm:w-9/12 m:w-auto mb-24 font-semibold">
          <?= kti($section->headline()) ?>
        </h1>
        <p class="m:mb-66 text-text-s md:text-text sm:w-2/3 sm:mr-auto sm:ml-auto m:w-auto">
          <?= kti($section->caption()) ?>
        </p>
      </div>
      <button
        x-data
        @click="$dispatch('modal:open')"
        class="bottom-18 bg-primary font-semibold hover:shadow-xl left-1/2 md:px-66 md:py-30 md:static md:translate-x-0 m:block m:text-text rounded-xl fixed z-40 hidden px-48 py-24 text-white transform -translate-x-1/2 shadow-lg">
        Скачать приложение
      </button>
    </div>
  </div>

  <div class="m:w-1/2 xl:ml-auto w-full">
    <div
      x-cloak
      x-data="videoSlideshow"
      class="header_video bg-primary m:min-h-90v m:max-h-105v transform-gpu rounded-s md:rounded-lg overflow-hidden">
      <div class="m:pt-30 absolute inset-x-0 top-0 z-20 flex justify-center pt-24 space-x-12">
        <?php $i = -1; foreach($section->hero_videos()->toStructure() as $video): ++$i ?>
        <div class="group flex items-center cursor-pointer" @click="handleClick" data-id="<?= $i ?>">
            <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" :class="currentVideo !== <?= $i ?> ? 'opacity-0' : ''">
              <circle cx="12" cy="12" r="10" stroke="white" stroke-width="3" stroke-linecap="round" fill="transparent" class="transform-gpu" /></circle>
            </svg>
            <div
              :class="currentVideo === <?= $i ?> ? '' : 'opacity-25 group-hover:opacity-50'"
              class="text-button-mobile md:text-h3-desk ml-12 font-semibold text-white transition-opacity"><?= $video->label() ?></div>
          </div>
        <?php endforeach ?>
      </div>

      <?php $i = -1; foreach($section->hero_videos()->toStructure() as $video): ++$i ?>
        <div :class="currentVideo === <?= $i ?> ? null : 'opacity-0'" class="l-0 absolute top-0 z-10 object-cover w-full h-full transition-opacity">
          <video
            class="lazyload object-cover w-full h-full"
            preload="none"
            data-autoplay
            playsinline
            src="<?= $video->src()->toFile()->url() ?>"
            type="video/mp4">
          </video>
        </div>
      <?php endforeach ?>

    </div>

    <button
      x-data
      @click="$dispatch('modal:open')"
      class="bottom-18 bg-primary text-button-mobile mt-18 md:text-text md:px-60 md:py-30 m:hidden m:static m:translate-x-0 rounded-xl sticky z-40 block px-48 py-24 ml-auto mr-auto font-semibold text-white shadow-lg">
      Скачать приложение
    </button>
  </div>
</section>
