
app.controller('BloodMapController', ['$routeParams', '$rootScope', function($routeParams, $rootScope) {

  let BloodMapCtrl = this;

  let initializeMaps = function () {
    let mapProp = {
            center:new google.maps.LatLng(51.508742,-0.120850),
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
    BloodMapCtrl.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    google.maps.event.addDomListener(window, 'load', initializeMaps);
    
  };

  initializeMaps();
}]);





