'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var featureListItems = cardElement.querySelectorAll('.feature');

  var addPictures = function (element, object) {
    var item;
    var picture;
    var picturesList = element.querySelector('.popup__pictures');
    picturesList.innerHTML = '';

    for (var i = 0; i < object.offer.photos.length; i++) {
      item = document.createElement('li');
      picture = document.createElement('img');
      picture.src = object.offer.photos[i];

      picturesList.appendChild(item);
      item.appendChild(picture);
    }
  };

  map.insertBefore(cardElement, document.querySelector('map__filters-container'));

  window.card = {
    fillFeatures: function (pinData) {
      for (var i = 0; i < featureListItems.length; i++) {
        window.helpers.hideElement(featureListItems[i]);
      }

      for (var j = 0; j < pinData.offer.features.length; j++) {
        cardElement.querySelector('.feature--' + pinData.offer.features[j]).classList.remove('hidden');
      }
    },

    renderCard: function (pinData) {
      if (pinData !== null) {
        cardElement.querySelector('.map__card h3').textContent = pinData.offer.title;
        cardElement.querySelector('.map__card p small').textContent = pinData.offer.address;
        cardElement.querySelector('.popup__price').textContent = pinData.offer.price + ' ₽/ночь';
        cardElement.querySelector('.map__card h4').textContent = pinData.offer.type.title;

        var endForRooms = window.translate.translateRooms(pinData.offer.rooms);
        var endForGuests = window.translate.translateGuests(pinData.offer.guests);

        cardElement.querySelector('.map__card h4 + p').textContent = pinData.offer.rooms + ' ' + endForRooms + ' для ' + pinData.offer.guests + ' ' + endForGuests;
        cardElement.querySelector('.map__card p:nth-of-type(4)').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
        cardElement.querySelector('.map__card ul + p').textContent = pinData.offer.description;
        cardElement.querySelector('.popup__avatar').src = pinData.author.avatar;
        addPictures(cardElement, pinData);
        this.fillFeatures(pinData);
      }
    }
  };
})();
