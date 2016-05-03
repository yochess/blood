
app.controller('BloodMapController', ['$routeParams', '$rootScope',  function($routeParams, $rootScope) {

  let BloodMapCtrl = this;

 let infowindow = null;

  let sites = [
      ['American Red Cross', 37.788513, -122.399940, 1, ],
      ['LapCorp', 37.788405, -122.409769, 2, ],
      ['SF city clinic', 37.775891, -122.407163, 3, ]
  ];

  // $scope.hospitals=[];
  let latitude;
  let longitude;


  let initializeMaps = function () {

    if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               let options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            }
    let mapProp = {
            // center:new google.maps.LatLng(37.783697,-122.408966),
            center: new google.maps.LatLng(latitude,longitude),
            zoom:17,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
    BloodMapCtrl.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    let GeoMarker = new GeolocationMarker(BloodMapCtrl.map);
    GeoMarker.setCircleOptions({fillColor: '#808080'});
      console.log(BloodMapCtrl.map.getBounds());

    setZoom(BloodMapCtrl.map, sites);
    setMarkers(BloodMapCtrl.map, sites);
    // console.log(BloodMapCtrl.map.getBounds());

    google.maps.event.addDomListener(window, 'load', initializeMaps);      
    
  };


 let showLocation = (position) => {
            latitude = position.coords.latitude;
           longitude = position.coords.longitude;
            // alert("Latitude : " + latitude + " Longitude: " + longitude);
         };

  let errorHandler = (err) => {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
         };

  let setMarkers = (map, markers) => {
  for (var i = 0; i < markers.length; i++) {
    var site = markers[i];
    var siteLatLng = new google.maps.LatLng(site[1], site[2]);
    
    var marker = new google.maps.Marker({
      position: siteLatLng,
      map: map,
      title: site[0],
      // Markers drop on the map
      animation: google.maps.Animation.DROP
    });
    
  
  }
};
/*
Set the zoom to fit comfortably all the markers in the map
*/
let setZoom = (map, markers) => {
  var boundbox = new google.maps.LatLngBounds();
  for ( var i = 0; i < markers.length; i++ )
  {
    boundbox.extend(new google.maps.LatLng(markers[i][1], markers[i][2]));
  }
  map.setCenter(boundbox.getCenter());
  map.fitBounds(boundbox);
  
};

  initializeMaps();
}]);





