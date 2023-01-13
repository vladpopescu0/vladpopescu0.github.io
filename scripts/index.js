let map;
let service;
let infowindow;
document.getElementById("tryButton").addEventListener("click", setMarkers);
function setMarkers() {
  console.log("ad");
  createMarkerClick();
}

function initMap(a1, a2) {
  const europe = new google.maps.LatLng(50, 40);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("googleMaps"), {
    center: europe,
    zoom: 4,
  });

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

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}
function createMarkerClick() {
  const request = {
    query: "eindhoven",
    fields: ["name", "geometry"],
  };
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });
}

window.initMap = initMap;
