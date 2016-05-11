(() => {
  app.controller('CalendarController', ['$http', '$window', '$routeParams', '$scope', 'Calendar', function($http, $window, $routeParams, $scope, Calendar) {
    let CalendarCtrl = this;
    let $calendar = $('#calendar');

    CalendarCtrl.time = {};

    $calendar.fullCalendar({
      timezone: 'local',
      displayEventEnd: true,
      events: (start, end, timezone, callback) => {
        Calendar.getCalendarEvents().then(res => {
          CalendarCtrl.isLoggedin = true;
          CalendarCtrl.googleEvents = res.data;
          CalendarCtrl.fillCalendar(callback);
        }).catch(err => {
          CalendarCtrl.isLoggedin = false;
          CalendarCtrl.googleEvents = [];
          CalendarCtrl.fillCalendar(callback);
        });
      },
      eventClick: (calEvent, jsEvent, view) => {
        if (!CalendarCtrl.isLoggedin) {
          return console.log('you are not logged in!');
        }
        // this should be less hack-ish
        if (calEvent.title === 'Slot Available') {
          let $box1 = $('.modal.box1');
          CalendarCtrl.setView(calEvent);
          $scope.$apply();
          $box1.modal();
        }
      }
    });

    CalendarCtrl.googleSignin = () => {
      Calendar.getUrl().then(res => {
        let newWindow = $window.open(res.data, 'AuthPage', 'width=500px,height=700px');
        // e.data is a string with the code
        $window.onmessage = (e) => {
          let index = e.data.lastIndexOf('code=');
          let code = e.data.substring(index + 5).replace('#', '');
          newWindow.close();
          Calendar.getToken(code).then(res => {
            console.log('You are authenticated!');
            $calendar.fullCalendar('refetchEvents');
          });
        };
      });
    };

    CalendarCtrl.fillCalendar = (callback) => {
      // this is hacky currently and can be optimized
      $calendar.fullCalendar('removeEvents');
      $calendar.fullCalendar('addEventSource', CalendarCtrl.googleEvents);
      CalendarCtrl.getAppointmentData(CalendarCtrl.checkOverlap, callback);
    };

    CalendarCtrl.reload = () => {
      $calendar.fullCalendar('refetchEvents');
    };

    CalendarCtrl.getAppointmentData = (checkOverlap, callback) => {
      Calendar.getHospitalProfile($routeParams.hospitalid).then(res => {
        if (!res.data) {
          callback(null);
          return console.log('no hospital id in params!');
        }
        let currentDate = new Date();
        let dayIndex, startHour, endHour;
        CalendarCtrl.appointments = _.flatten(_.range(31).map(counter => {
          currentDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24));
          dayIndex = (currentDate.getDay() + 6) % 7;
          return {
            currentDate: currentDate,
            openhour: res.data.schedules[dayIndex].openhours,
            endhour: res.data.schedules[dayIndex].closehours,
          };
        }).filter(data => {
          return !!data.openhour;
        }).map(data => {
          return _.range(data.openhour, data.endhour).map(hour => {
            return {
              title: 'Slot Available',
              start: data.currentDate.setHours(hour, 0, 0, 0),
              backgroundColor: '#378006'
            };
          });
        }));
        checkOverlap(CalendarCtrl.appointments, CalendarCtrl.googleEvents);
        callback(CalendarCtrl.appointments);

      })
    };

    CalendarCtrl.checkOverlap = (appointments, googleEvents) => {
      for (let googleEvent of googleEvents) {
        let isOverlap = false;
        let startIndex = 0;
        let endIndex = appointments.length -1;
        let midIndex, appointment, start, end;

        while (!isOverlap && (startIndex <= endIndex)) {
          midIndex = Math.floor((startIndex + endIndex) / 2);
          startTime = new Date(googleEvent.start).getTime();
          endTime = new Date(googleEvent.end).getTime();
          appointmentTime = appointments[midIndex].start;

          if((appointmentTime >= startTime) && (appointmentTime <= endTime)) {
            isOverlap = true;
          } else if (appointmentTime < startTime) {
            startIndex = midIndex + 1;
          } else if (appointmentTime > endTime) {
            endIndex = midIndex - 1;
          } else {
            console.log('wtf, this is not suppose to happen!');
            break;
          }
        }

        if (isOverlap) {
          CalendarCtrl.removeEventData(appointments, midIndex);
        }
      }
    };

    CalendarCtrl.createEvent = (startDate, endDate) => {
      startDate = startDate || CalendarCtrl.dateTime;
      endDate = endDate || CalendarCtrl.dateTime || startDate;

      Calendar.postCalendarEvent(startDate, endDate).then(res => {
        if (res.status === 201) {
          $calendar.fullCalendar('refetchEvents');
        }
      });
    };

    CalendarCtrl.removeEventData = (events, index) => {
      console.log('removed!');
      CalendarCtrl.appointments.splice(index, 1);
    };

    CalendarCtrl.setView = (calEvent) => {
      let month = calEvent.start.month();
      let day = calEvent.start.day();
      let hour = calEvent.start.hour();
      let minute = calEvent.start.minutes();
      minute = minute < 10 ? minute + '0' : minute;

      CalendarCtrl.time.start = calEvent.start;
      CalendarCtrl.time.end = calEvent.end;

      CalendarCtrl.time.print = `${month}/${day} @ ${hour}:${minute}`;
    };

    CalendarCtrl.firstModal = () => {
      let $box2 = $('.modal.box2');
      let $inputs = $('.modal').find('input');

      $inputs.each((index, input) => {
        input.checked = false;
      });

      $box2.modal();
    };

    CalendarCtrl.secondModal = () => {

      let $input1 = $('.checkbox.input1').find('input');
      let $input2 = $('.checkbox.input2').find('input');

      CalendarCtrl.createEvent(CalendarCtrl.time.start, CalendarCtrl.time.end);

      if ($input1.is(':checked')) {
        console.log($input1.val());
      };

      if ($input2.is(':checked')) {
        console.log($input2.val());
      }
    };


  }]);
})();
