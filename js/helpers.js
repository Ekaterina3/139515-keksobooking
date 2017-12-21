'use strict';

(function () {
  window.helpers = {

    copyArray: function (array, newArray) {
      for (var i = 0; i < array.length; i++) {
        newArray.push(array[i]);
      }
    },

    getRandomIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    getUniqueRandomValue: function (array) {
      var index = window.helpers.getRandomIndex(array);
      var value = array[index];

      array.splice(index, 1);
      return value;
    },

    getRandomNumber: function (startNumber, endNumber) {
      return Math.floor(Math.random() * endNumber) + startNumber;
    },

    getRandomArray: function (array) {
      var randomArray = [];
      window.helpers.copyArray(array, randomArray);

      for (var j = randomArray.length - 1; j > 0; j--) {
        var index = window.helpers.getRandomIndex(randomArray);
        var value = randomArray[index];
        randomArray[index] = randomArray[j];
        randomArray[j] = value;
      }
      return randomArray.slice(window.helpers.getRandomIndex(randomArray));
    },

    hideElement: function (elem) {
      elem.classList.add('hidden');
    },

    showElement: function (elem) {
      elem.classList.remove('hidden');
    }
  };
})();
