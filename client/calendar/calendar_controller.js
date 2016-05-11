(() => {
  app.controller('CalendarController', ['$http', '$window', '$routeParams', '$scope', 'Calendar', function($http, $window, $routeParams, $scope, Calendar) {
    let CalendarCtrl = this;
    let $calendar = $('#calendar');

    CalendarCtrl.possibleEvents = [];
    CalendarCtrl.googleEvents = [];
    CalendarCtrl.time = {};
    CalendarCtrl.isLoggedin = false;


    $calendar.fullCalendar({
      timezone: 'local',
      displayEventEnd: true,
      events: (start, end, timezone, callback) => {
        Calendar.getCalendarEvents().then(res => {
          callback(res.data);
        }).catch(err => {
          console.log('you are probably not logged in: ', err);
        });
      },
      eventClick: (calEvent, jsEvent, view) => {
        if (!CalendarCtrl.isLoggedin) {
        }

        // this should be less hack-ish
        if (calEvent.title === 'Slot Available') {
          let $box1 = $('.modal.box1');
          // console.log(calEvent.title);
          // modal.find('.modal-title').html('Schedule an Appointment');
          CalendarCtrl.setView(calEvent);
          $scope.$apply();
          $box1.modal();
          // modal.find('.modal-title').html('Schedule an Appointment').modal();

        }
      }
    });

    CalendarCtrl.googleSignin = () => {
      $http.get('/auth/url').then(res => {
        let url = res.data;
        let newWindow = $window.open(url, 'AuthPage', 'width=500px,height=700px');

        // grabs message with code from oauthcallback.html and stores it in `e`
        $window.onmessage = (e) => {
          let urlWithCode = e.data;
          let index = urlWithCode.lastIndexOf('code=');
          let code = urlWithCode.substring(index + 5).replace('#', '');
          newWindow.close();

          $http.get('/auth/googleToken?code=' + code).then(res => {
            console.log('You are authenticated!');
            // CalendarCtrl.getGoogleData();
            CalendarCtrl.isLoggedin = true;
            $calendar.fullCalendar('refetchEvents');
            // $window.localStorage.setItem('signedin', true);
          });
        };
      });
    };


  }]);
})();
