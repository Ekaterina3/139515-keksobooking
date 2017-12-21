'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var houseType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var submit = noticeForm.querySelector('.form__submit');
  var inputs = noticeForm.querySelectorAll('input');

  var selectTime = function (input1, input2) {
    for (var i = 0; i < input1.options.length; i++) {
      var option = input1.options[i];
      if (option.selected) {
        input2.options[i].selected = true;
      }
    }
  };

  var OnTimeInChange = function () {
    selectTime(timeIn, timeOut);
  };

  var onTimeOutChange = function () {
    selectTime(timeOut, timeIn);
  };

  var getMinPrice = function () {
    switch (houseType.value) {
      case 'flat':
        price.min = 1000;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'palace':
        price.min = 10000;
        break;
      case 'bungalo':
        price.min = 0;
        break;
    }
  };

  var OnHouseTypeChange = function () {
    getMinPrice();
  };

  var getCapacity = function () {
    var option = roomNumber.options[roomNumber.selectedIndex];

    switch (option.value) {
      case '1':
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        capacity.options[2].disabled = false;
        break;
      case '2':
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = false;
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        capacity.options[2].disabled = false;
        break;
      case '3':
        capacity.options[0].disabled = false;
        capacity.options[1].disabled = false;
        capacity.options[3].disabled = true;
        capacity.options[2].selected = true;
        capacity.options[2].disabled = false;
        break;
      case '100':
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[3].disabled = false;
        capacity.options[3].selected = true;
        capacity.options[2].disabled = true;
        break;
    }
  };

  var onRoomNumberChange = function () {
    getCapacity();
  };

  var checkValidity = function () {
    var errorsNumber = 0;

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.checkValidity() === false) {
        input.style.borderColor = 'red';
        errorsNumber++;
      } else {
        input.style.borderColor = '#d9d9d3';
      }
    }

    if (errorsNumber === 0) {
      noticeForm.submit();
    }
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    checkValidity();
  };

  timeIn.addEventListener('change', OnTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
  houseType.addEventListener('change', OnHouseTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
  getCapacity();

  submit.addEventListener('click', onSubmitClick);
})();
