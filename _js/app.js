'use strict';

var projectApp = angular.module('projectApp',[]);

projectApp.controller('AllProjectsCtrl',['$scope','$http','showWorksObj', function($scope,$http, showWorksObj){

	$scope.showWorksObj = showWorksObj;

	$http.get('_data/projects.data.json')
	.then(function(response){
		$scope.projects = response.data;
		console.log("Data:", response.data);
	});
	$scope.projectView = function(id){
		$scope.showWorksObj.visible = false;
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

projectApp.controller('projectCtrl',['$scope', '$http', 'showWorksObj', function($scope, $http, showWorksObj){
	
	$scope.showWorksObj = showWorksObj;

	$scope.projectView = function(){
		$scope.showWorksObj.visible = true;
	};

	$http.get('_data/project.data.json')
	.then(function(response){
		$scope.project = response.data;
		// console.log("Data:", response.data);
	});
}]);

projectApp.factory('showWorksObj',function(){
	return {
		visible: true
	};
});
