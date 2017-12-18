'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var COUNT = 8;
  var AVATARS = [];

  window.offers = [];

  for (var i = 1; i <= COUNT; i++) {
    AVATARS.push('img/avatars/user0' + i + '.png');
  }

  var createObject = function () {
    var locationX = window.helpers.getRandomNumber(300, 900);
    var locationY = window.helpers.getRandomNumber(100, 500);

    return {
      author: {
        avatar: window.helpers.getUniqueRandomValue(AVATARS),
      },
      offer: {
        title: window.helpers.getUniqueRandomValue(TITLES),
        address: locationX + ', ' + locationY,
        price: window.helpers.getRandomNumber(1000, 1000000),
        type: TYPES[window.helpers.getRandomIndex(TYPES)],
        rooms: window.helpers.getRandomNumber(1, 5),
        guests: window.helpers.getRandomNumber(1, 5),
        checkin: CHECKINS[window.helpers.getRandomIndex(CHECKINS)],
        checkout: CHECKOUTS[window.helpers.getRandomIndex(CHECKOUTS)],
        features: window.helpers.getRandomArray(FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  for (i = 1; i <= COUNT; i++) {
    window.offers.push(createObject());
  }

})();
