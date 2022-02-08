export default function initMaps() {
  const maps = Array.from(document.querySelectorAll('.js-init-map'));
  if (maps) loadApi('yandex', 'https://api-maps.yandex.ru/2.1/?apikey=99155e03-fba1-47e8-8e51-62786c760fbc&lang=ru_RU',() => {
    ymaps.ready(init);
  });

  function init() {
    maps.forEach(map => {
      const yMap = new ymaps.Map(map, {
        center: [55.874062, 49.220554],
        zoom: 14,
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
        image: "../img/map-marker.svg"
      })
    })
  }

  function _addPlace(map, {coords, image}) {
    const placemarkProperties = {
      iconCaption: "Россия, город Казань, Ул. Липатова 37, к.9"
    };

    const placemarkOptions = {
        iconLayout: 'default#image',
        iconImageHref: image,
        iconImageSize: [36, 36],
        iconImageOffset: [-18, -18]
    };

    const placemark = new ymaps.Placemark(coords, placemarkProperties, placemarkOptions);

    console.log(placemark);

    map.geoObjects.add(placemark);
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