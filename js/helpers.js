'use strict';

(function () {
  window.helpers = {

    getRandomIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    getUniqueRandomValue: function (array) {
      var newArray = array;
      var index = Math.floor(Math.random() * newArray.length);
      var value = newArray[index];

      newArray.splice(index, 1);
      return value;
    },

    getRandomNumber: function (startNumber, endNumber) {
      return Math.floor(Math.random() * endNumber) + startNumber;
    },

    getRandomArray: function (array) {
      var randomArray = array;
      for (var j = randomArray.length - 1; j > 0; j--) {
        var index = window.helpers.getRandomIndex(randomArray);
        var value = randomArray[index];
        randomArray[index] = randomArray[j];
        randomArray[j] = value;
      }
      return randomArray.slice(window.helpers.getRandomIndex(randomArray));
    }
  };
})();
