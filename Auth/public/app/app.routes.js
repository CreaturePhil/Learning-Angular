angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/about', {
      templateUrl: 'app/views/pages/about.html'
    })
    .when('/contact', {
      templateUrl: 'app/views/pages/contact.html'
    });

    $locationProvider.html5Mode(true);
});