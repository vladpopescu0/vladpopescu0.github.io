let map;
let service;
let position = { lat: 50, lng: 5 };
let infowindow;
let cumva;
function initMap() {
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  const europe = new google.maps.LatLng(position.lat, position.lng);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: europe,
    streetViewControl: false,
    zoom: 4,
  });
  directionsRenderer.setMap(map);
  const setMarkers = function () {
    var param = document.getElementById("startInput").value;
    var param2 = document.getElementById("endInput").value;
    createRoute(param, param2, directionsService, directionsRenderer);
  };
  const findRides = function () {
    var menu = document.getElementById("rides-menu");
    menu.style.visibility = "visible";
    var pos1 = "Rijswijk";
    var pos2 = "Eindhoven";
    var pos3 = "Delft";
    var pos4 = "Mierlo";
    var pos5 = "Den Haag";
    var pos6 = "Valkenswaard";
    createRoute(pos1, pos2, directionsService, directionsRenderer);
    var directionsRenderer2 = new google.maps.DirectionsRenderer();
    directionsRenderer2.setMap(map);
    createRoute(pos3, pos4, directionsService, directionsRenderer2);
    var directionsRenderer3 = new google.maps.DirectionsRenderer();
    directionsRenderer3.setMap(map);
    createRoute(pos5, pos6, directionsService, directionsRenderer3);
  };
  document.getElementById("tryButton").addEventListener("click", setMarkers);
  document.getElementById("submitButton").addEventListener("click", findRides);

  function createRoute(
    whereStart,
    whereEnd,
    directionsService,
    directionsRenderer
  ) {
    var requestDirections = {
      origin: whereStart,
      destination: whereEnd,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(requestDirections, function (result, status) {
      console.log(result);
      if (status == "OK") {
        console.log(result);
        directionsRenderer.setDirections(result);
      }
    });
  }
}
// const request = {
//   query: whereStart,
//   fields: ["name", "geometry"],
// };
// service = new google.maps.places.PlacesService(map);
// service.findPlaceFromQuery(request, (results, status) => {
//   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//     for (let i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// });
// const request2 = {
//   query: whereEnd,
//   fields: ["name", "geometry"],
// };
// service = new google.maps.places.PlacesService(map);
// service.findPlaceFromQuery(request2, (results, status) => {
//   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//     for (let i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// });
// const request = {
//   query: a1,
//   fields: ["name", "geometry"],
// };
// const requestEnd = {
//   query: a2,
//   fields: ["name", "geometry"],
// };
// var loc1;
// var loc2;
// service = new google.maps.places.PlacesService(map);
// service.findPlaceFromQuery(request, (results, status) => {
//   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//     for (let i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//       loc1 = results[i];
//     }
//   }
// });
// service.findPlaceFromQuery(requestEnd, (results, status) => {
//   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//     for (let i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//       loc2 = results[i];
//       console.log(loc2);
//     }
//   }
// });
// map.setCenter(loc1.geometry.location);

// function createMarker(place) {
//   if (!place.geometry || !place.geometry.location) return;

//   const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
//   });

//   google.maps.event.addListener(marker, "click", () => {
//     infowindow.setContent(place.name || "");
//     infowindow.open(map);
//   });
// }

window.initMap = initMap;
