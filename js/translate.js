'use strict';

(function () {
  window.translate = {
    translateRooms: function (count) {
      var surplus = count % 10;

      if (surplus === 1) {
        return (count === 11) ? 'комнат' : 'комната';
      } else if (surplus >= 5) {
        return 'комнат';
      } else {
        return (count >= 12 && count <= 14) ? 'комнат' : 'комнаты';
      }
    },

    translateGuests: function (count) {
      var surplus = count % 10;

      switch (surplus) {
        case 1:
          return (count === 11) ? 'гостей' : 'гостя';
        default:
          return 'гостей';
      }
    }
  };
})();
