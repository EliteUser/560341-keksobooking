'use strict';

(function () {


  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomInteger = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  };

  var toArray = function (list) {
    return Array.prototype.slice.call(list);
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    isEscEvent: isEscEvent,
    getRandomArrayElement: getRandomArrayElement,
    getRandomInteger: getRandomInteger,
    toArray: toArray,
  };


})();
