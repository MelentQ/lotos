import * as bodyScrollLock from "body-scroll-lock";

export default function openVideoModals() {
  const videoButtons = Array.from(document.querySelectorAll('.js-video-modal-container'));
  videoButtons.forEach(container => {
    const openBtn = container.querySelector('.js-open-modal');
    const modal = container.querySelector('.js-video-modal');
    const modalIframe = container.querySelector('.js-iframe');
    const closeBtn = container.querySelector('.js-close-modal');
    const code = container.querySelector('.js-video-code').textContent;

    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modalIframe.src = `https://www.youtube.com/embed/${code}?autoplay=1&rel=0`
      modal.classList.add('active');
      bodyScrollLock.disableBodyScroll(modal);
    })

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modalIframe.src = "";
      bodyScrollLock.enableBodyScroll(modal);
    })
  })
}