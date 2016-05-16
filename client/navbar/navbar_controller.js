(() => {
  app.controller('NavController', ['$window', '$http', function($window, $http) {
    let NavCtrl = this;
    let id = $window.localStorage.getItem('id');
    let type = $window.localStorage.getItem('type');

    NavCtrl.isDonor = false;
    NavCtrl.isHospital = false;

    if (type === 'donor') NavCtrl.isDonor = true;
    if (type === 'hospital') NavCtrl.isHospital = true;

    NavCtrl.login = (type, id) => {
      $window.localStorage.setItem('id', id);
      $window.localStorage.setItem('type', type);
      NavCtrl.isLoggedIn = true;

      if (type === 'donor') {
        NavCtrl.isDonor = true;
        NavCtrl. isHospital = false;
      }

      if (type === 'hospital') {
        NavCtrl.isDonor = false;
        NavCtrl.isHospital = false;
      }
    };

    NavCtrl.logout = () => {
      console.log('logging out');
      $window.localStorage.setItem('id', '');
      $window.localStorage.setItem('type', '');

      NavCtrl.isDonor = false;
      NavCtrl.isHospital = false;

      window.location='/auth/logout';
    };

    return NavCtrl;
  }])
  .directive('navbar', () => {
    return {
      restrict: 'E',
      templateUrl: './navbar/navbar.html',
      controller: 'NavController',
      controllerAs: 'NavCtrl',
      replace: true
    };
  });
})();
