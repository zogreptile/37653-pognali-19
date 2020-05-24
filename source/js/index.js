var mapContainer = document.getElementById('map');

if (mapContainer) {
  ymaps.ready(init);
  function init(){
    new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
      controls: [],
    });
  }
}


if (document.getElementById('js-route')) {
  var chooseRouteButtons = document.querySelectorAll('.js-choose-route');
  var removeRouteButtons = document.querySelectorAll('.js-remove-route');

  chooseRouteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var buttonTextElement = button.querySelector('.route__btn-text');
      var routeItem = button.closest('.js-route-item');
      var countriesBlock = routeItem.querySelector('.js-countries');
      var countryLinks = routeItem.querySelectorAll('.js-route-country-link');

      routeItem.classList.toggle('route__item--active');
      button.classList.toggle('route__btn--active');
      countriesBlock.classList.toggle('route__countries--opened');

      countryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault;

          var countryName = link.textContent;
          buttonTextElement.textContent = countryName;

          routeItem.classList.add('route__item--choosen');
          routeItem.classList.remove('route__item--active');
          button.classList.remove('route__btn--active');
          countriesBlock.classList.remove('route__countries--opened');
        });
      });
    })
  });

  removeRouteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var routeItem = button.closest('.js-route-item');

      routeItem.parentNode.removeChild(routeItem);
    })
  });
}

if (document.getElementById('js-description')) {
  var descriptionInputs = document.querySelectorAll('.js-description');

  descriptionInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      var inputWrapper = e.target.closest('.description__content');

      if (!e.target.value) {
        inputWrapper.classList.add('description__content--error');
      } else {
        inputWrapper.classList.remove('description__content--error');
      }
    });
  });
}

if (document.getElementById('country-filter')) {
  var countryFilterToggle = document.querySelector('.js-country-filter-toggle');
  var countryFilter = countryFilterToggle.closest('.country-filter');

  countryFilterToggle.addEventListener('click', function() {
    countryFilter.classList.toggle('country-filter--opened');
  });

  var countryFilterClose = document.querySelector('.js-country-filter-close');

  countryFilterClose.addEventListener('click', function() {
    countryFilter.classList.remove('country-filter--opened');
  });
}

(function disableHashLinks() {
  var links = document.querySelectorAll('a');

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
    })
  });
})();
