import {Swiper, Autoplay, Grid} from "swiper";

Swiper.use([Autoplay, Grid]);

export default function initSliders() {
  if (document.documentElement.clientWidth <= 767) {
    initMobileTouchSliders()
  }
}

function initMobileTouchSliders() {
  const sliders = Array.from(document.querySelectorAll('.js-init-mobile-touch-slider'));
  sliders.forEach(slider => {
    const isGrid = slider.dataset.grid;
    
    let grid = {};

    if (isGrid) {
      grid = {
        rows: isGrid,
        fill: 'row'
      }
    }

    const autoplay = Number(slider.dataset.delay) ? {autoplay: {delay: slider.dataset.delay}} : {};

    const swiper = new Swiper(slider, {
      slidesPerView: Number(slider.dataset.slides) || 1,
      spaceBetween: Number(slider.dataset.space) || 10,
      grid,
      ...autoplay
    });
  })
}