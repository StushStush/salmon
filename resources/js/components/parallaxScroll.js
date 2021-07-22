import Alpine from "alpinejs";
import { gsap } from "gsap";
import isMobile from "@utils/isMobile";

Alpine.data("parallaxScroll", () => ({
  init() {
    const tween = gsap.timeline({ paused: true });
    let yOffset = 0;
    let delta = 0;
    
    tween.to(this.$el.children, {
      y(index, target, targets) {
        delta = isMobile
          ? index % 2
            ? targets[0].offsetTop - targets[1].offsetTop
            : null
          : !(index % 2)
            ? (targets[1].offsetTop - targets[0].offsetTop) * 2
            : null;
        return isMobile? delta * 2 : delta;
      },
    });
    
    gsap.ticker.add(() => {
      const sectionBounds = {
        height: this.$el.parentNode.parentNode.offsetHeight,
        offsetTop: this.$el.parentNode.parentNode.parentNode.offsetTop,
      };
      
      const fixScroll = isMobile? 0 : (sectionBounds.height / 2)

      const remapYOffset = gsap.utils.mapRange(
        sectionBounds.offsetTop,
        sectionBounds.offsetTop + sectionBounds.height + delta,
        0,
        sectionBounds.height + delta,
        window.__viewport.scrollCenter - fixScroll
      );

      yOffset = gsap.utils.interpolate(yOffset, remapYOffset, 0.25);
      const p = gsap.utils.normalize(0, sectionBounds.height, yOffset);

      tween.progress(p);
    });
    
  },

  
}));
