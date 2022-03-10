import {Swiper, Autoplay, Grid, Navigation} from "swiper";

Swiper.use([Autoplay, Grid, Navigation]);

export default function initSliders() {
  initCommonSliders();
  if (document.documentElement.clientWidth <= 767) {
    initMobileTouchSliders()
  }
}

function initCommonSliders() {
  const sliders = Array.from(document.querySelectorAll('.js-init-slider'));
  sliders.forEach(slider => {
    const autoplay = Number(slider.dataset.delay) ? {autoplay: {delay: slider.dataset.delay}} : {};

    const slidesPerView = Number(slider.dataset.slides);
    const spaceBetween = Number(slider.dataset.space);

    const navsSelector = slider.dataset.navs;

    let navigation;
    if (navsSelector) {
      const btnsContainer = document.querySelector(navsSelector);

      navigation = {
        navigation: {
          prevEl: btnsContainer.querySelector('.js-prev'),
          nextEl: btnsContainer.querySelector('.js-next')
        }
      }
    }

    let breakpoints = {
      320: {
        slidesPerView: 1.3,
        spaceBetween: spaceBetween / 2
      },
      576: {
        slidesPerView: slidesPerView < 2 ? slidesPerView : 2
      },
      1024: {
        slidesPerView,
        spaceBetween: spaceBetween
      }
    }

    const swiper = new Swiper(slider, {
      slidesPerView: slidesPerView || 1,
      spaceBetween: spaceBetween || 10,
      ...autoplay,
      ...navigation,
      breakpoints
    });
  })
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