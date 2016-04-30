(() => {
  app.controller('HospitalAuthController', ['$window', 'HospitalAuth', function($window, HospitalAuth) {
    let HospitalAuthCtrl = this;
    HospitalAuthCtrl.name = '';
    HospitalAuthCtrl.location = '';
    HospitalAuthCtrl.blood = {};

    HospitalAuthCtrl.signup = () => {
      let user = {
        email: HospitalAuthCtrl.email,
        password: HospitalAuthCtrl.password
      };

      HospitalAuth
        .signup(user)
        .then(res => { 
          $window.localStorage.setItem('id', res.id);
          $window.location.assign('/');
        })
        .catch(() => { 
          console.error('This will obviously log'); 
        });
    };

    HospitalAuthCtrl.login = () => {
      let user = {
        email: HospitalAuthCtrl.email,
        password: HospitalAuthCtrl.password
      };

      HospitalAuth
        .signup(user)
        .then(res => { 
          $window.localStorage.setItem('id', res.id);
          $window.location.assign('/');
        })
        .catch(() => { 
          console.error('This will obviously log'); 
        });
    };

    HospitalAuthCtrl.edit = () => {
      console.log('HI');
    }

  }]);
})();
