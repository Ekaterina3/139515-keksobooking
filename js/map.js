'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  window.window.mainPin = window.map.querySelector('.map__pin--main');

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.offers[i]));
    }
    return fragment;
  };

  var activateMap = function () {
    window.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });
    window.synchronizeFormFields();

    mapPins.forEach(function (elem, index) {
      window.showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.changeActivePins(elem);
        window.card.renderCard(window.offers[index]);
        window.showCard.show(window.popup);
        document.addEventListener('keydown', window.showCard.onPopupEscape);
      });
    });
  };

  window.map.appendChild(renderAllPins(window.offers));
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  mapPins.forEach(function (elem) {
    window.hideElement(elem);
  });

  window.mainPin.addEventListener('mouseup', activateMap);

})();
