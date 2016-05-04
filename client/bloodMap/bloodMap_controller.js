
app.controller('BloodMapController', ['$window','$routeParams' , '$rootScope', '$scope',  'BloodMap', function($window, $routeParams, $rootScope, $scope, BloodMap) {

  let BloodMapCtrl = this;

 let infowindow = null;

  let sites = [
      ['American Red Cross', 37.788513, -122.399940, 1, ],
      ['LapCorp', 37.788405, -122.409769, 2, ],
      ['SF city clinic', 37.775891, -122.407163, 3, ]
  ];

  BloodMapCtrl.hospitals=[];

  let geoobj = {
    minLat: '',
    maxLat: '',
    minLong:'',
    maxLong:''
  };


  let initializeMaps = function () {

    if(navigator.geolocation){
      // timeout at 60000 milliseconds (60 seconds)
      let options = {timeout:60000};
      navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    }
    let mapProp = {
            // center:new google.maps.LatLng(37.783697,-122.408966),
            center: new google.maps.LatLng($scope.latitude,$scope.longitude),
            zoom:17,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
    BloodMapCtrl.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    let GeoMarker = new GeolocationMarker(BloodMapCtrl.map);
    GeoMarker.setCircleOptions({fillColor: '#808080'});
   
    google.maps.event.addDomListener(window, 'load', initializeMaps);
    google.maps.event.addListener(BloodMapCtrl.map, 'bounds_changed', _.throttle(function() { setBounds(); gethospitals($scope.bounds);}, 400));
    google.maps.event.addListenerOnce(BloodMapCtrl.map, 'tilesloaded', function(){setBounds(); gethospitals($scope.bounds);});   
   
   
    GeoMarker.setMap(BloodMapCtrl.map);  
    setZoom(BloodMapCtrl.map, sites);
    setMarkers(BloodMapCtrl.map, sites);     
    
  };

  let setBounds = () => {
    $scope.bounds = BloodMapCtrl.map.getBounds();
  };

  let gethospitals = (bounds) => {
     geoobj.minLat = $scope.bounds.H.H;
     geoobj.maxLat = $scope.bounds.H.j;
     geoobj.minLong= $scope.bounds.j.j;
     geoobj.maxLong= $scope.bounds.j.H;
    BloodMap.getMap(geoobj)
    .then(function (list) {
      BloodMapCtrl.hospitals = [];
      BloodMapCtrl.hospitals = list;
      // setZoom(BloodMapCtrl.map, BloodMapCtrl.hospitals);
      setMarkers(BloodMapCtrl.map, BloodMapCtrl.hospitals);
    })
    .catch(function (error) {
      console.error(error);
    });


  };


 let showLocation = (position) => {
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
  };

  let errorHandler = (err) => {
      if(err.code == 1) {
         alert("Error: Access is denied!");
      }
   };

   BloodMapCtrl.markerIDs = {};

  let setMarkers = (map, markers) => {
  for (let i = 0; i < markers.length; i++) {
    let site = markers[i];
    // var siteLatLng = new google.maps.LatLng(site[1], site[2]);
    let siteLatLng = new google.maps.LatLng(site.latitude, site.longitude);
    let marker = new google.maps.Marker({
      position: siteLatLng,
      map: map
    });
  }
};
/*
Set the zoom to fit comfortably all the markers in the map
*/
let setZoom = (map, markers) => {
  let boundbox = new google.maps.LatLngBounds();
  for ( let i = 0; i < markers.length; i++ )
  {
    boundbox.extend(new google.maps.LatLng(markers[i][1], markers[i][2]));
    //boundbox.extend(new google.maps.LatLng(markers[i].latitude, markers[i].longitude));
  }
  map.setCenter(boundbox.getCenter());
  map.fitBounds(boundbox);
  
};

  initializeMaps();
}]);





