import Alpine from "alpinejs";
import { gsap } from "gsap";

Alpine.data("mapSelector", () => ({
  init() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.selectedCity = this.citiesArray[0];
        const $firstButton = this.$el.querySelector(".map__button");

        gsap.set("[data-mapSelect-bg]", {
          x: $firstButton.offsetLeft,
          width: $firstButton.offsetWidth,
        });
      })
    })
  },
  select() {
    this.selectedCity = this.citiesArray.find(
      (u) => u.id === Number(this.$el.dataset.id)
    );
    gsap.to("[data-mapSelect-bg]", {
      ease: 'power4.inOut',
      x: this.$el.offsetLeft,
      width: this.$el.offsetWidth,
    });
  },
  selectedCity: null,
  citiesArray: [],
}));
