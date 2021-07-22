<section class="map md:mb-102 mb-84 lg:px-108">
  <div class="map__description text-center">
    <h1 class="text-h2-mobile md:text-h2-tabl md:mb-30 mb-18 lg:text-h2-desk font-semibold">
      <?= kti($section->headline()) ?>
    </h1>
    <p class="text-text-s md:text-text md:mb-66 mr-auto ml-auto mb-48 sm:w-2/3 md:w-2/5 lg:1/2 2xl:w-1/3">
    <?= kti($section->caption()) ?>
    </p>
  </div>

    <?php
      $data = array_values($section->cities()->toStructure()->map(function ($city) {
        return [
          'title' => $city->title()->value(),
          'center_lat' => $city->center_lat()->value(),
          'center_lng' => $city->center_lng()->value(),
          'geojson' => $city->geojson() === null ? null : $city->geojson()->toFile()->url(),
        ];
      })->data());
    ?>

  <div class="map__plugin relative w-full rounded-s md:rounded-lg"
    x-cloak
    x-data="map()"
    data-cities='<?= json_encode($data) ?>'>

    <div class="map__wrap overflow-hidden">
      <div class="transform-gpu absolute inset-0 overflow-hidden rounded-lg">
        <div x-ref="mapContainer" class="w-full" style="height: 100%; height: calc(100% + 30px);"></div>
      </div>
    </div>

    <div class="map-button__wrapper lg:overflow-visible -ml-18 -mr-18 pl-18 pr-18 lg:ml-0 lg:mr-0 lg:pl-0 flex overflow-auto scrolling-auto pb-60">
    
      <div class="map-button__location rounded-full bg-white md:h-66 md:w-66 h-48 w-48 shadow-lg absolute top-18 right-18 md:top-24 md:right-24 flex justify-center items-center cursor-pointer" id="map-button__location"> 
          
          <svg class="h-30 w-30" viewBox="0 0 32 32">
            <use xlink:href='assets/static/sprite.svg#location-icon'/>
          </svg>
      </div>
      <div class="map-button__plus rounded-full bg-white md:h-66 md:w-66 h-48 w-48 shadow-lg absolute bottom-252 md:bottom-288 right-18 md:right-24 xl:bottom-168 flex justify-center items-center cursor-pointer" id="map-button__plus"> 
          <svg class="h-30 w-30" viewBox="0 0 32 32">
            <use xlink:href='assets/static/sprite.svg#plus-icon'/>
          </svg>
      </div>
      <div class="map-button__minus rounded-full bg-white md:h-66 md:w-66 h-48 w-48 shadow-lg absolute bottom-186 md:bottom-210 right-18 md:right-24 xl:bottom-84 flex justify-center items-center cursor-pointer" id="map-button__minus"> 
          <svg class="h-30 w-30" viewBox="0 0 32 32">
            <use xlink:href='assets/static/sprite.svg#minus-icon'/>
          </svg>
      </div>

      <div class="map__button bg-purple rounded-xl xl:bottom-114 xl:left-1/2 text-button-mobile md:text-text lg:w-max xl:absolute xl:transform xl:-translate-x-1/2 xl:mt-0 relative z-10 flex justify-between p-12 mt-24 ml-auto mr-auto shadow-xl">

        <div class="absolute top-0 left-0 h-full pt-12 pb-12" data-mapSelect-bg>
          <div class="text-purple w-full h-full bg-white rounded-full"></div>
        </div>

        <?php foreach($data as $city): ?>
          <button class="map__button font-semibold text-opacity-60 hover:text-opacity-100 py-18 md:py-24 md:px-42 relative px-24 text-white transition duration-500 rounded-lg"
            @click.prevent="select('<?= $city['title'] ?>')"
            :class="{ 'active-button_white' : selectedCity && (selectedCity.title === '<?= $city['title'] ?>') }">
          <?= $city['title'] ?>
          </button>
        <?php endforeach ?>
      </div>
    </div>

  </div>
</section>
