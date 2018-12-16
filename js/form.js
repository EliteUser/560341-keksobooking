'use strict';

(function () {

  /* Отправка данных на сервер и показ сообщений */

  var adForm = document.querySelector('.ad-form');

  /* Показ сообщения об успешной отправке формы */

  var showSuccessMessage = function () {
    var successMessageElement = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);

    successMessageElement.addEventListener('click', successMessageOverlayHandler);
    document.addEventListener('keydown', successMessageEscHandler);
    document.body.appendChild(successMessageElement);
  };

  var hideSuccessMessage = function () {
    var message = document.querySelector('.success');

    message.removeEventListener('click', successMessageOverlayHandler);
    document.removeEventListener('keydown', successMessageEscHandler);
    document.body.removeChild(message);
  };

  var successMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideSuccessMessage);
  };

  var successMessageOverlayHandler = function (evt) {
    if (evt.target.classList.contains('success')) {
      hideSuccessMessage();
    }
  };

  /* Показ сообщения о неудачной отправке формы */

  var showErrorMessage = function () {
    var errorMessageElement = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var errorMessageAgainButton = errorMessageElement.querySelector('.error__button');

    errorMessageAgainButton.addEventListener('click', errorMessageAgainClickHandler);
    errorMessageElement.addEventListener('click', errorMessageOverlayHandler);
    document.addEventListener('keydown', errorMessageEscHandler);
    document.body.appendChild(errorMessageElement);
    errorMessageAgainButton.focus();
  };

  var hideErrorMessage = function () {
    var message = document.querySelector('.error');

    message.querySelector('.error__button').removeEventListener('click', errorMessageAgainClickHandler);
    message.removeEventListener('click', errorMessageOverlayHandler);
    document.removeEventListener('keydown', errorMessageEscHandler);
    document.body.removeChild(message);
  };

  var errorMessageAgainClickHandler = function () {
    hideErrorMessage();
  };

  var errorMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorMessage);
  };

  var errorMessageOverlayHandler = function (evt) {
    if (evt.target.classList.contains('error')) {
      hideErrorMessage();
    }
  };

  /* Обработчики событий на форме */

  var formSubmitSuccessHandler = function () {
    showSuccessMessage();
    window.map.resetOfferMap();
  };

  var formSubmitErrorHandler = function () {
    showErrorMessage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(adForm), formSubmitSuccessHandler, formSubmitErrorHandler);
    evt.preventDefault();
  };

  var formResetHandler = function () {
    window.map.resetOfferMap();
  };

  adForm.addEventListener('submit', formSubmitHandler);
  adForm.addEventListener('reset', formResetHandler);


})();
