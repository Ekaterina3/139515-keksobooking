'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  window.popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');

  window.hideElement = function (elem) {
    elem.classList.add('hidden');
  };

  window.showElement = function (elem) {
    elem.classList.remove('hidden');
  };

  window.showCard = {
    show: function () {
      window.showElement(window.popup);
      popupClose.addEventListener('click', window.showCard.closePopup);
    },

    onPopupEscape: function (evt) {
      if (evt.keyCode === ESCAPE_KEYCODE) {
        window.showCard.closePopup();
      }
    },

    closePopup: function () {
      window.hideElement(window.popup);
      window.pin.changeActivePins();
      window.card.renderCard(null);
      document.removeEventListener('keydown', window.showCard.onPopupEscape);
      popupClose.removeEventListener('click', window.showCard.closePopup);
    }
  };
  window.hideElement(window.popup);
})();
