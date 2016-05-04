(() => {
  app.controller('NavController', ['$window', '$http', function($window, $http) {
    let NavCtrl = this;
    let id = $window.localStorage.getItem('id');

    NavCtrl.isLoggedIn = false;

    NavCtrl.login = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', 'something');
        NavCtrl.isLoggedIn = true;
      // });
    };

    NavCtrl.logout = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', '');
        NavCtrl.isLoggedIn = false;
        window.location='/auth/logout';
      // });
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
