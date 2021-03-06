'use strict';

(function () {


  /* Добавление фильтра объявлений на карте*/

  var initializeFilters = function () {
    var offerMap = document.querySelector('.map');
    var offerMapFilters = offerMap.querySelector('.map__filters');
    var filterFeatures = offerMapFilters.querySelectorAll('.map__checkbox');

    /* Обработчик на форме с фильтрами (для селектов) */

    var mapFiltersChangeHandler = function () {
      window.offer.hideUserOffer();
      var filteredData = window.data.slice();

      var activeFilters = window.util.toArray(offerMapFilters.querySelectorAll('select'))
        .filter(window.util.findNotAny)
        .map(window.util.returnFilterTypeValue);

      activeFilters.forEach(function (filter) {
        var currentFilterType = filter.type;
        var currentFilterValue = filter.value;

        if (currentFilterType === 'housing-price') {
          var FilterPrice = {
            'low': function (price) {
              return (price <= window.constants.PRICE.LOW);
            },
            'middle': function (price) {
              return (price > window.constants.PRICE.LOW && price <= window.constants.PRICE.MID);
            },
            'high': function (price) {
              return (price > window.constants.PRICE.MID);
            },
          };
        }

        var Filter = {
          'housing-type': function (elem) {
            return elem.offer.type === currentFilterValue;
          },
          'housing-price': function (elem) {
            return FilterPrice[currentFilterValue](elem.offer.price);
          },
          'housing-rooms': function (elem) {
            return elem.offer.rooms === window.util.parseIntDec(currentFilterValue);
          },
          'housing-guests': function (elem) {
            return elem.offer.guests === window.util.parseIntDec(currentFilterValue);
          },
        };

        filteredData = filteredData.filter(Filter[currentFilterType]);
      });

      filteredData = filterByFeatures(filteredData);

      window.map.removeUserPins();
      window.map.renderUserPins(filteredData.slice(0, window.constants.MAX_OFFERS));
    };

    /* Фильтрация по дополнительным возможностям (чекбоксы) */

    var filterByFeatures = function (data) {
      var checkedFeatures = window.util.toArray(filterFeatures)
        .filter(function (elem) {
          return elem.checked;
        })
        .map(function (elem) {
          return elem.value;
        });

      if (checkedFeatures.length) {
        checkedFeatures.forEach(function (feature) {
          data = data.filter(function (elem) {
            return elem.offer.features.includes(feature);
          });
        });
      }

      return data;
    };

    offerMapFilters.addEventListener('change', window.debounce(mapFiltersChangeHandler));
  };

  window.sort = {
    initializeFilters: initializeFilters,
  };


})();
