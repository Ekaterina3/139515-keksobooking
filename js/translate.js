'use strict';

(function () {
  var ROOMS_WORD_FORM = ['комнат', 'комната', 'комнаты'];
  var GUESTS_WORD_FORM = ['гостей', 'гостя'];
  var TYPE_VALUES = ['flat', 'bungalo', 'house', 'palace'];
  var TYPE_VALUES_RUS = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];

  window.translate = {
    translateRooms: function (count) {
      var surplus = count % 10;

      if (surplus === 1) {
        return (count === 11) ? ROOMS_WORD_FORM[0] : ROOMS_WORD_FORM[1];
      } else if (surplus >= 5) {
        return ROOMS_WORD_FORM[0];
      } else {
        return (count >= 12 && count <= 14) ? ROOMS_WORD_FORM[0] : ROOMS_WORD_FORM[2];
      }
    },

    translateGuests: function (count) {
      var surplus = count % 10;

      switch (surplus) {
        case 1:
          return (count === 11) ? GUESTS_WORD_FORM[0] : GUESTS_WORD_FORM[1];
        default:
          return GUESTS_WORD_FORM[0];
      }
    },

    translateOfferType: function (type) {
      return TYPE_VALUES_RUS[TYPE_VALUES.indexOf(type)];
    }
  };
})();
