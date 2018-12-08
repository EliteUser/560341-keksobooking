'use strict';


(function () {


  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;

  /* Отрисовка пинов с объявлением */

  var offerMap = document.querySelector('.map');

  var offerMapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderUserPin = function (offer, index) {
    var pinElement = offerMapPinTemplate.cloneNode(true);
    var pinImage = pinElement.firstElementChild;

    pinElement.dataset.index = index;
    pinElement.style.top = (offer.location.y - PIN_HEIGHT) + 'px';
    pinElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';

    pinImage.dataset.index = index;
    pinImage.classList.add('map__pin-image');
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    return pinElement;
  };

  var renderUserPins = function (offers) {
    var offerMapPins = offerMap.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderUserPin(offers[i], i));
    }

    offerMapPins.appendChild(fragment);
  };

  /* Обработчик клика по карте */

  var offerMapClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('map__pin') || target.classList.contains('map__pin-image')) {
      var activeOffer = offerMap.querySelector('.map__card');
      if (activeOffer) {
        offerMap.removeChild(activeOffer);
      }
      evt.preventDefault();
      window.offer.showUserOffer(target);
    }
  };

  /* Инициализация карты и загрузка данных */

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = offerMap.querySelector('.map__pin--main');

  var getMainPinCoords = function () {
    var xCoord = parseInt(mapPinMain.style.left, 10) + parseInt(MAIN_PIN_WIDTH / 2, 10);
    var yCoord = parseInt(mapPinMain.style.top, 10) + parseInt(MAIN_PIN_HEIGHT, 10);

    return xCoord + ', ' + yCoord;
  };

  var switchFormInputs = function (on) {
    var formFieldsets = Array.prototype.slice.call(adForm.querySelectorAll('fieldset'));

    formFieldsets.forEach(function (elem) {
      elem.disabled = on;
    });
  };

  var renderOffers = function (data) {
    window.data.offersData = data;
    renderUserPins(data);
  };

  var initOfferMap = function () {
    var formAddressInput = adForm.querySelector('#address');

    offerMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.load(renderOffers);
    switchFormInputs(false);
    formAddressInput.value = getMainPinCoords();

    offerMap.addEventListener('click', offerMapClickHandler);
  };

  switchFormInputs(true);
  mapPinMain.addEventListener('mouseup', initOfferMap);


})();
