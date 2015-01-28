angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
    })
    .when('/about', {
      templateUrl: 'app/views/pages/about.html'
    })
    .when('/contact', {
      templateUrl: 'app/views/pages/contact.html'
    })
    .when('/signup', {
      templateUrl: 'app/views/pages/signup.html',
      controller: 'mainController',
      controllerAs: 'signup'
    })
    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'mainController',
      controllerAs: 'login'
    })
    .when('/secret', {
      templateUrl: 'app/views/pages/secret.html',
      controller: 'mainController',
      loginRequired: true
    });

    $locationProvider.html5Mode(true);
});
