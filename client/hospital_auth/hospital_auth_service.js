(() => {
  app.factory('HospitalAuth', function($http) {

    let signup = (user) => {
      return $http({
        method: 'POST',
        url: '/api/profiles',
        data: user
      })
      .then(res => { return res; })
      .catch(err => { return console.error(err); });
    };

    let login = (user) => {
      return $http({
        method: 'POST',
        url: '/api/profiles',
        data: user
      })
      .then(res => { return res; })
    };

    return {
      signup: signup,
      login: login
    };
  })
})();
