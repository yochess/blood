let app = angular.module('blood', ['ngRoute'])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider


  .when('/bloodmap', {
    templateUrl: 'bloodMap/bloodMap.html',
    controller: 'BloodMapController',
    controllerAs: 'BloodMapCtrl'
  })

  .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'ProfileCtrl'
  })
  .when('/splash', {
    templateUrl: 'splash/splash.html',
    controller: 'SplashController',
    controllerAs: 'SplashCtrl'

  })
  .when('/hospital/signup', {
    templateUrl: 'hospital_auth/signup/signup.html',
    controller: 'HospitalAuthController',
    controllerAs: 'HospitalAuthCtrl'
  })
  .when('/hospital/login', {
    templateUrl: 'hospital_auth/login/login.html',
    controller: 'HospitalAuthController',
    controllerAs: 'HospitalAuthCtrl'
  })
  .when('/hospital/first_edit', {
    templateUrl: 'hospital_auth/first_edit/edit.html',
    controller: 'HospitalAuthController',
    controllerAs: 'HospitalAuthCtrl'
  })
  .otherwise({
      redirectTo: '/'
  });


});
