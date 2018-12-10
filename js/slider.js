'use strict';

(function () {


  var initSlider = function (moveAction, upAction) {

    var MIN_Y_COORD = 130;
    var MAX_Y_COORD = 630;

    var offerMap = document.querySelector('.map');
    var mapPinMain = offerMap.querySelector('.map__pin--main');

    var pinMouseDownHandler = function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var pinMouseMoveHandler = function (moveEvt) {
        var target = mapPinMain;
        var mapWidth = offerMap.offsetWidth;

        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y,
        };

        var endCoords = {
          x: target.offsetLeft + shift.x,
          y: target.offsetTop + shift.y,
        };

        if (endCoords.x < 0) {
          endCoords.x = 0;
        } else if (endCoords.x > mapWidth - target.offsetWidth) {
          endCoords.x = mapWidth - target.offsetWidth;
        } else if (endCoords.y < MIN_Y_COORD) {
          endCoords.y = MIN_Y_COORD;
        } else if (endCoords.y > MAX_Y_COORD) {
          endCoords.y = MAX_Y_COORD;
        }

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        moveAction(evt, endCoords.x, endCoords.y);
      };

      var pinMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        upAction();

        document.removeEventListener('mousemove', pinMouseMoveHandler);
        document.removeEventListener('mouseup', pinMouseUpHandler);
      };

      document.addEventListener('mousemove', pinMouseMoveHandler);
      document.addEventListener('mouseup', pinMouseUpHandler);
    };

    mapPinMain.addEventListener('mousedown', pinMouseDownHandler);
  };

  window.slider = {
    initSlider: initSlider,
  };


})();
