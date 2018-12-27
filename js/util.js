'use strict';

(function () {


  var isEscEvent = function (evt, action) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
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

  var parseIntDec = function (number) {
    return parseInt(number, 10);
  };

  var findNotAny = function (elem) {
    return elem.value !== 'any';
  };

  var returnFilterTypeValue = function (elem) {
    return {type: elem.id, value: elem.value};
  };

  window.util = {
    isEscEvent: isEscEvent,
    getRandomArrayElement: getRandomArrayElement,
    getRandomInteger: getRandomInteger,
    parseIntDec: parseIntDec,
    toArray: toArray,
    findNotAny: findNotAny,
    returnFilterTypeValue: returnFilterTypeValue,
  };


})();
