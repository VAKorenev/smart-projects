'use strict';

var projectApp = angular.module('projectApp',['ngRoute']);

/*Блок отображения div'а областей изменения данных*/

projectApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/organization', {
		templateUrl: 'organization.html',
		controller: 'organizationCtrl'
	}).
	when('/map', {
		templateUrl: 'map.html',
		controller: 'mapCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

projectApp.controller('organizationCtrl',['$scope', function($scope){

	$scope.message = 'Организация';
	console.log("Url", $scope.message);
}]);

projectApp.controller('mapCtrl',['$scope', function($scope){

	$scope.message = 'Карта';
	console.log("Url", $scope.message);
}]);
/*Конец блока отображения областей изменения данных*/

/*Блок таблица - перечень проектов*/
projectApp.controller('AllProjectsCtrl',['$scope','$http','dataFctrl', function($scope,$http, dataFctrl){

	$scope.dataFctrl = dataFctrl;

	$http.get('_data/projects.data.json')
	.then(function(response){
		$scope.projects = response.data;
		// console.log("Data:", response.data);
	});
	$scope.projectView = function(id){
		$scope.dataFctrl.visible = false;
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
/*Конец блока таблица - перечень проектов*/

/* Отображение блока с информацией по проекту*/
projectApp.controller('projectCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	
	$scope.dataFctrl = dataFctrl;

	$scope.projectView = function(){
		$scope.dataFctrl.visible = true;
	};

	$http.get('_data/project.data.json')
	.then(function(response){
		$scope.project = response.data;
		// console.log("Data:", response.data);
	});
}]);
/* Конец блока: Отображение блока с информацией по проекту*/
/* Блок Отображение расходников и материалов для проекта*/
projectApp.controller('materialsCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_data/materials.data.json')
	.then(function(response){
		$scope.materials = response.data;
		// console.log("Data materials:", response.data);
	});
}]);
/* Конец блока Отображение расходников и материалов для проекта*/
/*Блок отображения работ по проекту*/

/*Конец блока отображения работ по проекту*/
projectApp.controller('worksCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_data/works.data.json')
	.then(function(response){
		$scope.works = response.data;
		// console.log("Data works:", response.data);
	});
}]);
/*Блок отображения сотрудников учавствующих в проекте*/
projectApp.controller('piplsCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_data/pipls.data.json')
	.then(function(response){
		$scope.pipls = response.data;
		// console.log("Data works:", response.data);
	});
}]);
/*Конец блока отображения сотрудников учавствующих в проекте*/

/*Блок фабрика для обмена данными между контролами*/
projectApp.factory('dataFctrl',function(){
	return {
		visible: true
	};
});
/*Конец блока фабрика для обмена данными между контролами*/
