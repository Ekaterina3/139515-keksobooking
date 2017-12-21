'use strict';

(function () {
  var ROOMS_WORD_FORM = ['комнат', 'комната', 'комнаты'];
  var GUESTS_WORD_FORM = ['гостей', 'гостя'];

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
    }
  };
})();
