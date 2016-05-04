(() => {
  app.controller('CalendarController', ['$http', '$window', function($http, $window) {
    let CalendarCtrl = this;

    CalendarCtrl.googleLogin = () => {
      $http.get('/url').then(res => {
        let url = res.data;
        let newWindow = $window.open(url, 'AuthPage', 'width=500px,height=700px');

        // grabs message with code from oauthcallback.html and stores it in `e`
        $window.onmessage = (e) => {
          let urlWithCode = e.data;
          let index = urlWithCode.lastIndexOf('code=');
          let code = urlWithCode.substring(index + 5).replace('#', '');
          newWindow.close();

          $http.get('/googleToken?code=' + code).then(res => {
            console.log('You are authenticated!');
            $window.location.assign('#calendar');
          });
        };
      });
    }

    CalendarCtrl.reload = () => {
      $window.location.assign('#calendar');;
    };

    // CalendarCtrl.showAllEvents = () => {
    //   $http({
    //     method: 'GET',
    //     url: '/api/calendar/'
    //   })
    //   .then(res => {
    //     CalendarCtrl.events = res.data;
    //   })
    //   .catch(err => {
    //     // console.log('tehre is an error!');
    //   });
    // };

    CalendarCtrl.createEvent = () => {
      $http({
        method: 'POST',
        url: '/api/calendar/',
        data: {
          summary: 'Blood',
          location: '800 Howard St., San Francisco, CA 94103',
          description: 'A chance to hear more about Google\'s developer products.',
          start: {
            dateTime: CalendarCtrl.dateTime,
            timeZone: 'America/Los_Angeles',
          },
          end: {
            'dateTime': CalendarCtrl.dateTime,
            'timeZone': 'America/Los_Angeles',
          },
        }
      })
      .then((res) => {
        if (res.status === 201) {
          console.log('hi');
          $window.location.assign('#calendar');
        }
      });
    };


    // CalendarCtrl.showAllEvents();
  }]);
})();
