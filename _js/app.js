'use strict';

var projectApp = angular.module('projectApp',['ngRoute']);

/*Блок отображения div'а областей изменения данных*/

projectApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/organization', {
		templateUrl: './_data/organization.html',
		controller: 'organizationViewCtrl'
	}).
	when('/map', {
		templateUrl: './_data/map.html',
		controller: 'mapViewCtrl'
	}).
	when('/materials', {
		templateUrl: './_data/materials.html',
		controller: 'materialsViewCtrl'
	}).
	when('/works', {
		templateUrl: './_data/works.html',
		controller: 'worksViewCtrl'
	}).
	when('/pipls', {
		templateUrl: './_data/pipls.html',
		controller: 'piplsViewCtrl'
	}).
	when('/comments', {
		templateUrl: './_data/comments.html',
		controller: 'commentsViewCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

projectApp.controller('organizationViewCtrl',['$scope','dataFctrl', function($scope, dataFctrl){

	$scope.dataFctrl = dataFctrl;
	$scope.message = 'Организация';
	// console.log("Url", $scope.message);
}]);

projectApp.controller('mapViewCtrl',['$scope','dataFctrl', function($scope, dataFctrl){

	$scope.dataFctrl = dataFctrl;
	$scope.message = 'Карта';
	// console.log("Url", $scope.message);
}]);

projectApp.controller('materialsViewCtrl',['$scope','$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_php/get_materials_price.php')
	.then(function(response){
		$scope.materialsPrice = response.data;
		// console.log("Data:", response.data);
	});
}]);

projectApp.controller('worksViewCtrl',['$scope','$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
		$http.get('_php/get_works_price.php')
		.then(function(response){
			$scope.worksPrice = response.data;
			 // console.log("Data:", response.data);
		});
}]);

projectApp.controller('piplsViewCtrl',['$scope','$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
		$http.get('_php/get_works_pipls.php')
		.then(function(response){
			$scope.pipls = response.data;
			 // console.log("Data:", response.data);
		});
}]);

projectApp.controller('commentsViewCtrl',['$scope','$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
}]);
/*Конец блока отображения областей изменения данных*/

/*Блок таблица - перечень проектов*/
projectApp.controller('AllProjectsCtrl',['$scope','$http','dataFctrl', function($scope,$http, dataFctrl){

	$scope.dataFctrl = dataFctrl;

	$http.get('_php/get_data.php')
	.then(function(response){
		$scope.projects = response.data;
		// console.log("Data:", response.data);
	});
	$scope.projectView = function(id){
		$http(
			{
				method: 'POST',
				url: '_php/get_project_data.php', 
				data: {
					ID: id
				}
			})
		.then(function(response){
			$scope.dataFctrl.project = response.data;
			// console.log("Data:", response.data);
		});
		
		$http(
			{
				method: 'POST',
				url: '_php/get_project_materials.php', 
				data: {
					ID: id
				}
			})
		.then(function(response){
			$scope.dataFctrl.materials = response.data;
			// console.log("Data:", response.data);
		});
		
		$http(
			{
				method: 'POST',
				url: '_php/get_project_works.php', 
				data: {
					ID: id
				}
			})
		.then(function(response){
			$scope.dataFctrl.works = response.data;
			// console.log("Data:", response.data);
		});

		$http(
		{
			method: 'POST',
			url: '_php/get_project_comments.php', 
			data: {
				ID: id
			}
		})
		.then(function(response){
			$scope.dataFctrl.comments = response.data;
			// console.log("Data:", response.data);
		});


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
		$scope.dataFctrl.project = {};
		$scope.dataFctrl.materials = {};
		$scope.dataFctrl.works = {};
		$scope.dataFctrl.pipls = {};
		$scope.dataFctrl.comments = {};
		// console.log("Project", $scope.dataFctrl.project.materials)
	};
}]);
/* Конец блока: Отображение блока с информацией по проекту*/
/* Блок Отображение расходников и материалов для проекта*/
projectApp.controller('materialsCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$scope.materials = $scope.dataFctrl.materials;
}]);
/* Конец блока Отображение расходников и материалов для проекта*/
/*Блок отображения работ по проекту*/
projectApp.controller('worksCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_data/works.data.json')
	.then(function(response){
		$scope.works = response.data;
		// console.log("Data works:", response.data);
	});
}]);
/*Конец блока отображения работ по проекту*/
/*Блок отображения сотрудников учавствующих в проекте*/
projectApp.controller('piplsCtrl',['$scope', '$http', 'dataFctrl', function($scope, $http, dataFctrl){
	$scope.dataFctrl = dataFctrl;
	$http.get('_data/project.pipls.data.json')
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
