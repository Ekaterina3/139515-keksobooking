'use strict';

(function () {
  window.helpers = {

    hideElement: function (elem) {
      elem.classList.add('hidden');
    },

    showElement: function (elem) {
      elem.classList.remove('hidden');
    }
  };
})();
