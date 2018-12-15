'use strict';

(function () {


  /* Генерация данных с объявлениями */

  var OFFER_QUANTITY = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_MIN_PRICE = 1000;
  var OFFER_MAX_PRICE = 1000000;
  var OFFER_TYPES = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var OFFER_MAX_ROOMS = 5;
  var OFFER_MAX_GUESTS = 20;
  var OFFER_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var PIN_WIDTH = 50;
  var OFFER_MIN_X = PIN_WIDTH / 2;
  var OFFER_MAX_X = 1200 - PIN_WIDTH / 2;
  var OFFER_MIN_Y = 130;
  var OFFER_MAX_Y = 630;

  var createOfferElement = function (index, avatar, title, price, type, rooms, guests, checkin, checkout, features, description, photos, x, y) {
    return {
      index: index,

      author: {
        avatar: avatar,
      },

      offer: {
        title: title,
        address: x + ', ' + y,
        price: price,
        type: type,
        rooms: rooms,
        guests: guests,
        checkin: checkin,
        checkout: checkout,
        features: features,
        description: description,
        photos: photos,
      },

      location: {
        x: x,
        y: y,
      },
    };
  };

  var generateOfferFeatures = function (features) {
    var featuresQuantity = window.util.getRandomInteger(1, features.length);
    var featuresList = [];

    for (var i = 0; i < featuresQuantity; i++) {
      var index = window.util.getRandomInteger(0, features.length - 1);
      featuresList.push(features[index]);
      features.splice(index, 1);
    }

    return featuresList;
  };

  var generateOffersData = function () {
    var data = [];

    for (var i = 0; i < OFFER_QUANTITY; i++) {
      var offerIndex = i;
      var offerAvatar = 'img/avatars/user0' + (i + 1) + '.png';
      var offerTitle = OFFER_TITLES[i];
      var offerPrice = window.util.getRandomInteger(OFFER_MIN_PRICE, OFFER_MAX_PRICE);
      var offerType = window.util.getRandomArrayElement(OFFER_TYPES);
      var offerRooms = window.util.getRandomInteger(1, OFFER_MAX_ROOMS);
      var offerGuests = window.util.getRandomInteger(1, OFFER_MAX_GUESTS);
      var offerCheckin = window.util.getRandomArrayElement(OFFER_CHECKIN_TIMES);
      var offerCheckout = window.util.getRandomArrayElement(OFFER_CHECKOUT_TIMES);
      var offerFeatures = generateOfferFeatures(OFFER_FEATURES);
      var offerDescription = '';
      var offerPhotos = OFFER_PHOTOS;
      var offerX = window.util.getRandomInteger(OFFER_MIN_X, OFFER_MAX_X);
      var offerY = window.util.getRandomInteger(OFFER_MIN_Y, OFFER_MAX_Y);
      data.push(createOfferElement(offerIndex, offerAvatar, offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, offerDescription, offerPhotos, offerX, offerY));
    }

    return data;
  };


  window.data = {
    offersData: generateOffersData,
  };

})();
