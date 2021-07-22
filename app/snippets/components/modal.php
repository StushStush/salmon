<div
  x-cloak
  x-data="animateModal"
  x-show="active"
  @keyup.escape.window="close"
  @modal:open.window="open"
  @modal:close.window="close"
  class="modal md:p-66 p-18 fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">

  <div
    x-ref="bg"
    @resize.window.debounce=setSize
    class="bg-primary fixed z-0 block transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

  <button
    @click="close" class="modal_close rounded-xl text-primary md:h-66 md:w-66 md:p-24 md:right-66 right-18 md:top-66 top-18 p-18 absolute flex items-center w-48 h-48 bg-white">
        <svg class="h-18 w-18 md:h-24 md:w-24" viewBox="0 0 18 18">
          <use xlink:href='assets/static/sprite.svg#cross-icon'/>
        </svg>
  </button>

  <div x-data="osCta" class="modal__inner max-w-mobile-modal md:max-w-tablet-modal lg:max-w-screen-modal 2xl:max-w-bigScreen-modal relative">

  <form
      class="w-full"
      action="/" method="POST"
      x-data="submitForm"
      @submit.prevent="submitData">
    <div class="modal__inner-notios-notandroid" x-show="currentOs !== 'iOS' && currentOs !== 'Android' && !isMobile">
      <div class="text-h2-mobile mb-18 md:text-h2-tabl md:mb-24 lg:text-h2-desk lg:mb-64 lg:mb-66 font-semibold text-center text-white">
        <p class="">Скачайте приложение и получите скидку 20% <span class="italic">на первый заказ</span></p>
      </div>
      <input
      x-model="phone"
      x-bind:placeholder="placeholder"
      class="input_phone bg-primary rounded-xl text-text-s pl-36 md:text-h3-desk lg:mr-18 lg:py-48 lg:block w-full py-24 mb-12 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-50 appearance-none"
      type="tel"
      placeholder="Номер телефона"
      required
      maxlength="16"
      >
      <button
        type="submit"
        class="button__modal rounded-xl text-primary lg:block hover:shadow-xl text-button-mobile md:text-h3-desk md:px-126 md:py-30 md:text-s lg:text-h3-desk lg:py-48 w-full py-24 font-semibold bg-white">
        Отправить
      </button>
    </div>
  </form>

    <div class="modal__inner_iosorandroid" x-show="currentOs === 'iOS' || currentOs === 'Android'">
      <div class="text-h2-mobile mb-18 md:text-h2-tabl md:mb-24 lg:text-h2-desk lg:mb-64 lg:md-66 text-center text-white">
        <p class="pb-18 lg:block font-semibold">Клюнули!</p>
        <p class="lg: text-text-s mb-42 block">Скачайте приложение и получите скидку 20% на первый заказ</p>
      </div>
      <button class="button__modal rounded-xl text-primary lg: hover:shadow-xl text-button-mobile md:text-h3-desk md:px-126 md:py-30 md:text-s lg:text-h3-desk lg:py-48 block w-full py-24 font-semibold bg-white">
        <a href="<?= $site->appstore_link() ?>" rel="noopener noreferrer" target="_blank" x-show="currentOs === 'iOS'">Скачать в App Store</a>
        <a href="<?= $site->googlepay_link() ?>" rel="noopener noreferrer" target="_blank" x-show="currentOs === 'Android'">Скачать в Google Play</a>
      </button>

    </div>

    <div class="modal__inner_notiso-notmobile" x-show="currentOs !== 'iOS' && currentOs !== 'Android' && isMobile">
      <div class="text-h2-mobile mb-18 md:text-h2-tabl md:mb-24 lg:text-h2-desk lg:mb-64 lg:md-66 text-center text-white">
        <p class="pb-18 font-semibold">Клюнули!</p>
        <p class="text-text-s mb-42">Скачайте приложение и получите скидку 20% на первый заказ</p>
      </div>
      <form
      class="w-full"
      action="/" method="POST"
      x-data="submitForm"
      @submit.prevent="submitData">
        <input
        x-model="phone"
        x-bind:placeholder="placeholder"
        class="input__modal input_phone bg-primary rounded-xl text-text-s pl-36 md:text-h3-desk lg:mr-18 lg:py-48 w-full py-24 mb-12 text-white placeholder-white placeholder-opacity-50 border border-white border-opacity-50 appearance-none"
        type="tel"
        placeholder="Номер телефона"
        required
        maxlength="16">
        <button class="button__modal rounded-xl text-primary hover:shadow-xl text-button-mobile md:text-h3-desk md:px-126 md:py-30 md:text-s lg:text-h3-desk lg:py-48 w-full py-24 bg-white">
          Отправить
        </button>
      </form>
    </div>
  </div>
</div>
