(() => {
  app.service('Calendar', ['$http', function($http) {
    let getCalendarEvents = () => {
      return $http({
        url: '/api/calendar',
        method: 'GET'
      });
    };

    let getHospitalAppointments = () => {
      return $http({
        url: '/api/appointment',
        method: 'GET'
      });
    };

    let postCalendarAppointment = (title, start) => {
      return $http({
        url: '/api/calendar',
        method: 'POST',
        data: {
          start: {
            dateTime: start,
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: start,
            timeZone: 'America/Los_Angeles'
          }
          // end: endDate
        }
      });
    };

    let getHospitalProfile = (hospitalId) => {
      return $http({
        url: `/api/hospital/profile/${hospitalId}`,
        method: 'GET'
      });
    };

    let postAppointment = (hospitalId, time, type) => {
      return $http({
        url: '/api/appointment',
        method: 'POST',
        data: {hospitalId, time, type}
      });
    }

    // this may need to be separated to an auth service
    let getUrl = () => {
      return $http({
        url: '/auth/url',
        method: 'GET'
      });
    }

    // this may need to be separated to an auth service
    let getToken = (code) => {
      return $http({
        url: '/auth/googleToken',
        method: 'GET',
        params: {code: code}
      });
    };



    return {
      getCalendarEvents,
      getHospitalProfile,
      getToken,
      getUrl,
      postCalendarAppointment,
      getHospitalAppointments,
      postAppointment
    };

  }]);
})();
