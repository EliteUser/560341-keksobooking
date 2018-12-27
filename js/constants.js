'use strict';

(function () {


  window.constants = {
    ESC_KEYCODE: 27,

    DOWNLOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',

    XHR: {
      TIMEOUT: 10000,
      STATUS_OK: 200,
    },

    /* Константы для генерации данных */

    OFFER: {
      QUANTITY: 8,
      TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
      MIN_PRICE: 1000,
      MAX_PRICE: 1000000,
      TYPES: ['Дворец', 'Квартира', 'Дом', 'Бунгало'],
      MAX_ROOMS: 5,
      MAX_GUESTS: 20,
      CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
      CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
      FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      MIN_X: 25,
      MAX_X: 1175,
      MIN_Y: 130,
      MAX_Y: 630,
    },

    DEBOUNCE_INTERVAL: 500,

    PIN: {
      WIDTH: 50,
      HEIGHT: 70,
    },

    MAIN_PIN: {
      DEFAULT_COORDS: {
        X: 570,
        Y: 375,
      },
      WIDTH: 64,
      HEIGHT: 80,
    },

    MAX_OFFERS: 10,
    PRICE: {
      LOW: 10000,
      MID: 50000,
    },
  };


})();
