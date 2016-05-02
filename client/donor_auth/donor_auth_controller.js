app.controller('DonorAuthController', ['$window','$rootScope', '$http', 'DonorAuth', function($window, $rootScope, $http, DonorAuth) {
    let DonorAuthCtrl = this;
    DonorAuthCtrl.signupObj = {};
    DonorAuthCtrl.loginObj = {};

    DonorAuthCtrl.signup = () => {
      DonorAuth.signup(DonorAuthCtrl.signupObj)
      .then((donor) => {
        console.log('hi>>>', donor);
        $rootScope.NavCtrl.login();

      });
    //   $rootScope.NavCtrl.login();
    //   $window.location.assign('#profile');
     };

    DonorAuthCtrl.login = () => {
      console.log('inside controller');
      DonorAuth.login(DonorAuthCtrl.loginObj)
      .then((donor) => {
        $rootScope.NavCtrl.login();

      });
      
    };

  }]);
