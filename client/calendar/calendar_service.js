(() => {
  app.service('Calendar', ['$http', function($http) {
    let getCalendarEvents = () => {
      return $http.get('/api/calendar').then(res => {
        return res;
      });

    };



    return {
      getCalendarEvents: getCalendarEvents
    };

  }]);
})();
