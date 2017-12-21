'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');

  window.showCard = {
    show: function () {
      window.helpers.showElement(popup);
      popupClose.addEventListener('click', window.showCard.closePopup);
    },

    onPopupEscape: function (evt) {
      if (evt.keyCode === ESCAPE_KEYCODE) {
        window.showCard.closePopup();
      }
    },

    closePopup: function () {
      window.helpers.hideElement(popup);
      window.pin.changeActivePins();
      window.card.renderCard(null);
      document.removeEventListener('keydown', window.showCard.onPopupEscape);
      popupClose.removeEventListener('click', window.showCard.closePopup);
    }
  };

  window.helpers.hideElement(popup);
})();
