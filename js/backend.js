'use strict';

(function () {


  var xhrErrorHandler = function (onError) {
    return function () {
      onError('Произошла ошибка соединения');
    };
  };

  var xhrTimeoutHandler = function (xhr, onError) {
    return function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
  };

  var xhrHandler = function (xhr, onLoad, onError, message) {
    return function () {
      if (xhr.status === window.constants.XHR.STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText + '\n ' + message);
      }
    };
  };

  var createXhrRequest = function (onLoad, onError, message) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = window.constants.XHR.TIMEOUT;

    xhr.addEventListener('load', xhrHandler(xhr, onLoad, onError, message));
    xhr.addEventListener('error', xhrErrorHandler(onError));
    xhr.addEventListener('timeout', xhrTimeoutHandler(xhr, onError));

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhrRequest(onLoad, onError, 'Не удалось загрузить данные');

    xhr.open('GET', window.constants.DOWNLOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = createXhrRequest(onLoad, onError, 'Не удалось отправить данные');

    xhr.open('POST', window.constants.UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };


})();
