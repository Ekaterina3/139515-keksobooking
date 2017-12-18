'use strict';

(function () {
  window.map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var featureListItems = cardElement.querySelectorAll('.feature');

  window.card = {
    fillFeatures: function (pinData) {
      for (var i = 0; i < featureListItems.length; i++) {
        featureListItems[i].classList.add('hidden');
      }

      for (var j = 0; j < pinData.offer.features.length; j++) {
        cardElement.querySelector('.feature--' + pinData.offer.features[j]).classList.remove('hidden');
      }
    },

    renderCard: function (pinData) {
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
      window.card.fillFeatures(pinData);
    }
  };

  window.map.insertBefore(cardElement, document.querySelector('map__filters-container'));
})();
