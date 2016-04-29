(() => {
  app.controller('NavController', ['$window', '$http', function($window, $http) {
    let NavCtrl = this;

    // dummy properties for now
    let id = $window.localStorage.getItem('id');
    // let accountType = $window.localStorNage.getItem('type');
    NavCtrl.isLoggedIn = id ? true : false;
    NavCtrl.displayBtn = NavCtrl.isLoggedIn ? 'Logout' : 'Login';

    NavCtrl.logInOrOut = () => {
      NavCtrl.isLoggedIn ? logout() : login();
    };

    let login = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', 'something');
        // $window.localStorage.setItem('type', 'something');
        NavCtrl.isLoggedIn = true;
        NavCtrl.displayBtn = 'Logout';
      // });
    };

    let logout = () => {
      // $http({
      //   method: 'GET',
      //   url: '/'
      // })
      // .then(() => {
        $window.localStorage.setItem('id', '');
        // $window.localStorage.setItem('type', '');
        NavCtrl.isLoggedIn = false;
        NavCtrl.displayBtn = 'Login';
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
