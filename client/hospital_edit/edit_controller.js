app.controller('HospitalEditController', ['$window', '$routeParams' ,  '$rootScope', 'HospitalProfile', function($window, $routeParams, $rootScope, HospitalProfile) {

  let HospitalEditCtrl = this;

  HospitalEditCtrl.editObj = {};

  HospitalEditCtrl.edit = false;
  HospitalEditCtrl.Edit = function() {
    HospitalEditCtrl.edit = !HospitalEditCtrl.edit;
  };

  HospitalEditCtrl.bloodTypes = [
  {display: 'A+', code: 'apos'},
  {display: 'A-', code: 'aneg'},
  {display: 'B+', code: 'bpos'},
  {display: 'B-', code: 'bneg'},
  {display: 'AB+', code: 'abpos'},
  {display: 'AB-', code: 'abneg'},
  {display: '0+', code: 'opos'},
  {display: 'O-', code: 'oneg'}
  ];

  HospitalEditCtrl.getlatlong = () => {
    let address = document.getElementById('address').value;
    console.log(address);
    // address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    let geocoder = new google.maps.Geocoder();
    if (geocoder) {
      console.log(geocoder);

      geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          HospitalEditCtrl.editObj.latitude = results[0].geometry.location.lat();
          HospitalEditCtrl.editObj.longitude = results[0].geometry.location.lng();
        }
      });
    }
  };


  HospitalEditCtrl.update = () => {
    HospitalProfile.update(HospitalEditCtrl.editObj)
    .then(hospital => HospitalEditCtrl.editObj = hospital);
  };

  let displayHospital = () => {
    HospitalProfile.get()
    .then((hospital) => {
      HospitalEditCtrl.editObj = hospital;
    });
  };

  displayHospital();
}]);
