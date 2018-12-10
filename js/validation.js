'use strict';

(function () {


  /* Установка минимальной цены в объявлении */

  var adForm = document.querySelector('.ad-form');
  var housingType = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

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

  var formTimeIn = adForm.querySelector('#timein');
  var formTimeOut = adForm.querySelector('#timeout');

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

  var formRoomNumber = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');
  var formCapacityOptions = window.util.toArray(formCapacity.children);

  /* switch надо как-то упростить, но я не знаю как (отличается вычислением условия) */

  var setCapacity = function () {
    var value = parseInt(formRoomNumber.value, 10);
    switch (value) {
      case 1:
        formCapacityOptions.forEach(function (elem) {
          var elemValue = parseInt(elem.value, 10);
          if (elemValue === 1) {
            elem.disabled = false;
            elem.selected = true;
          } else {
            elem.disabled = true;
          }
        });

        break;

      case 2:
        formCapacityOptions.forEach(function (elem) {
          var elemValue = parseInt(elem.value, 10);
          if (elemValue === 1 || elemValue === 2) {
            elem.disabled = false;
            elem.selected = true;
          } else {
            elem.disabled = true;
          }
        });

        break;

      case 3:
        formCapacityOptions.forEach(function (elem) {
          var elemValue = parseInt(elem.value, 10);
          if (elemValue !== 0) {
            elem.disabled = false;
            elem.selected = true;
          } else {
            elem.disabled = true;
          }
        });

        break;

      case 100:
        formCapacityOptions.forEach(function (elem) {
          var elemValue = parseInt(elem.value, 10);
          if (elemValue === 0) {
            elem.disabled = false;
            elem.selected = true;
          } else {
            elem.disabled = true;
          }
        });

        break;
    }
  };

  formRoomNumber.addEventListener('change', setCapacity);

})();
