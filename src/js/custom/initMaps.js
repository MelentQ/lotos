import * as bodyScrollLock from "body-scroll-lock";

export default function initMaps() {
  const maps = Array.from(document.querySelectorAll('.js-init-map'));
  if (maps) loadApi('yandex', 'https://api-maps.yandex.ru/2.1/?apikey=99155e03-fba1-47e8-8e51-62786c760fbc&lang=ru_RU',() => {ymaps.ready(init);});

  function init() {
    maps.forEach(map => {
      initMobileMap(map);

      const center = [map.dataset.initialLongitude, map.dataset.initialLatitude];

      const yMap = new ymaps.Map(map, {
        center,
        zoom: map.dataset.initialZoom,
        controls: []
      });

      const mapOverlay = document.createElement('div');
      mapOverlay.classList.add('contacts__map-overlay');
      const groundPane = map.querySelector('[class*="ymaps-2"][class*="-ground-pane"]');
      groundPane.parentNode.insertBefore(mapOverlay, groundPane);

      const mapCopyright = map.querySelector('[class*="ymaps-2"][class*="-copyrights-pane"]');
      mapCopyright.remove();
      
      _addPlace(yMap, {
        coords: [
          55.874062,
          49.220554
        ],
        image: map.dataset.image
      })
    })
  }

  function _addPlace(map, {coords, image}) {
    var layout = ymaps.templateLayoutFactory.createClass(`
      <div class="placemark">
        <img class="placemark__image" src="{{ properties.image }}">
        <span class="placemark__label">{{ properties.iconCaption }}</span>
      </div>
    `);

    const placemarkProperties = {
      image,
      iconCaption: "Россия, город Казань, Ул. Липатова 37, к.9"
    };

    const placemarkOptions = {
        iconLayout: layout,
        iconImageSize: [36, 36],
        iconImageOffset: [-18, -18]
    };

    const placemark = new ymaps.Placemark(coords, placemarkProperties, placemarkOptions);

    map.geoObjects.add(placemark);
  }

  function initMobileMap(map) {
    const wrapper = map.closest('.js-map-wrapper');
    console.log(wrapper);
    const modalWrapper = wrapper.querySelector('.contacts__map-wrapper');
    const openBtn = wrapper.querySelector('.js-open-map');
    const closeBtn = wrapper.querySelector('.js-close-map');

    console.log(openBtn);

    openBtn.addEventListener('click', () => {
      modalWrapper.classList.add('active');
      bodyScrollLock.disableBodyScroll(modalWrapper);
    })

    closeBtn.addEventListener('click', () => {
      modalWrapper.classList.remove('active');
      bodyScrollLock.enableBodyScroll(modalWrapper);
    })
  }
}

function loadApi(name, url, callback) {
  const apiLoaded = name + 'Loaded';
  if (!window[apiLoaded]) {
    const script = document.createElement('script');
    
    window[apiLoaded] = true;

    script.src = url;
    script.onload = callback;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  }
}