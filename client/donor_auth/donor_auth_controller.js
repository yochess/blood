app.controller('DonorAuthController', ['$window','$rootScope', '$http', 'DonorAuth', function($window, $rootScope, $http, DonorAuth) {
    let DonorAuthCtrl = this;
    DonorAuthCtrl.signupObj = {};
    DonorAuthCtrl.loginObj = {};

    DonorAuthCtrl.signup = () => {
      DonorAuth.signup(DonorAuthCtrl.signupObj);
      $rootScope.NavCtrl.login();
      $window.location.assign('#profile');
    };

    DonorAuthCtrl.login = () => {
      DonorAuth.login(DonorAuthCtrl.loginObj);
      // $http({
      //   method: 'GET',
      //   url: '/something'
      // })
      // .then(() => {
        $rootScope.NavCtrl.login();
        $window.location.assign('#bloodmap');
      // });
      
    };


  }]);
