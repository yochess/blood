(() => {
  app.service('Calendar', ['$http', function($http) {
    let getGoogleSchedule = () => {
      return $http({
        url: '/api/calendar',
        method: 'GET'
      })
      .then(res => {
        return res.data;
      });
    };

    let postToGoogle = (data) => {
      return $http({
        url: '/api/calendar',
        method: 'POST',
        data: data
      });
    };

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

    return {getGoogleSchedule, getToken, getUrl, postToGoogle};

  }]);
})();
