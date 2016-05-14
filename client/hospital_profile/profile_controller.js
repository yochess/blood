app.controller('HospitalProfileController', ['$window', '$routeParams' ,  '$rootScope', '$scope', 'HospitalProfile', 'currentHospital', function($window, $routeParams, $rootScope, $scope, HospitalProfile, currentHospital) {
  let HospitalProfileCtrl = this;

  HospitalProfileCtrl.hospital = currentHospital;

  HospitalProfileCtrl.edit = false;
  HospitalProfileCtrl.Edit = function() {
    console.log(HospitalProfileCtrl.editObj);
    HospitalProfileCtrl.edit = !HospitalProfileCtrl.edit;
  };

  HospitalProfileCtrl.sliderOptions = {
    floor: 0,
    ceil: 24,
    step: 1
  };

  HospitalProfileCtrl.schedule = [
  {

    day: 1,
    name: 'Monday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 2,
    name: 'Tuesday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 3,
    name: 'Wednesday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 4,
    name: 'Thursday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 5,
    name: 'Friday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 6,
    name: 'Saturday',
    openhours: 9,
    closehours: 17,
  },
  {

    day: 7,
    name: 'Sunday',
    openhours: 9,
    closehours: 17,
  }];




  HospitalProfileCtrl.getlatlong = () => {
    let address = document.getElementById('address').value;
    // Initialize the Geocoder
    let geocoder = new google.maps.Geocoder();
    if (geocoder) {

      geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          HospitalProfileCtrl.editObj.latitude = results[0].geometry.location.lat();
          HospitalProfileCtrl.editObj.longitude = results[0].geometry.location.lng();
        }
      });
    }
  };


  HospitalProfileCtrl.update = () => {
    HospitalProfileCtrl.hospital.schedules = HospitalProfileCtrl.schedule;
    HospitalProfile.update(HospitalProfileCtrl.hospital)
    .then(hospital => {HospitalProfileCtrl.hospital = hospital; displayHospital();});
  };

  HospitalProfileCtrl.submitReview = () => {
    HospitalProfile.postReview(HospitalProfileCtrl.id, HospitalProfileCtrl.reviewContent)
    .then(getReviews);
  };

      ////////////////////////////////////////
      //       BEHOLD, THE FORBIDDEN ZONE.
      ////////////////////////////////////////


      $scope.options = {
        chart: {
          type: 'discreteBarChart',
          height: 200,
          x: function(d){return d.label;},
          y: function(d){return d.value;},
          showValues: true,
          color: function(){return '#700000';},
          valueFormat: function(d){ return d3.format(',f')(d); },
          dispatch: {

          },
          discretebar: {
            dispatch: {
              elementClick: function(e) {$scope.$apply();}
            }
          },
          callback: function(e){console.log('! callback !')}
        }
      };

      $scope.data = [
      {
        key: "Blood Levels",
        values: [
        {
          "label" : "O+" ,
          "value" : 8
        },
        {
          "label" : "O-" ,
          "value" : 5
        },
        {
          "label" : "A+" ,
          "value" : 18
        },
        {
          "label" : "A-" ,
          "value" : 8
        },
        {
          "label" : "B+" ,
          "value" : 17
        },
        {
          "label" : "B-" ,
          "value" : 7
        },
        {
          "label" : "AB+" ,
          "value" : 16
        },
        {
          "label" : "AB-" ,
          "value" : 6
        }
        ]
      }
      ];

      ////////////////////////////////////////
      //  FAREWELL, FROM THE FORBIDDEN ZONE.
      ////////////////////////////////////////
    }]);
