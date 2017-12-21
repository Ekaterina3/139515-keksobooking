'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  window.window.mainPin = window.map.querySelector('.map__pin--main');

  var renderAllPins = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.pin.renderPin(data[i]));
    }
    window.map.appendChild(fragment);
  };

  var successHandler = function (data) {
    var activateMap = function () {
      window.map.classList.remove('map--faded');
      renderAllPins(data);
      noticeForm.classList.remove('notice__form--disabled');
      noticeFormFieldsets.forEach(function (elem) {
        elem.disabled = false;
      });
      window.synchronizeFormFields();

      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      mapPins.forEach(function (elem, index) {
        elem.addEventListener('click', function () {
          window.pin.changeActivePins(elem);
          window.card.renderCard(data[index]);
          window.showCard.show(window.popup);
          document.addEventListener('keydown', window.showCard.onPopupEscape);
        });
      });
    };

    window.mainPin.addEventListener('mouseup', activateMap);
  };

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  window.backend.load(successHandler, window.backend.errorHandler);

})();
