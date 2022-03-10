import {Swiper, EffectFade, Thumbs} from "swiper";
import * as bodyScrollLock from "body-scroll-lock";

Swiper.use([EffectFade, Thumbs]);

export default function initGallery() {
  const containers = Array.from(document.querySelectorAll('.custom-gallery'));
  containers.forEach(container => {
    const thumbs = new Swiper(container.querySelector('.custom-gallery__thumbs-slider'), {
      spaceBetween: 40,
      slidesPerView: 3,
      direction: "vertical"
    });

    const fadeSlider = new Swiper(container.querySelector('.custom-gallery__full-image-slider'), {
      slidesPerView: 1,
      direction: "vertical",
      spaceBetween: 40, 
      thumbs: {
        swiper: thumbs
      }
    })

    const closeButton = container.querySelector('.custom-gallery__close');

    closeButton.addEventListener('click', () => {
      container.classList.remove('active');
      bodyScrollLock.enableBodyScroll(container);
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
          container.classList.remove("active");
          bodyScrollLock.enableBodyScroll(container);
        }
      }
    );

    const parent = container.closest('.certificates');
    const items = Array.from(parent.querySelectorAll('.certificates__slide'));
    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        fadeSlider.slideTo(i);
        container.classList.add("active");
        bodyScrollLock.disableBodyScroll(container);
      })
    })
  });
}