'use strict';

(function () {


  /* Загрузка аватарки пользователя и изображений в объявлении */

  var avatarPictureInput = document.querySelector('.ad-form-header__input');
  var avatarPicturePreview = document.querySelector('.ad-form-header__preview').firstElementChild;
  var avatarPictureDropzone = document.querySelector('.ad-form-header__drop-zone');

  var offerPictureInput = document.querySelector('.ad-form__input');
  var offerPicturePreview = document.querySelector('.ad-form__photo').firstElementChild;
  var offerPictureDropzone = document.querySelector('.ad-form__drop-zone');

  /* Обработчики drag`n`drop */

  var addFileToInput = function (evt, input) {
    input.files = evt.dataTransfer.files;
  };

  var dropzoneDragEnterHandler = function (evt) {
    evt.target.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
    evt.preventDefault();
    evt.stopPropagation();
  };

  var dropzoneDragLeaveHandler = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
    evt.stopPropagation();
  };

  var dropzoneDragOverHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var dropzoneDropHandler = function (evt) {
    var input = evt.target.control;

    evt.target.style.backgroundColor = '';
    evt.preventDefault();
    evt.stopPropagation();

    addFileToInput(evt, input);
  };

  var enablePictureDropzone = function (dropzone) {
    dropzone.addEventListener('dragenter', dropzoneDragEnterHandler);
    dropzone.addEventListener('dragleave', dropzoneDragLeaveHandler);
    dropzone.addEventListener('dragover', dropzoneDragOverHandler);
    dropzone.addEventListener('drop', dropzoneDropHandler);
  };

  var disablePictureDropzone = function (dropzone) {
    dropzone.removeEventListener('dragenter', dropzoneDragEnterHandler);
    dropzone.removeEventListener('dragleave', dropzoneDragLeaveHandler);
    dropzone.removeEventListener('dragover', dropzoneDragOverHandler);
    dropzone.removeEventListener('drop', dropzoneDropHandler);
  };

  /* Добавление загрузчика изображений */

  var addPictureLoader = function (fileChooser, preview, dropzone) {
    if (dropzone) {
      enablePictureDropzone(dropzone);
    }

    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooserChangeHandler = function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (elem) {
        return fileName.endsWith(elem);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
          preview.classList.remove('visually-hidden');
        });

        reader.readAsDataURL(file);
      }
    };

    fileChooser.addEventListener('change', fileChooserChangeHandler);
  };

  var addPictureLoaders = function () {
    addPictureLoader(avatarPictureInput, avatarPicturePreview, avatarPictureDropzone);
    addPictureLoader(offerPictureInput, offerPicturePreview, offerPictureDropzone);
  };

  var disablePictureDropzones = function () {
    disablePictureDropzone(avatarPictureDropzone);
    disablePictureDropzone(offerPictureDropzone);
  };

  window.picture = {
    addPictureLoaders: addPictureLoaders,
    disablePictureDropzones: disablePictureDropzones,
  };


})();
