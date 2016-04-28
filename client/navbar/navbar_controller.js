(() => {
  app.controller('NavController', ['$scope', ($scope, $http) => {
    let NavCtrl = this;
    let accountType = $window.localStorage.getItem('type');

    NavCtrl.isLoggedIn = id ? true : false;
    if (accountType === 'user') {
      NavCtrl.profileLink = '/'
    } else {
      NavCtrl.profileLink = '/login'
    }

    NavCtrl.logout = () => {
      $http({
        method: 'GET',
        url: '/logout'
      })
      .then(() => {
        $window.localStorage.setItem('id', '');
        NavCtrl.isLoggedIn = false;
        $window.location.assign('/signin');
      });
    };
  }])
  .directive('navbar', () => {
    return {
      restrict: 'E',
      templateUrl: './navbar.html',
      controller: 'NavController',
      controllerAs: 'NavCtrl',
      replace: true
    };
  });
})();
