'use strict';

var ESCAPE_KEYCODE = 27;

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var COUNT = 8;
var AVATARS = [];

var offers = [];

var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var cardElement = cardTemplate.cloneNode(true);
var featureListItems = cardElement.querySelectorAll('.feature');

for (var i = 1; i <= COUNT; i++) {
  AVATARS.push('img/avatars/user0' + i + '.png');
}

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getUniqueRandomValue = function (array) {
  var newArray = array;
  var index = Math.floor(Math.random() * newArray.length);
  var value = newArray[index];

  newArray.splice(index, 1);
  return value;
};

var getRandomNumber = function (startNumber, endNumber) {
  return Math.floor(Math.random() * endNumber) + startNumber;
};

var getRandomArray = function (array) {
  var randomArray = array;
  for (i = randomArray.length - 1; i > 0; i--) {
    var index = getRandomIndex(randomArray);
    var value = randomArray[index];
    randomArray[index] = randomArray[i];
    randomArray[i] = value;
  }
  return randomArray.slice(getRandomIndex(randomArray));
};

var createObject = function () {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  return {
    author: {
      avatar: getUniqueRandomValue(AVATARS),
    },
    offer: {
      title: getUniqueRandomValue(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1000, 1000000),
      type: TYPES[getRandomIndex(TYPES)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: CHECKINS[getRandomIndex(CHECKINS)],
      checkout: CHECKOUTS[getRandomIndex(CHECKOUTS)],
      features: getRandomArray(FEATURES),
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
  offers.push(createObject());
}

var renderPin = function (pinData) {
  var pinElement = pinsTemplate.cloneNode(true);

  pinElement.style.left = pinData.location.x + 20 + 'px';
  pinElement.style.top = pinData.location.y + 62 + 'px';
  pinElement.querySelector('img').src = pinData.author.avatar;

  return pinElement;
};

var renderAllPins = function () {
  var fragment = document.createDocumentFragment();

  for (i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  return fragment;
};

var fillFeatures = function (pinData) {
  for (i = 0; i < featureListItems.length; i++) {
    featureListItems[i].classList.add('hidden');
  }

  for (var j = 0; j < pinData.offer.features.length; j++) {
    cardElement.querySelector('.feature--' + pinData.offer.features[j]).classList.remove('hidden');
  }
};

var renderCard = function (pinData) {
  cardElement.querySelector('.map__card h3').textContent = pinData.offer.title;
  cardElement.querySelector('.map__card p small').textContent = pinData.offer.address;
  cardElement.querySelector('.popup__price').textContent = pinData.offer.price + ' ₽/ночь';

  var housingType;

  switch (pinData.offer.type) {
    case 'flat':
      housingType = 'Квартира';
      break;
    case 'house':
      housingType = 'Дом';
      break;
    case 'bungalo':
      housingType = 'Бунгало';
      break;
  }

  cardElement.querySelector('.map__card h4').textContent = housingType;

  var endForRooms = '';
  var endForGuests = '';

  var setEndForRooms = function (count) {
    var surplus = count % 10;

    if (surplus === 1) {
      endForRooms = (count === 11) ? 'комнат' : 'комната';
    } else if (surplus >= 5) {
      endForRooms = 'комнат';
    } else {
      endForRooms = (count >= 12 && count <= 14) ? 'комнат' : 'комнаты';
    }
  };

  var setEndForGuests = function (count) {
    var surplus = count % 10;

    switch (surplus) {
      case 1:
        endForGuests = (count === 11) ? 'гостей' : 'гостя';
        break;
      default:
        endForGuests = 'гостей';
        break;
    }
  };

  setEndForRooms(pinData.offer.rooms);
  setEndForGuests(pinData.offer.guests);

  cardElement.querySelector('.map__card h4 + p').textContent = pinData.offer.rooms + ' ' + endForRooms + ' для ' + pinData.offer.guests + ' ' + endForGuests;
  cardElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  cardElement.querySelector('.map__card ul + p').textContent = pinData.offer.description;
  cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
  fillFeatures(pinData);
};

pins.appendChild(renderAllPins(offers));
renderCard(offers[0]);
map.insertBefore(cardElement, document.querySelector('map__filters-container'));

var mainPin = map.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var popup = document.querySelector('.popup');
var popupClose = document.querySelector('.popup__close');

var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');

noticeFormFieldsets.forEach(function (elem) {
  elem.disabled = true;
});

var hideElement = function (elem) {
  elem.classList.add('hidden');
};

var showElement = function (elem) {
  elem.classList.remove('hidden');
};

var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

mapPins.forEach(function (elem) {
  hideElement(elem);
});

var activePin;

var changeActivePins = function (elem) {
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  if (elem) {
    elem.classList.add('map__pin--active');
  }

  activePin = elem;
};

hideElement(popup);

var onPopupEscape = function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    closePopup();
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = false;
  });

  mapPins.forEach(function (elem, index) {
    showElement(elem);

    elem.addEventListener('click', function () {
      changeActivePins(elem);
      showElement(popup);
      renderCard(offers[index]);
      document.addEventListener('keydown', onPopupEscape);
    });
  });
};

mainPin.addEventListener('mouseup', activateMap);

var closePopup = function () {
  hideElement(popup);
  changeActivePins();

  document.removeEventListener('keydown', onPopupEscape);
};
popupClose.addEventListener('click', closePopup);
