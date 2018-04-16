// Exibir mapa
function initialize() {

  // Exibir mapa
  var myLatlng = new google.maps.LatLng(-7.062250, -34.841910);
  var mapOptions = {
    zoom: 16,
    scrollwheel: false,
    center: myLatlng,
    panControl: false,
    styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#6699cc"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#37ff00"},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#0080ff"},{"lightness":"60"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#0080ff"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
  }

  // ParÃ¢metros do texto que serÃ¡ exibido no clique
  var contentString = '<h2>Animais em Pessoa</h2>' +
  '<p>Rua Artur Monteiro Paiva, 672</p>' +
  '<a href="tel:999999999">99999-9999</a>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 700
  });

  // Exibir o mapa na div #mapa
  var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

  // Marcador personalizado;
  
  var marcadorPersonalizado = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Animais em Pessoa',
    animation: google.maps.Animation.DROP
  });

  // Exibir texto ao clicar no Ã­cone
  google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
    infowindow.open(map,marcadorPersonalizado);
  });
}

// FunÃ§Ã£o para carregamento assÃ­ncrono
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBLlUtgwtGay7ovFhsFiRL1CAmqOHgWewo&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;