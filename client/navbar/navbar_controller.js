(() => {
  app.controller('NavController', ['$window', '$http', function($window, $http) {
    let NavCtrl = this;
    let id = $window.localStorage.getItem('id');

    NavCtrl.isLoggedout = true;
    NavCtrl.isLoggedin = false;

    NavCtrl.login = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', 'something');
        NavCtrl.isLoggedout = false;
        NavCtrl.isLoggedin = true;
      // });
    };

    NavCtrl.logout = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', '');
        NavCtrl.isLoggedout = true;
        NavCtrl.isLoggedin = false;
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
