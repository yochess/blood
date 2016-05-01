app.controller('HospitalAuthController', ['$window','$routeParams' ,  '$rootScope',  'HospitalAuth', function($window, HospitalAuth) {
    let HospitalAuthCtrl = this;
    HospitalAuthCtrl.signupObj = {};
    HospitalAuthCtrl.loginObj = {};
    HospitalAuthCtrl.editObj = {
      bloodObj: {}
    };

    HospitalAuthCtrl.signup = () => {
      HospitalAuth
        .signup(HospitalAuthCtrl.signupObj)
        .then(res => { 
          // $window.localStorage.setItem('resObj', res);
          // $window.location.assign('#/');
        })
        .catch(err => {
          console.error(err);
        });
    };

    // travis will reroute on the server side
    HospitalAuthCtrl.login = () => {
      HospitalAuth
        .login(HospitalAuthCtrl.loginObj)
        .then(res => { 
          // $window.localStorage.setItem('id', res.id);
          // $window.location.assign('#');
        })
        .catch(err => {
          console.error(err);
        }); 
    };


  }]);

