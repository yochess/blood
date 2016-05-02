app.controller('DonorAuthController', ['$window','$routeParams' ,  '$rootScope',  'DonorAuth', function($window, $routeParams, $rootScope, DonorAuth) {
    let DonorAuthCtrl = this;
    DonorAuthCtrl.signupObj = {};
    DonorAuthCtrl.loginObj = {};
    DonorAuthCtrl.editObj = {
      bloodObj: {}
    };

    DonorAuthCtrl.signup = () => {
      DonorAuth.signup(DonorAuthCtrl.signupObj);
    };

    DonorAuthCtrl.login = () => {
      DonorAuth.login(DonorAuthCtrl.loginObj);
    };


  }]);
