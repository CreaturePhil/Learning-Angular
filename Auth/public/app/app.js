angular.module('myApp', ['appRoutes', 'authService', 'mainCtrl'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
.run(function($window, $rootScope, $location, Auth) {
  console.log('YO MAMA')
  console.log($window.localStorage.getItem('token'));
  $rootScope.$on('$routeChangeStart', function(event, next) {
    console.log(!Auth.isLoggedIn() && next.loginRequired);
    console.log('auth:'+!Auth.isLoggedIn());
    console.log('log:'+next.loginRequired);
    if (!Auth.isLoggedIn() && next.loginRequired) {
      $rootScope.savedLocation = $location.url();
      $location.path('/login');
    } 
  });
  $window.localStorage.removeItem('token');
})