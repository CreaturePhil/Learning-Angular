angular.module('authService', [])

.factory('AuthToken', function($window) {
  return {
    getToken: function() {
      return $window.localStorage.getItem('token');
    },

    setToken: function(token) {
      if (!token) $window.localStorage.removeItem('token');
      $window.localStorage.setItem('token', token);
    }
  };
})

.factory('Auth', function($http, $q, AuthToken) {
  return {
    authenticate: function(url, username, password) {
      return $http.post('/' + url, { username: username, password: password })

      .success(function(data) {
        AuthToken.setToken(data.token);
        return data;
      });
    },

    logout: function() {
      AuthToken.setToken();
    },

    isLoggedIn: function() {
      console.log('isLoggedIn'+AuthToken.getToken());
      if (!AuthToken.getToken()) return false;
      return true;
    }
  };   
})

.factory('AuthInterceptor', function($q, $location, AuthToken) {
  return {
    request: function(config) {
      var token = AuthToken.getToken();

      if (token) {
        config.headers['X-Access-Token'] = token;
      }

      return config;
    },

    responseError: function(response) {
      if (response.status === 403) {
        $location.path('/login');
      }

      return $q.reject(response);
    }
  };
});