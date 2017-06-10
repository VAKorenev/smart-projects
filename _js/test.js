
var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.

   when('/addStudent', {
      templateUrl: 'addStudent.htm',
      controller: 'AddStudentController'
   }).

   when('/viewStudents', {
      templateUrl: 'viewStudents.htm',
      controller: 'ViewStudentsController'
   }).

   otherwise({
      redirectTo: '/addStudent'
   });
}]);

mainApp.controller('AddStudentController', function($scope) {
   $scope.message = "This page will be used to display add student form";
});

mainApp.controller('ViewStudentsController', function($scope) {
   $scope.message = "This page will be used to display all the students";
});