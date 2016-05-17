(() => {
  app.controller('CalendarController', ['$scope','$rootScope', '$controller', '$http', '$window', '$routeParams', 'Calendar', 'Event', 'Feed', 'Buddy', 'HospitalProfile', 'Appointment', function($scope, $rootScope, $controller, $http, $window, $routeParams, Calendar, Event,Feed,Buddy, HospitalProfile, Appointment) {
    let CalendarCtrl = this;
    let hospitalid = $routeParams.hospitalid
    let $calendar = $('#calendar');
    let $datetimepicker = $('#datetimepicker').datetimepicker();

    let donorView = (callback) => {
      $window.localStorage.setItem('isHospital', '');
      CalendarCtrl.isHospital = $window.localStorage.getItem('isHospital');
      Calendar.getGoogleSchedule().then(googleEvents => {
        fillDonorCalendar(googleEvents, callback);
      }).catch(err => {
        console.log('you are not logged in google!');
        fillDonorCalendar([], callback);
      });
    };

    let fillDonorCalendar = (googleEvents, callback) => {
      $calendar.fullCalendar('removeEvents');
      $calendar.fullCalendar('addEventSource', googleEvents);
      getAppointmentData(googleEvents, callback);
    };

    let getAppointmentData = (googleEvents, callback) => {
      HospitalProfile.get(hospitalid).then(data => {
        if (!data) {
          callback(null);
          return console.error('invalid hospital id!');
        }
        let currentDate = new Date();
        if (!CalendarCtrl.dontMakeAppointments) {
          let appointments = _.flatten(_.range(31).map(counter => {
            currentDate = new Date(currentDate.getTime() + (1000 * 60 * 60 * 24));
            let dayIndex = (currentDate.getDay() + 6) % 7;
            return {
              currentDate: currentDate,
              openhour: data.schedules[dayIndex].openhours,
              endhour: data.schedules[dayIndex].closehours,
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
          checkOverlap(appointments, googleEvents);
          callback(appointments);
        } else {
          callback([]);
        }
      });
    };

    let checkOverlap = (appointments, googleEvents) => {
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
          } else {
            endIndex = midIndex - 1;
          }
        }

        if (isOverlap) {
          removeEventData(appointments, midIndex);
        }
      }
    };

    let removeEventData = (appointments, index) => {
      appointments.splice(index, 1);
    };

    let hospitalView = (callback) => {
      Appointment.getAll().then(appointments => {
        Event.getAll().then(events => {
          console.log('1. you are logged in as hospital');
          $window.localStorage.setItem('isHospital', 'hello world');
          CalendarCtrl.isHospital = $window.localStorage.getItem('isHospital');
          CalendarCtrl.fillHospitalCalendar(appointments, events, callback);
        })
      }).catch(err => {
        console.log('2. you are not logged in as a hospital: ', err);
        $window.localStorage.setItem('isHospital', '');
        CalendarCtrl.isHospital = $window.localStorage.getItem('isHospital');
      })
    };

    CalendarCtrl.buddy= false;
    CalendarCtrl.view = {
      time: {}
    };
    CalendarCtrl.isHospital = !!($window.localStorage.getItem('isHospital'));

    $calendar.fullCalendar({
      timezone: 'local',
      displayEventEnd: true,
      events: (start, end, timezone, callback) => {
        hospitalid ? donorView(callback) : hospitalView(callback);
      },
      eventClick: (calEvent, jsEvent, view) => {
        console.log('calEvent: ', calEvent);
        if (CalendarCtrl.isHospital) {
          if (calEvent.datum.donorId) {
            $window.open(`/profile/${calEvent.datum.donorId}`, '_blank');
          } else {
            $window.open(`/event/${calEvent.datum.id}`, '_blank');
          }
          return;
        }

        // this should be less hack-ish
        if (calEvent.title === 'Slot Available') {
          let $box1 = $('.modal.box1');
          let $box3 = $('.modal.box3');
          CalendarCtrl.setView(calEvent);
          $scope.$apply();
  //blood buddy
          if(CalendarCtrl.buddy){
            $box3.modal();
          } else {
            $box1.modal();
          }
        }
        // same here
        if (calEvent.title === 'Your appointment') {
          $window.open(`/hospital/profile/${hospitalid}`, '_blank');
        }
      }
    });

    CalendarCtrl.fillHospitalCalendar = (appointments, events, callback) => {
      appointments = appointments.filter(datum => {
        return datum.time;
      }).map(datum => {
        return {
          title: `Appointment with ${datum.donor.name}`,
          start: new Date(datum.time),
          datum: datum
        };
      });
      events = events.filter(datum => {
        return datum.time;
      }).map(datum => {
        return {
          title: `Event`,
          start: new Date(datum.time),
          datum: datum,
          backgroundColor: 'red'
        }
      });
      callback(appointments.concat(events));
    };

    CalendarCtrl.googleSignin = () => {
      Calendar.getUrl().then(res => {
        let newWindow = $window.open(res.data, 'AuthPage', 'width=500px,height=700px');
        // e.data is a string with the code
        $window.onmessage = (e) => {
          let index = e.data.lastIndexOf('code=');
          let code = e.data.substring(index + 5).replace('#', '');
          newWindow.close();
          Calendar.getToken(code).then(res => {
            $calendar.fullCalendar('refetchEvents');
          });
        };
      });
    };

    CalendarCtrl.reload = () => {
      $calendar.fullCalendar('refetchEvents');
    };

    CalendarCtrl.createEvent = (startDate, endDate, title) => {
      startDate = startDate || CalendarCtrl.dateTime;
      endDate = endDate || CalendarCtrl.dateTime || startDate;
      title = title || CalendarCtrl.title || 'New Event';

      let data = {
        summary: 'Your appointment',
        start: {
          dateTime: startDate,
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: startDate,
          timeZone: 'America/Los_Angeles'
        }
      };

      if (!CalendarCtrl.isHospital) {
        Calendar.postToGoogle(data).then(res => {
          $calendar.fullCalendar('removeEvents');
          $calendar.fullCalendar('addEventSource', [{
            title: title,
            // datum: res.data,
            start: startDate
          }]);
        })
        .catch(err => {
          console.log('you are not logged in gmail!');
          $calendar.fullCalendar('removeEvents');
          $calendar.fullCalendar('addEventSource', [{
            title: title,
            // datum: err.data,
            start: startDate,
            // backgroundColor: 'yellow'
          }]);
        });
      } else {
        Event.post({
          hospitalId: hospitalid,
          time: CalendarCtrl.dateTime
        }).then(data => {
          $calendar.fullCalendar('addEventSource', [{
            title: title,
            start: CalendarCtrl.dateTime,
            datum: data,
            backgroundColor: 'red'
          }]);
        }).catch(err => {
          console.error('error in createEvent', err);
        })
      }
    };

    CalendarCtrl.setView = (calEvent) => {
      let month = calEvent.start.month() + 1;
      let date = calEvent.start.date();
      let hour = calEvent.start.hour();
      let minute = calEvent.start.minutes();
      minute = minute < 10 ? minute + '0' : minute;

      CalendarCtrl.view.time.start = calEvent.start;
      CalendarCtrl.view.time.end = calEvent.end;
      CalendarCtrl.view.time.print = `${month}/${date} @ ${hour}:${minute}`;
    };

    CalendarCtrl.firstModal = () => {
      let $box2 = $('.modal.box2');
      let $inputs = $('.modal').find('input');

      $inputs.each((index, input) => {
        input.checked = false;
      });

      $box2.modal();
    };

    CalendarCtrl.buddyoneModal = () => {
      let $box4 = $('.modal.box4');
      let $inputs = $('.modal').find('input');

      $inputs.each((index, input) => {
        input.checked = false;
      });

      $box4.modal();
    };

    CalendarCtrl.buddytwoModal = () => {
      //share on fb
      let $input1 = $('.checkbox.input1').find('input');
      $("#fb-share-button").show();
      let $input3 = $('.checkbox.input3').find('input');
      CalendarCtrl.buddyRequest(CalendarCtrl.view.time.start, hospitalid, $input3);
    };
    CalendarCtrl.buddyRequest = (start, hospitalId, $input3) =>
    {
      Buddy.requestBuddy(start,hospitalId)
      .then(buddy => {
        if ($input3.is(':checked')) {
         let content = "Looking for a buddy on" + " " + CalendarCtrl.view.time.print +" " + "http://localhost:8080/#bloodbuddy/"+buddy.id ;
         Feed.submit(content, {latitude: $rootScope.latitude, longitude: $rootScope.longitude});
       };
         $window.location.assign(`#bloodbuddy/${buddy.id}`);



      });
    };

    CalendarCtrl.secondModal = () => {

      let $input1 = $('.checkbox.input1').find('input');
      let $input2 = $('.checkbox.input2').find('input');

      CalendarCtrl.dontMakeAppointments = true;
      CalendarCtrl.processRequest($input1, $input2);
    };

    // this will need refactoring and modularizing!!
    CalendarCtrl.processRequest = ($input1, $input2) => {
      // save appointment
      Appointment.post({
        hospitalId: hospitalid,
        time: CalendarCtrl.view.time.start,
        type: 1
      }).then(res => {
          console.log('appointment made! ', res);
          CalendarCtrl.createEvent(CalendarCtrl.view.time.start, CalendarCtrl.view.time.end, 'Your appointment');
        })
        .catch(err => {
          console.log('error in making appointment! ', err);
        });

      // share to facebook if checked
      if ($input1.is(':checked')) {
        console.log('todo: share on facebook');
      };

      // save event if checked
      if ($input2.is(':checked')) {
        $http.post('/api/event', {
          hospitalId: hospitalid,
          time: CalendarCtrl.view.time.start
        }).then(res => {
          console.log('event res: ', res);
        }).catch(err => {
          console.log('error: ', err);
        });
      }
    }


  }]);
})();
