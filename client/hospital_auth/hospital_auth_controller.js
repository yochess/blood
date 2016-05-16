app.controller('HospitalAuthController', ['$window','$routeParams' , '$rootScope',  'HospitalAuth', function($window, $routeParams, $rootScope, HospitalAuth) {
  let HospitalAuthCtrl = this;
  HospitalAuthCtrl.signupObj = {};
  HospitalAuthCtrl.loginObj = {};
  HospitalAuthCtrl.editObj = {
    bloodObj: {}
  };

  HospitalAuthCtrl.signup = () => {
    HospitalAuth
    .signup(HospitalAuthCtrl.signupObj)
    .then(hospital => {
      $rootScope.NavCtrl.login('hospital', hospital.id);
    })
    .catch(err => {
      console.error(err);
    });
  };

  // travis will reroute on the server side
  HospitalAuthCtrl.login = () => {
    HospitalAuth
    .login(HospitalAuthCtrl.loginObj)
    .then(hospital => {
      $rootScope.NavCtrl.login('hospital', hospital.id);
    })
    .catch(err => {
      console.error(err);
    });
  };
}]);

