<section
  x-data="{ current: 0 }"
  class="dishes mb-60 lg:mb-324 relative">
  <p class="title text-h2-mobile md:mb-30 md:text-h2-tabl lg:text-h2-desk mb-24 font-semibold text-center">
    <?= kti($section->headline()) ?>
  </p>

  <div
    class="switcher -ml-18 -mr-18 pl-18 mb-36 md:-ml-42 md:-mr-42 md:pl-42 lg:ml-0 lg:mr-0 lg:pl-0 lg:mb-50 lg:block lg:pb-30 flex justify-center text-center">
    <?php $i = -1; foreach($section->items()->toStructure() as $item): ++$i ?>
      <button
        class="whitespace-nowrap py-18 font-semibold text-button-mobile md:px-42 md:py-24 md:text-text px-24 mb-12 mr-6 rounded-xl"
        :class="current == <?= $i ?> ? 'bg-primary text-white pointer-events-none' : 'bg-gray text-black'"
        @click.prevent="current = <?= $i ?>">
      <?= kti($item->headline()) ?>
      </button>
    <?php endforeach ?>
  </div>

  <div class="relative">
    <?php $i = -1; foreach($section->items()->toStructure() as $item): ++$i ?>
      <div :class="{
        'opacity-100': current === <?= $i ?>,
        'opacity-0': current !== <?= $i ?>,
      }" class="<?= e($i === 0, 'relative', 'absolute left-0 top-0 w-full') ?> transition duration-700">
        <div x-data="parallaxScroll()" class="lg:flex-nowrap flex flex-wrap justify-between">
          <?php $y = -1; foreach($item->dishes()->toStructure() as $dish): ++$y ?>
            <div class="lg:mr-12 lg:pr-0 w-1/2 pb-6 md:pb-18 md:pr-18 pr-6 md:rounded-lg rounded-sm overflow-hidden <?= e($y % 2, 'mt-66 lg:mt-120') ?> <?= e($y == 0, 'lg:mt-0') ?> <?= e($y ==2, '-mt-66 lg:mt-0') ?><?= e($y == 3, '-mt-0 lg:mt-0') ?>">
            <div class="relative">
              <div
                data-ratio
                style="padding-bottom: <?= ratio($dish->img()->toFile()->resize(600)) ?>">
                <img
                  class="lazyload dishes-card__image w-full"
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  data-src="<?= $dish->img()->toFile()->resize(600)->url() ?>" alt="<?= kti($dish->headline()) ?>">
              </div>
              <div class="dishes-card__text font-semibold text-xxs bottom-18 md:bottom-24 left-1/2 absolute w-full px-12 text-center text-white transform -translate-x-1/2"><?= kti($dish->headline()) ?></div>
            </div>
            </div>
          <?php endforeach ?>
        </div>
      </div>
    <?php endforeach ?>
  </div>
</section>
