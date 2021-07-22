import Alpine from 'alpinejs'
import 'lazysizes'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks'
import 'imask'

import { gsap } from 'gsap'
import isMobile from '@utils/isMobile'
import ready from '@utils/ready'

import '@components/mapSelector'
import '@components/osCta'

import '@components/animateModal'
import '@components/parallaxScroll'
import '@components/submitForm'
import '@components/map'
import '@components/videoSlideshow'
import '@utils/phoneMask'

import Sketch from '@model/module'

window.Alpine = Alpine

window.__viewport = {
  vh: 0,
  vw: 0,
  center: 0,
  scroll: 0,
  scrollCenter: 0,
}

window.__isMobile = isMobile

gsap.ticker.add(() => {
  window.__viewport.vh = window.innerHeight
  window.__viewport.vw = window.innerWidth
  window.__viewport.center = isMobile ? (window.__viewport.vh / 12) : (window.__viewport.vh / 2)
  window.__viewport.scroll = window.pageYOffset
  window.__viewport.scrollCenter = window.__viewport.scroll + window.__viewport.center
  window.__viewport.scrollBottom = window.__viewport.scroll + window.__viewport.vh
})

new Sketch({ dom: document.getElementById('container') })


function raf() {
  window.requestAnimationFrame(raf)
}

raf()


Alpine.start()
