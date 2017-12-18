'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  var noticeForm = document.querySelector('.notice__form');
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  window.window.mainPin = window.map.querySelector('.map__pin--main');

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.offers.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.offers[i]));
    }
    return fragment;
  };

  var hideElement = function (elem) {
    elem.classList.add('hidden');
  };

  var showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  var onPopupEscape = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      closePopup();
    }
  };

  var activateMap = function () {
    window.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    mapPins.forEach(function (elem, index) {
      showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.changeActivePins(elem);
        showElement(popup);
        window.card.renderCard(window.offers[index]);
        document.addEventListener('keydown', onPopupEscape);
      });
    });
  };

  var closePopup = function () {
    hideElement(popup);
    window.pin.changeActivePins();
    window.card.renderCard(window.offers[0]);
    document.removeEventListener('keydown', onPopupEscape);
  };

  window.map.appendChild(renderAllPins(window.offers));
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  mapPins.forEach(function (elem) {
    hideElement(elem);
  });

  hideElement(popup);

  window.mainPin.addEventListener('mouseup', activateMap);
  popupClose.addEventListener('click', closePopup);

})();
