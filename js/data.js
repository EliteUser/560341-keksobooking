'use strict';

(function () {


  /* Генерация данных с объявлениями */

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

    for (var i = 0; i < window.constants.OFFER.QUANTITY; i++) {
      var offerIndex = i;
      var offerAvatar = 'img/avatars/user0' + (i + 1) + '.png';
      var offerTitle = window.constants.OFFER.TITLES[i];
      var offerPrice = window.util.getRandomInteger(window.constants.OFFER.MIN_PRICE, window.constants.OFFER.MAX_PRICE);
      var offerType = window.util.getRandomArrayElement(window.constants.OFFER.TYPES);
      var offerRooms = window.util.getRandomInteger(1, window.constants.OFFER.MAX_ROOMS);
      var offerGuests = window.util.getRandomInteger(1, window.constants.OFFER.MAX_GUESTS);
      var offerCheckin = window.util.getRandomArrayElement(window.constants.OFFER.CHECKIN_TIMES);
      var offerCheckout = window.util.getRandomArrayElement(window.constants.OFFER.CHECKOUT_TIMES);
      var offerFeatures = generateOfferFeatures(window.constants.OFFER.FEATURES);
      var offerDescription = '';
      var offerPhotos = window.constants.OFFER.PHOTOS;
      var offerX = window.util.getRandomInteger(window.constants.OFFER.MIN_X, window.constants.OFFER.MAX_X);
      var offerY = window.util.getRandomInteger(window.constants.OFFER.MIN_Y, window.constants.OFFER.MAX_Y);
      data.push(createOfferElement(offerIndex, offerAvatar, offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, offerDescription, offerPhotos, offerX, offerY));
    }

    return data;
  };


  window.data = {
    offersData: generateOffersData,
  };

})();
