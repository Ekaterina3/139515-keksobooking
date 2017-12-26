'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var activePin;

  window.pin = {
    renderPin: function (pinData) {
      var pinElement = pinsTemplate.cloneNode(true);

      pinElement.style.left = pinData.location.x + 20 + 'px';
      pinElement.style.top = pinData.location.y + 62 + 'px';
      pinElement.querySelector('img').src = pinData.author.avatar;

      return pinElement;
    },
    changeActivePins: function (elem) {
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      if (elem) {
        elem.classList.add('map__pin--active');
      }
      activePin = elem;
    },
    removeAllPins: function (array) {
      array.forEach(function (elem) {
        map.removeChild(elem);
      });
    }
  };
})();
