'use strict';


(function () {

  var PIN_DEFAULT_COORDS = {
    X: 570,
    Y: 375,
  };

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;

  var initialized = false;

  /* Отрисовка пинов с объявлением */

  var offerMap = document.querySelector('.map');

  var offerMapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderUserPin = function (offer) {
    var pinElement = offerMapPinTemplate.cloneNode(true);
    var pinImage = pinElement.firstElementChild;

    pinElement.dataset.index = offer.index;
    pinElement.style.top = (offer.location.y - PIN_HEIGHT) + 'px';
    pinElement.style.left = (offer.location.x - PIN_WIDTH / 2) + 'px';

    pinImage.dataset.index = offer.index;
    pinImage.classList.add('map__pin-image');
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    return pinElement;
  };

  var renderUserPins = function (offers) {
    var offerMapPinsContainer = offerMap.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderUserPin(offers[i]));
    }

    offerMapPinsContainer.appendChild(fragment);
  };

  var removeUserPins = function () {
    var userPins = offerMap.querySelectorAll('.map__pin[data-index]');
    for (var i = 0; i < userPins.length; i++) {
      userPins[i].remove();
    }
  };

  /* Обработчик клика по карте */

  var clearPinStyle = function () {
    var mapPins = window.util.toArray(offerMap.querySelectorAll('.map__pin'));
    mapPins.forEach(function (elem) {
      elem.classList.remove('map__pin--active');
    });
  };

  var offerMapClickHandler = function (evt) {
    var target = evt.target;
    clearPinStyle();

    if (target.classList.contains('map__pin')) {
      target.classList.add('map__pin--active');
    } else if (target.classList.contains('map__pin-image')) {
      target.parentElement.classList.add('map__pin--active');
    }

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
  var formAddressInput = adForm.querySelector('#address');

  var getMainPinCoords = function () {
    var xCoord = parseInt(mapPinMain.style.left, 10) + parseInt(MAIN_PIN_WIDTH / 2, 10);
    var yCoord = parseInt(mapPinMain.style.top, 10) + parseInt(MAIN_PIN_HEIGHT, 10);

    return xCoord + ', ' + yCoord;
  };

  var moveMainPin = function (target, xCoord, yCoord) {
    mapPinMain.style.left = xCoord + 'px';
    mapPinMain.style.top = yCoord + 'px';

    formAddressInput.value = getMainPinCoords();
  };

  /* Включение / выключение всех инпутов у форм */

  var switchFormInputs = function (off) {
    var filterFormElements = window.util.toArray(document.querySelector('.map__filters').elements);
    var formFieldsets = window.util.toArray(adForm.querySelectorAll('fieldset'));

    filterFormElements.forEach(function (elem) {
      elem.disabled = off;
    });

    formFieldsets.forEach(function (elem) {
      elem.disabled = off;
    });
  };

  /* Проверка на наличие ключа в полученных данных */

  var validateData = function (data, key) {
    data = data.slice();
    if (!data.offer) {
      data.forEach(function (elem) {
        if (!elem[key]) {
          data.splice(data.indexOf(elem), 1);
        }
      });
    }

    return data;
  };

  var renderOffers = function (data) {
    window.data = data;
    window.data.forEach(function (elem, index) {
      elem.index = index;
    });

    renderUserPins(validateData(data, 'offer'));
    window.sort.initializeFilters();
  };

  /* Инициализация карты (перевод в активное состояние) */
  var errorMessageOverlayHandler = function () {
    hideErrorMessage();
  };

  var errorMessageCloseEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorMessage);
  };

  var showErrorMessage = function () {
    var errorMessageElement = document.querySelector('#pin-error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    document.body.appendChild(errorMessageElement);

    errorMessageElement.addEventListener('click', errorMessageOverlayHandler);
    document.addEventListener('keydown', errorMessageCloseEscHandler);
  };

  var hideErrorMessage = function () {
    var message = document.querySelector('.error');

    message.removeEventListener('click', errorMessageOverlayHandler);
    document.removeEventListener('keydown', errorMessageCloseEscHandler);
    document.body.removeChild(message);
  };

  var initOfferMap = function () {
    if (!initialized) {
      initialized = true;

      offerMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.backend.load(renderOffers, showErrorMessage);
      switchFormInputs(false);
      formAddressInput.value = getMainPinCoords();
      window.picture.addPictureLoaders();

      offerMap.addEventListener('click', offerMapClickHandler);
    }
  };

  /* Сброс состояния карты к неактивному*/

  var resetOfferMap = function () {
    initialized = false;

    document.querySelector('.map__filters').reset();
    document.querySelector('.ad-form-header__preview').firstElementChild.src = 'img/muffin-grey.svg';
    document.querySelector('.ad-form__photo').firstElementChild.src = 'img/muffin-grey.svg';
    document.querySelector('.ad-form__photo').firstElementChild.classList.add('visually-hidden');
    window.picture.disablePictureDropzones();

    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    offerMap.classList.add('map--faded');
    window.offer.hideUserOffer();
    removeUserPins();
    switchFormInputs(true);
    moveMainPin(null, PIN_DEFAULT_COORDS.X, PIN_DEFAULT_COORDS.Y);
  };

  switchFormInputs(true);
  window.slider.initSlider(moveMainPin, initOfferMap);

  window.map = {
    resetOfferMap: resetOfferMap,
    removeUserPins: removeUserPins,
    renderUserPins: renderUserPins,
  };


})();
