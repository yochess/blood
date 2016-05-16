(() => {
  app.factory('DonorAuth', ['$http', '$window', function($http, $window) {

    let signup = (user) => {
      return $http({
        method: 'POST',
        url: '/auth/donor/signup',
        data: user
      })
      .then(res => {
        if (res.status === 200) {
          $window.location.assign('/profile');
        } else {
          $window.location.assign('/donor/signup');
        }
      })
      .catch(error => {
        console.log("donor cannot sign-up");
      });
    };

    let login = (user) => {
      return $http({
        method: 'POST',
        url: '/auth/donor/login',
        data: user
      })
      .then(res => {
        if (res.status === 200) {
          $window.location.assign('/profile');
        } else {
          $window.location.assign('/donor/signup');
        }
      })
      .catch(error => {
        console.log("donor does not exist");
      });
    };

    return {signup, login};
  }]);
})();
