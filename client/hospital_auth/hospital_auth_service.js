(() => {
  app.factory('HospitalAuth', function($http) {

    let signup = (user) => {
      return $http({
        method: 'POST',
        url: '/auth/hospital/signup',
        data: user
      })
      .then(res => {
        if (res.status === 200) {
          window.location.assign('#hospital/edit');
        } else {
          window.location.assign('#hospital/signup');
        }
      });
    };

    let login = (user) => {
      return $http({
        method: 'POST',
        url: '/auth/hospital/login',
        data: user
      })
      .then(res => {
        if (res.status === 200) {
          window.location.assign('#hospital/edit');
        } else {
          window.location.assign('#hospital/signup');
        }
      });
    };

    let edit = (data) => {
      return $http({
        method: 'POST',
        url: 'api/coolio',
        data: data
      })
      .then(res => { return res; });
    }

    return {
      signup: signup,
      login: login,
      edit: edit
    };
  })
})();
