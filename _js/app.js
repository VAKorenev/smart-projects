'use strict';

var projectApp = angular.module('projectApp',[]);

projectApp.controller('AllProjectsCtrl',['$scope','$http',function($scope,$http){
	$http.get('_data/projects.data.json')
	.then(function(response){
		$scope.projects = response.data;
		console.log("Data:", response.data);
	});
	$scope.projectView = function(id){
		console.log("кликнули на строку проекта c ID=",id);
	};
		
	$scope.sortField = undefined;
	$scope.reverse = false;

	$scope.sort = function(fieldName){
		if ($scope.sortField === fieldName) {
			$scope.reverse = !$scope.reverse;
		} else {
			$scope.sortField = fieldName;
			$scope.reverse = false;
		}
	};
}]);

projectApp.controller('projectCtrl',['$scope', '$http', function($scope, $http){
	$http.get('_data/project.data.json')
	.then(function(response){
		$scope.project = response.data;
		// console.log("Data:", response.data);
	});
}]);