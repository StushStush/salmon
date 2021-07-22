import Alpine from "alpinejs";
import { gsap } from "gsap";

let $videos;
let videosCount;
let $loaders;
let currentIndex;
const r = 2 * Math.PI * 10;

export default Alpine.data("videoSlideshow", () => ({
  currentVideo: 0,
  handleClick() {
    const id = Number(this.$el.dataset.id);

    if (this.currentVideo === id) return;

    $videos[this.currentVideo].pause();
    $videos[this.currentVideo].currentTime = 0;

    this.currentVideo = id;
    currentIndex = id;

    $videos[this.currentVideo].play();
  },
  init() {
    $videos = this.$el.querySelectorAll("video");
    videosCount = $videos.length;
    $loaders = this.$el.querySelectorAll("svg circle");

    currentIndex = this.currentVideo;

    gsap.set($loaders, {
      strokeDasharray: r,
      opacity: 0,
    });

    $videos.forEach((video) => {
      const anima = (ev) => {
        gsap.set($loaders[this.currentVideo], { opacity: 1 });
        gsap.fromTo($loaders[this.currentVideo], {
          strokeDashoffset: r
        }, {
          ease: "none",
          duration: ev.target.duration,
          strokeDashoffset: 0,
        });
      }

      video.addEventListener("playing", anima);
      video.addEventListener("ended", () => {
        currentIndex++;
        this.currentVideo = currentIndex % videosCount;

        $videos[this.currentVideo].play();
      });

      video.muted = !video.muted;
      $videos[this.currentVideo].play();
    });
  },
}));
