function initialize() {

var input = document.getElementById('origem');
var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: -23.321264, lng: -51.2351624}
  });
  directionsDisplay.setMap(map);

   //alert("Entrou no calculate");
  var origem = $("#origem").val();
  
  document.getElementById('txt_de').innerHTML = "Origem: " + origem;
  var destino = $("#destino").val();
  document.getElementById('txt_para').innerHTML = "Destino: " + destino;
  directionsService.route({
    origin: origem,
    destination: destino,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
       //alert('De' + status + "to"+response);
    } else {
      alert('Falha ao buscar dados: ' + status);
    }
  });

    //calculateAndDisplayRoute(directionsService, directionsDisplay);
 //alert("x");
  //document.getElementById('origem').addEventListener('change', onChangeHandler);
  //document.getElementById('destino').addEventListener('change', onChangeHandler);

   var request = {
       origin: origem, 
       destination: destino,
       travelMode: google.maps.DirectionsTravelMode.DRIVING
   };
   directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {

        var km_total = Math.round(response.routes[0].legs[0].distance.value / 1000);
        var km_litro = $("#km_litro").val();
        var valor_combustivel = 2.79;
        var subtotal = parseFloat((km_total/km_litro) * valor_combustivel).toFixed(2);
        document.getElementById('txt_distancia').innerHTML = "Distância: " + Math.round(response.routes[0].legs[0].distance.value / 1000)+ " KM";
        document.getElementById('txt_tempo').innerHTML = "Tempo: " + Math.round(response.routes[0].legs[0].duration.value / 60 / 60) + " Horas";
        document.getElementById('txt_subtotal').innerHTML = "Custo c/ combustivel: " + subtotal;
         directionsDisplay.setDirections(response);
      }
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  alert("Entrou no calculate");
  var origem = $("#origem").val();
  var destino = $("#destino").val();
  directionsService.route({
    origin: origem.val(),
    destination: destino.val(),
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
       //window.alert('De' + status + "to"+response);
    } else {
      
      window.alert('Directions request failed due to ' + status);
    }
  });
  alert("saiu no calculate");
}