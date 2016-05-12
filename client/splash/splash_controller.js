app.controller('SplashController', ['$routeParams', '$scope', function($routeParams, $scope) {
  let SplashCtrl = this;

  loadLiquidFillGauge("fillgauge2", 28);

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
                  "value" : 6
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

