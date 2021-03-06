document.querySelector('.no-js').classList.remove('no-js');

// хедер + навигация =====
var mainNavToggle = document.querySelector('.js-main-nav-toggle');
var mainNav = document.querySelector('.js-main-nav');
var pageHeader = document.querySelector('.js-page-header');

mainNavToggle.addEventListener('click', function() {
  mainNav.classList.toggle('main-nav--opened');
  pageHeader.classList.toggle('page-header--main-nav-opened');
});

if (window.pageYOffset > 130) {
  pageHeader.classList.add('page-header--light');
  mainNav.classList.add('main-nav--page-scrolled');
}

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 130) {
    pageHeader.classList.add('page-header--light');
    mainNav.classList.add('main-nav--page-scrolled');
  } else {
    pageHeader.classList.remove('page-header--light');
    mainNav.classList.remove('main-nav--page-scrolled');
  }
});
// =====



var popup = document.getElementById('popup');

if (popup) {
  var openPopupButton = document.querySelector('.js-open-popup');
  var closePopupButton = document.querySelector('.js-close-popup');

  openPopupButton.addEventListener('click', function() {
    popup.classList.add('popup--opened');
  });

  closePopupButton.addEventListener('click', function() {
    popup.classList.remove('popup--opened');
  });
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



var mapContainer = document.getElementById('map');

if (mapContainer) {
  ymaps.ready(init);
  function init(){
    var map = new ymaps.Map("map", {
      center: [59.938635, 30.323118],
      zoom: 14,
      controls: [],
    });

    var placemark = new ymaps.Placemark([59.938635, 30.323118]);

    map.geoObjects.add(placemark);
  }
}
