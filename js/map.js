'use strict';

(function () {

  var PRICE_FROM = 10000;
  var PRICE_TO = 50000;
  var PIN_COUNT = 5;
  var DEFAULT_FILTER_VALUE = 'any';
  var FILTER_RANGES = ['low', 'middle', 'high'];

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var mainPin = map.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');
  var typeHousing = document.querySelector('#housing-type');
  var priceHousing = document.querySelector('#housing-price');
  var roomsHousing = document.querySelector('#housing-rooms');
  var guestsHousing = document.querySelector('#housing-guests');
  var featuresHousing = document.querySelectorAll('#housing-features input[type="checkbox"]');
  var popup = document.querySelector('.popup');
  var dataCopy = [];

  var renderAllPins = function (data) {
    var fragment = document.createDocumentFragment();
    var pinCount = data.length > PIN_COUNT ? PIN_COUNT : data.length;

    for (var i = 0; i < pinCount; i++) {
      fragment.appendChild(window.pin.renderPin(data[i]));
    }
    map.appendChild(fragment);
  };

  var successHandler = function (data) {
    dataCopy = data.slice();

    var activateMap = function () {
      map.classList.remove('map--faded');
      mainPin.removeEventListener('click', activateMap);

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
          window.helpers.showElement(popup);
          document.addEventListener('keydown', window.showCard.onPopupEscape);
        });
      });
    };

    mainPin.addEventListener('click', activateMap);
  };

  var updatePins = function () {
    var filteredData = dataCopy;
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.removeAllPins(mapPins);

    var selectFilter = function (control, type) {
      if (control.value !== DEFAULT_FILTER_VALUE) {
        filteredData = filteredData.filter(function (pinData) {
          return pinData.offer[type].toString() === control.value;
        });
      }
      return filteredData;
    };

    var rangeFilter = function (control) {
      filteredData = filteredData.filter(function (pinData) {
        switch (control.value) {
          case FILTER_RANGES[0]:
            return pinData.offer.price <= PRICE_FROM;
          case FILTER_RANGES[1]:
            return pinData.offer.price > PRICE_FROM && pinData.offer.price < PRICE_TO;
          case FILTER_RANGES[2]:
            return pinData.offer.price >= PRICE_TO;
          default:
            return true;
        }
      });
      return filteredData;
    };

    var checkboxFilter = function (controls) {
      controls.forEach(function (elem) {
        if (elem.checked) {
          filteredData = filteredData.filter(function (pinData) {
            return pinData.offer.features.indexOf(elem.value) !== -1;
          });
        }
      });
      return filteredData;
    };

    selectFilter(typeHousing, 'type');
    rangeFilter(priceHousing);
    selectFilter(roomsHousing, 'rooms');
    selectFilter(guestsHousing, 'guests');
    checkboxFilter(featuresHousing);
    renderAllPins(filteredData);

    var newPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    newPins.forEach(function (elem, index) {
      elem.addEventListener('click', function () {
        window.pin.changeActivePins(elem);
        window.card.renderCard(filteredData[index]);
        window.helpers.showElement(popup);
        document.addEventListener('keydown', window.showCard.onPopupEscape);
      });
    });
  };

  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  window.backend.load(successHandler, window.backend.errorHandler);

  filterForm.addEventListener('change', function () {
    window.debounce(updatePins);
  });

})();
