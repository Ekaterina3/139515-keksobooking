'use strict';

(function () {
  var TIME_VALUES = ['12:00', '13:00', '14:00'];
  var TYPE_VALUES = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_PRICE_VALUES = [1000, 0, 5000, 10000];
  var ROOMS = ['1', '2', '3', '100'];
  var GUESTS = ['1', '2', '3', '0'];

  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var houseType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var submit = noticeForm.querySelector('.form__submit');
  var inputs = noticeForm.querySelectorAll('input');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var OnTimeInChange = function () {
    window.synchronizeFields(timeIn, timeOut, TIME_VALUES, TIME_VALUES, syncValues);
  };

  var onTimeOutChange = function () {
    window.synchronizeFields(timeOut, timeIn, TIME_VALUES, TIME_VALUES, syncValues);
  };

  var OnHouseTypeChange = function () {
    window.synchronizeFields(houseType, price, TYPE_VALUES, MIN_PRICE_VALUES, syncValueWithMin);
  };

  var getCapacity = function () {
    var capacityValue;
    var option = roomNumber.options[roomNumber.selectedIndex];
    var selectedValue = option.value;


    for (var i = 0; i < roomNumber.options.length; i++) {
      capacityValue = capacity.options[i].value;
      capacity.options[i].disabled = true;

      if (selectedValue === '100' && capacityValue === '0') {
        capacity.options[3].disabled = false;
      } else if (capacityValue <= selectedValue && capacityValue > 0 && selectedValue !== '100') {
        capacity.options[i].disabled = false;
      }
    }
  };

  var onRoomNumberChange = function () {
    window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, syncValues);
    getCapacity();
  };

  var resetForm = function () {
    noticeForm.reset();
    capacity.value = '1';
  };

  var checkValidity = function () {
    var input;
    var errorsNumber = 0;

    for (var i = 0; i < inputs.length; i++) {
      input = inputs[i];
      if (input.checkValidity() === false) {
        input.style.borderColor = 'red';
        errorsNumber++;
      } else {
        input.style.borderColor = '#d9d9d3';
      }
    }

    if (errorsNumber === 0) {
      window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorHandler);
    }
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    checkValidity();
  };

  window.synchronizeFormFields = function () {
    window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, syncValues);
    window.synchronizeFields(timeOut, timeIn, TIME_VALUES, TIME_VALUES, syncValues);
    window.synchronizeFields(houseType, price, TYPE_VALUES, MIN_PRICE_VALUES, syncValueWithMin);
    window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, syncValues);
    getCapacity();
  };

  timeIn.addEventListener('change', OnTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  houseType.addEventListener('change', OnHouseTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
  getCapacity();
  submit.addEventListener('click', onSubmitClick);
})();
