var app = angular.module('MyApp', ['ngRoute']); //, ['datatables']

app.config(function($routeProvider) {
  $routeProvider
    .when('/user', {
      templateUrl: 'views/users.html',
      controller: 'AppController'
    })
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/about', {
      templateUrl: 'views/about.html'
    })

    .when('/user/:id', {
      templateUrl: 'views/user-detail.html',
      controller: 'AppController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

//////////////////////////////////////////////////////////////
app.controller('AppController', [
  '$scope',
  '$http',
  '$location',
  '$routeParams',
  function($scope, $http, $location, $routeParams) {
    $scope.users = [];
    $scope.user = {};
    ///////////////////////////////////////////
    $scope.getAllUsers = function() {
      $http
        .get('https://jsonplaceholder.typicode.com/users')
        .success(function(data) {
          $scope.users = data;
        });
    };
    /////////////////////////////////////////////
    $scope.DeleteUser = function(index, id) {
      if (confirm('Are You Sure?')) {
        {
          $http
            .delete('https://jsonplaceholder.typicode.com/users/' + id)
            .success(function(data) {
              $scope.users.splice(index, 1);
            });
        }
      }
    };
    /////////////////////////////////////////////
    $scope.getOneUser = function() {
      var id = $routeParams.id;
      $http
        .get('https://jsonplaceholder.typicode.com/users/' + id)
        .success(function(data) {
          $scope.user = data;
        });
    };
    /////////////////////////////////////////////
    $scope.AddUser = function() {
      $http
        .post('https://jsonplaceholder.typicode.com/users/', $scope.user)
        .success(function(response) {
          $scope.users.unshift($scope.user);
        });
    };
  }
]);
