(() => {
  app.service('Appointment', ['$http', function($http) {
    let getAll = () => {
      return $http({
        url: '/api/appointment',
        method: 'GET'
      })
      .then(res => {
        return res.data;
      })
    };

    let post = (data) => {
      return $http({
        url: '/api/appointment',
        method: 'POST',
        data: data
      });
    }

    return {getAll, post};

  }]);
})();
