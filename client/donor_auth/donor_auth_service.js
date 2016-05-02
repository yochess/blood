(() => {
  app.factory('DonorAuth', function($http, $window) {

    let signup = (user) => {
      // return $http({
      //   method: 'POST',
      //   url: '/auth/donor/signup',
      //   data: user
      // })
      // .then(res => {
      //   if (res.status === 200) {
      //     $window.location.assign('#donor/edit');
      //   } else {
      //     $window.location.assign('#donor/signup');
      //   }
      // });
    };

    let login = (user) => {
      // return $http({
      //   method: 'POST',
      //   url: '/auth/donor/login',
      //   data: user
      // })
      // .then(res => {
      //   if (res.status === 200) {
      //     $window.location.assign('#donor/edit');
      //   } else {
      //     $window.location.assign('#donor/signup');
      //   }
      // });
    };

    return {signup, login};
  });
})();