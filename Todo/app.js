angular.module('todoApp', [])

.controller('todoCtrl', [function() {
  // vm stands for view model
  var vm = this;

  vm.todos = [
    {text: 'learn angular', done: true},
    {text: 'build an angular app', done: false}
  ];

  vm.addTodo = function() {
    if (!vm.todoText) return;
    vm.todos.push({text: vm.todoText, done: false});
    vm.todoText = '';
  };

  vm.remaining = function() {
    var count = 0;
    angular.forEach(vm.todos, function(todo) {
      count += todo.one ? 0 : 1;
    });
    return count;
  };

  vm.archive = function() {
    var oldTodos = vm.todos; 
    vm.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) {
        vm.todos.push(todo);
      }
    });
  };
}]);
