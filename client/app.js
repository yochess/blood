const app = angular.module('blood', [
  'ngRoute'
  ])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider

  .when('/', {
    templateUrl: 'bloodMap/bloodMap.html',
    controller: 'BloodMapController',
  })

  .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'ProfileCtrl'
  })

    .otherwise({
      redirectTo: '/'
  });


});
