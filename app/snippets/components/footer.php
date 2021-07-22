<footer class="footer bg-primary mb-18 px-18 py-66 md:mb-60 md:px-66 md:py-108 md:pt-78 md:pb-66 wd:mb-66 lg:px-66 lg:py-66 text-white rounded-s md:rounded-lg" id="footer">
  <div class="description md:mb-66 lg:w-full ml-auto mr-auto text-center">
    <p class="text-h2-mobile md:text-h2-tabl lg:text-h2-desk md:mb-30 mb-18 font-semibold">Скидка 20%<br> на <span class='italic'>первый заказ</span></p>
    <p class="text-text-s md:text-text md:px-0 md:w-3/5 md:mr-auto md:ml-auto lg:w-5/12 px-24 mb-24">Оставьте номер телефона, и мы пришлем вам ссылку на приложение вместе с промокодом.</p>
  </div>

  <form
      class="w-full"
      action="/" method="POST"
      x-data="submitForm"
      @submit.prevent="submitData"
    >
    <div class="input-form md:mb-66 xl:flex-nowrap flex flex-wrap mb-48" >
        <input
            x-model="phone"
            class="input_phone bg-primary rounded-xl text-button-mobile pl-36 md:text-text xl:text-h3-desk xl:mr-18 xl:mb-0 w-full py-24 mb-12 placeholder-white placeholder-opacity-50 border border-white border-opacity-50 appearance-none"
            id="input_phone"
            type="tel"
            x-bind:placeholder="placeholder"
            required
            maxlength="16">
          <button 
          type="submit"
          class="rounded-xl font-semibold text-primary lg:hover:shadow-xl text-button-mobile md:text-text md:px-126 md:py-30 xl:text-h3-desk xl:w-1/3 xl:py-48 w-full py-24 bg-white">Отправить</button>
    </div>
  </form>

  <div class="contacts md:flex-col text-text-s md:mb-66 xl:flex-nowrap xl:flex-row flex flex-col-reverse flex-wrap text-center">

  <?php foreach($section->contacts()->toStructure() as $contact): ?>
    <div class="xl:w-1/6 xl:mr-96 xl:text-left xl:flex xl:flex-wrap mb-48">
      <div class="mb-24"><?= kti($contact->title()) ?></div>

      <div class="xl:mt-auto">
        <div><?= kti($contact->name()) ?></div>
        <?= Html::email($contact->email(), null, ['class' => 'lg:hover:opacity-50 transition duration-300 font-semibold']) ?>
      </div>
    </div>
    <?php endforeach ?>

    <div class="xl:w-1/6 xl:ml-auto xl:flex xl:flex-wrap xl:justify-end xl:flex-col xl:text-right mb-48">
      <p class="mb-18">Заходите в гости</p>
      <div class="xl:ml-auto flex justify-center mt-auto">
        <?php if($section->vk()->isNotEmpty()): ?>
          <a href="<?= $section->vk() ?>" rel="noopener noreferrer" target="_blank" class="lg:hover:opacity-50 transition duration-300">
            <svg class="w-48 h-48 mr-6" viewBox="0 0 48 48">
              <use xlink:href='assets/static/sprite.svg#vk-icon'/>
            </svg>
          </a>
        <?php endif ?>
        <?php if($section->ig()->isNotEmpty()): ?>
          <a href="<?= $section->ig() ?>" rel="noopener noreferrer" target="_blank" class="lg:hover:opacity-50 transition duration-300">
            <svg class="w-48 h-48 mr-6" viewBox="0 0 48 48">
              <use xlink:href='assets/static/sprite.svg#insta-icon'/>
            </svg>
          </a>
        <?php endif ?>
        <?php if($section->fb()->isNotEmpty()): ?>
          <a href="<?= $section->fb() ?>" rel="noopener noreferrer" target="_blank" class="lg:hover:opacity-50 transition duration-300">
            <svg class="w-48 h-48" viewBox="0 0 48 48">
              <use xlink:href='assets/static/sprite.svg#facebook-icon'/>
            </svg>
          </a>
        <?php endif ?>
      </div>

    </div>
  </div>
  <div class="xl:flex xl:justify-between text-center">
    <p>© ООО «Много Лосося», <?= date('Y') ?></p>
    <p class="xl:text-right">Made in <a href="https://whiterussian.studio/" rel="noopener noreferrer" target="_blank" class="lg:hover:opacity-50">White Russian</a></p>
  </div>
</footer>
