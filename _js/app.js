'use strict';

var projectApp = angular.module('projectApp',[]);

projectApp.controller('projectCtrl',['$scope', '$http', function($scope, $http){
	$http.get('_data/project.data.json')
	.then(function(response){
		$scope.project = response.data;
		console.log("Data:", response.data);
	});
}]);