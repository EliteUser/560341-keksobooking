'use strict';

(function () {


  /* Карточка с объявлением пользователя */

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
    var offerMap = document.querySelector('.map');
    var offerElement = offerMapCardTemplate.cloneNode(true);
    var offerFeaturesList = offerElement.querySelector('.popup__features');
    var offerPhotos = offerElement.querySelector('.popup__photos');

    offerElement.classList.add('hidden');
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

  var showUserOffer = function (target) {
    var offerIndex = target.dataset.index;
    var offerCardCloseButton = document.querySelector('.popup__close');

    renderUserOffer(window.data.offersData[offerIndex]);
    offerCardCloseButton.addEventListener('click', offerCardCloseButtonClickHandler);
    document.addEventListener('keydown', offerCardEscHandler);
  };

  var hideUserOffer = function () {
    var activeMapCard = document.querySelector('.map__card');
    var offerCardCloseButton = activeMapCard.querySelector('.popup__close');

    offerCardCloseButton.removeEventListener('click', offerCardCloseButtonClickHandler);
    document.removeEventListener('keydown', offerCardEscHandler);
    document.querySelector('.map').removeChild(activeMapCard);
  };

  var offerCardCloseButtonClickHandler = function () {
    hideUserOffer();
  };

  var offerCardEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideUserOffer);
  };

  window.offer = {
    showUserOffer: showUserOffer,
  };


})();
