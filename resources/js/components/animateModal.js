import Alpine from "alpinejs";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { gsap } from "gsap";

const getRadius = () =>
  Math.max(window.innerWidth, window.innerHeight) +
  Math.max(window.innerWidth, window.innerHeight) / 3;

let tween;

export default Alpine.data("animateModal", () => ({
  active: false,
  close() {
    window.dispatchEvent(new CustomEvent("modal:closed"));
    tween.reverse();
  },
  open() {
    window.dispatchEvent(new CustomEvent("modal:opened"));
    tween.play();
  },
  setSize() {
    const _this = this
    const r = getRadius()

    gsap.set(_this.$refs.bg, {
      width: r,
      height: r,
    });
  },
  init() {
    const _this = this

    _this.$nextTick(() => {
      _this.setSize()
    });

    tween = gsap.timeline({
      paused: true,
      reversed: true,
      onReverseComplete() {
        enablePageScroll();
        _this.active = false
      },
      onStart() {
        disablePageScroll();
        _this.active = true
      },
    });

    tween
      .from(_this.$refs.bg, {
        ease: "back.easeOut.config(1.7)",
        scale: 0,
        duration: 0.3,
      })
      .from(
        ".modal__inner",
        {
          ease: "sine.easeOut",
          duration: 0.3,
          opacity: 0,
          y: "50px",
          zIndex: "1000",
        },
        "-=0.1"
      )
      .from(
        ".modal_close",
        {
          ease: "back.easeOut.config(1.7)",
          duration: 0.3,
          opacity: 0,
          scale: 0.5,
        },
        "<"
      );
  },
}));
