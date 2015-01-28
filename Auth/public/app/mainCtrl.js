angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {

  var vm = this;

  $rootScope.$on('$routeChangeStart', function(event, next) {
    console.log(!Auth.isLoggedIn() && next.loginRequired);
    console.log('auth:'+!Auth.isLoggedIn());
    console.log('log:'+next.loginRequired);
    if (!Auth.isLoggedIn() && next.loginRequired) {
      $rootScope.savedLocation = $location.url();
      $location.path('/login');
    } 
  });

  var authenticate = function(url) {
    Auth.authenticate(url, vm.data.username, vm.data.password)
    .success(function(data) {
      if (data.success) {
        $location.path('/');
      } else {
        vm.error = data.message;
      }
    });
  };

  vm.signup = function() {
    authenticate('signup');
  };

  vm.login = function() {
    authenticate('login');
  };

  vm.logout = function() {
    Auth.logout();
    $location.path('/');
  };

});
