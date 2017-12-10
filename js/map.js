'use strict';

var OFFERS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERS_TYPES = ['flat', 'house', 'bungalo'];
var OFFERS_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFERS_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFERS_COUNT = 8;
var AVATARS = [];

var offers = [];

var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var cardElement = cardTemplate.cloneNode(true);
var featureListItems = cardElement.querySelectorAll('.feature');

for (var i = 1; i <= OFFERS_COUNT; i++) {
  AVATARS.push('img/avatars/user0' + i + '.png');
}

var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getUniqueRandomValue = function (array) {
  var index = Math.floor(Math.random() * array.length);
  var value = array[index];

  array.splice(index, 1);
  return value;
};

var getRandomNumber = function (startNumber, endNumber) {
  return Math.floor(Math.random() * endNumber) + startNumber;
};

var getRandomArray = function (array) {
  var count = getRandomNumber(1, array.length);
  var randomArray = [];

  for (var j = 1; j <= count; j++) {
    randomArray.push(getRandomArrayValue(array));
  }

  return randomArray;
};

var createObject = function () {
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(300, 900);

  return {
    author: {
      avatar: getUniqueRandomValue(AVATARS),
    },
    offer: {
      title: getUniqueRandomValue(OFFERS_TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(1000, 1000000),
      type: getRandomArrayValue(OFFERS_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayValue(OFFERS_CHECKIN),
      checkout: getRandomArrayValue(OFFERS_CHECKOUT),
      features: getRandomArray(OFFERS_FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

for (i = 1; i <= OFFERS_COUNT; i++) {
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

  switch (pinData.offer.rooms) {
    case 1:
      endForRooms = 'комната';
      break;
    case 5:
      endForRooms = 'комнат';
      break;
    default:
      endForRooms = 'комнаты';
      break;
  }

  switch (pinData.offer.guests) {
    case 1:
      endForGuests = 'гостя';
      break;
    default:
      endForGuests = 'гостей';
      break;
  }

  cardElement.querySelector('.map__card h4 + p').textContent = pinData.offer.rooms + ' ' + endForRooms + ' для ' + pinData.offer.guests + ' ' + endForGuests;
  cardElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  cardElement.querySelector('.map__card ul + p').textContent = pinData.offer.description;
  cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
  fillFeatures(pinData);
};

pins.appendChild(renderAllPins(offers));
renderCard(offers[0]);
map.insertBefore(cardElement, document.querySelector('map__filters-container'));


var ESCAPE_KEYCODE = 27;

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

var removeActivePins = function (elem) {
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
  if (elem !== undefined) {
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

  mapPins.forEach(function (elem, i) {
    showElement(elem);

    elem.addEventListener('click', function () {
      removeActivePins(this);
      showElement(popup);
      renderCard(offers[i]);
      document.addEventListener('keydown', onPopupEscape);
    });
  });
};

mainPin.addEventListener('mouseup', activateMap);

var closePopup = function () {
  hideElement(popup);
  removeActivePins();

  document.removeEventListener('keydown', onPopupEscape);
};
popupClose.addEventListener('click', closePopup);
