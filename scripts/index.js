let map;
let service;
let position = { lat: 50, lng: 5 };
let infowindow;

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
  document.getElementById("tryButton").addEventListener("click", setMarkers);

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
}

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
function createRoute(
  whereStart,
  whereEnd,
  directionsService,
  directionsRenderer
) {
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
  var requestDirections = {
    origin: { query: whereStart },
    destination: { query: whereEnd },
    travelMode: google.maps.TravelMode.DRIVING,
  };
  directionsService.route(requestDirections, function (result, status) {
    if (status == "OK") {
      console.log(result);
      directionsRenderer.setDirections(result);
    }
  });
}

window.initMap = initMap;
