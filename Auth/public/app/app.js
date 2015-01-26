angular.module('myApp', ['appRoutes'])

.controller('MainCtrl', function() {
	var vm = this;

	vm.message = 'Hello World!';
});