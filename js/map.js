'use strict';

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
var PIN_HEIGHT = 70;
var OFFER_MIN_X = PIN_WIDTH / 2;
var OFFER_MAX_X = 1200 - PIN_WIDTH / 2;
var OFFER_MIN_Y = 130;
var OFFER_MAX_Y = 630;

var getRandomInteger = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createOfferElement = function (avatar, title, price, type, rooms, guests, checkin, checkout, features, description, photos, x, y) {
  return {
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
  var featuresQuantity = getRandomInteger(1, features.length);
  var featuresList = [];

  for (var i = 0; i < featuresQuantity; i++) {
    var index = getRandomInteger(0, features.length - 1);
    featuresList.push(features[index]);
    features.splice(index, 1);
  }

  return featuresList;
};

var generateOffersData = function () {
  var data = [];

  for (var i = 0; i < OFFER_QUANTITY; i++) {
    var offerAvatar = 'img/avatars/user0' + (i + 1) + '.png';
    var offerTitle = OFFER_TITLES[i];
    var offerPrice = getRandomInteger(OFFER_MIN_PRICE, OFFER_MAX_PRICE);
    var offerType = getRandomArrayElement(OFFER_TYPES);
    var offerRooms = getRandomInteger(1, OFFER_MAX_ROOMS);
    var offerGuests = getRandomInteger(1, OFFER_MAX_GUESTS);
    var offerCheckin = getRandomArrayElement(OFFER_CHECKIN_TIMES);
    var offerCheckout = getRandomArrayElement(OFFER_CHECKOUT_TIMES);
    var offerFeatures = generateOfferFeatures(OFFER_FEATURES);
    var offerDescription = '';
    var offerPhotos = OFFER_PHOTOS;
    var offerX = getRandomInteger(OFFER_MIN_X, OFFER_MAX_X);
    var offerY = getRandomInteger(OFFER_MIN_Y, OFFER_MAX_Y);
    data.push(createOfferElement(offerAvatar, offerTitle, offerPrice, offerType, offerRooms, offerGuests, offerCheckin, offerCheckout, offerFeatures, offerDescription, offerPhotos, offerX, offerY));
  }

  return data;
};

/* Отрисовка объявлений */

var offerMap = document.querySelector('.map');
offerMap.classList.remove('map--faded');

var offerMapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderUserPin = function (offer) {
  var pinElement = offerMapPinTemplate.cloneNode(true);
  var pinImage = pinElement.firstElementChild;

  pinElement.style.top = (offer.location.y - PIN_HEIGHT) + 'px';
  pinElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;

  return pinElement;
};

var renderUserPins = function (offers) {
  var offerMapPins = offerMap.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderUserPin(offers[i]));
  }

  offerMapPins.appendChild(fragment);
};

var offerMapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var clearOfferFeatures = function (element) {
  var features = element.children;
  for (var i = features.length - 1; i >= 0; i--) {
    features[i].parentElement.removeChild(features[i]);
  }
};

var renderOfferFeatures = function (node, features) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature', 'popup__feature--' + features[i]);
    fragment.appendChild(element);
  }

  node.appendChild(fragment);
};

var renderOfferPhotos = function (node, photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.width = 40;
    photo.height = 40;
    photo.src = photos[i];
    photo.alt = 'Фотография жилья';

    fragment.appendChild(photo);
  }
  node.appendChild(fragment);
};

var renderUserOffer = function (offer) {
  var offerElement = offerMapCardTemplate.cloneNode(true);
  var offerFeaturesList = offerElement.querySelector('.popup__features');
  var offerPhotos = offerElement.querySelector('.popup__photos');

  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  clearOfferFeatures(offerFeaturesList);
  renderOfferFeatures(offerFeaturesList, offer.offer.features);
  renderOfferPhotos(offerPhotos, offer.offer.photos);
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;

  offerMap.insertBefore(offerElement, offerMap.querySelector('.map__filters--container'));
};

var offersData = generateOffersData();
renderUserPins(offersData);
renderUserOffer(offersData[0]);
