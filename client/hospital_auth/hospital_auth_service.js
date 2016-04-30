(() => {
  app.factory('HospitalAuth', function($http) {

    let signup = (user) => {
      return $http({
        method: 'POST',
        url: '/api/something',
        data: user
      })
      .then(res => { return res; })
      .catch(err => { return err; });
    };

    let login = (user) => {
      return $http({
        method: 'POST',
        url: '/api/something_else',
        data: user
      })
      .then(res => { 
        return res; 
      })
      .catch(err => { 
        return err; 
      });
    };

    let edit = (data) => {
      return $http({
        method: 'POST',
        url: 'api/coolio',
        data: data
      })
      .then(res => { return res; })
      .catch(err => { return err; });
    }

    return {
      signup: signup,
      login: login,
      edit: edit
    };
  })
})();
