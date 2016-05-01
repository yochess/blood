app.controller('HospitalEditController', ['$window', '$routeParams' ,  '$rootScope', 'HospitalAuth', function($window, HospitalAuth, $routeParams, $rootScope) {
    
    let HospitalEditCtrl = this;

    let sampledata =
            {
        name: 'Hospital',
        email: 'hospital@gmail.com',
        address: '944 Market Street, San Francisco, CA 94102',
        lat :'37.783697',
        long: '-122.408966',
        bloodObj: {
           aP: '20',
          aN: '20',
          bP: '20',
          bN: '20',
          abP: '20',
          abN: '20',
          oP: '20',
          oN: '20'

        }
       
      
      };
      HospitalEditCtrl.editObj = {
      bloodObj: {}
    };

     HospitalEditCtrl.change = true;
  HospitalEditCtrl.Edit = function() {
   HospitalEditCtrl.change = !HospitalEditCtrl.change;
  };


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
              HospitalEditCtrl.editObj.lat = results[0].geometry.location.lat();
              HospitalEditCtrl.editObj.long = results[0].geometry.location.lng();
            }
        });
    }
};


    HospitalEditCtrl.edit = () => {
      console.log(HospitalEditCtrl.editObj);
      // HospitalAuth
      //   .edit(HospitalEditCtrl.editObj)
      //   .then(res => {
      //     // $window.localStorage.setItem('id', res.id);
      //     // $window.location.assign('#');
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    };

    let displayHospital = () => {
      HospitalEditCtrl.editObj = sampledata;
      // console.log(HospitalEditCtrl.editObj);
      //Update the service fuction and display date from get

    };
    displayHospital();
}]);
