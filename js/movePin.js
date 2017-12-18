'use strict';

(function () {
  var getStartCoords = function (evt) {
    return {
      x: evt.pageX,
      y: evt.pageY
    };
  };

  var getMainPinPosition = function (moveEvt, coords) {
    var shift = {
      x: coords.x - moveEvt.pageX,
      y: coords.y - moveEvt.pageY
    };

    var pinHeight = 62;
    var pickHeight = 16;

    var newPosition = {
      x: window.mainPin.offsetLeft - shift.x,
      y: window.mainPin.offsetTop - shift.y
    };

    var pickCoords = {
      x: newPosition.x,
      y: newPosition.y + pinHeight / 2 + pickHeight
    };

    var topEdge = 100 - pinHeight / 2 - pickHeight;
    var bottomEdge = 500 - pinHeight / 2 - pickHeight;

    if (newPosition.y < topEdge) {
      newPosition.y = topEdge;
    } else if (newPosition.y > bottomEdge) {
      newPosition.y = bottomEdge;
    }

    window.mainPin.style.top = newPosition.y + 'px';
    window.mainPin.style.left = newPosition.x + 'px';

    var address = document.querySelector('#address');
    address.value = pickCoords.x + ', ' + pickCoords.y;
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = getStartCoords(event);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getMainPinPosition(event, startCoords);
      startCoords = getStartCoords(event);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseUp', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPin.addEventListener('mousedown', onMainPinMouseDown);
})();
