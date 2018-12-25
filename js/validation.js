'use strict';

(function () {


  /* Установка минимальной цены в объявлении */

  var adForm = document.querySelector('.ad-form');
  var housingType = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var formTimeIn = adForm.querySelector('#timein');
  var formTimeOut = adForm.querySelector('#timeout');

  var formRoomNumber = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');
  var formCapacityOptions = window.util.toArray(formCapacity.children);

  var setMinPrice = function () {
    var housingTypes = window.util.toArray(housingType.children);

    housingTypes.forEach(function (elem) {
      if (elem.selected) {
        priceInput.min = elem.dataset.minPrice;
        priceInput.placeholder = elem.dataset.minPrice;
      }
    });
  };

  housingType.addEventListener('change', setMinPrice);

  /* Установка времени въезда / выезда */

  var setAdTime = function (evt) {
    var target = evt.target;
    var timeInInputs = window.util.toArray(formTimeIn.children);
    var timeOutInputs = window.util.toArray(formTimeOut.children);

    if (target.id === 'timein') {
      timeInInputs.forEach(function (elem, index) {
        if (elem.selected) {
          timeOutInputs[index].selected = true;
        }
      });
    } else if (target.id === 'timeout') {
      timeOutInputs.forEach(function (elem, index) {
        if (elem.selected) {
          timeInInputs[index].selected = true;
        }
      });
    }
  };

  formTimeIn.addEventListener('change', setAdTime);
  formTimeOut.addEventListener('change', setAdTime);

  /* Заполнение полей количество комнат / мест*/

  var switchElement = function (elem, valid) {
    var currentValue = parseInt(elem.value, 10);

    if (valid(currentValue)) {
      elem.disabled = false;
      elem.selected = true;
    } else {
      elem.disabled = true;
    }
  };

  var setCapacity = function () {
    var value = formRoomNumber.value;

    var ValueValidator = {
      '1': function (elemValue) {
        return (elemValue === 1);
      },
      '2': function (elemValue) {
        return (elemValue === 1 || elemValue === 2);
      },
      '3': function (elemValue) {
        return (elemValue !== 0);
      },
      '100': function (elemValue) {
        return (elemValue === 0);
      },
    };

    formCapacityOptions.forEach(function (elem) {
      switchElement(elem, ValueValidator[value]);
    });
  };

  formRoomNumber.addEventListener('change', setCapacity);

})();
