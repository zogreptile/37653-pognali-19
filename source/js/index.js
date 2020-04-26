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
