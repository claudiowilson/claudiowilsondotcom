'use strict';

var claudiowilsondotcom = angular.module('claudiowilsondotcom', 
	['ngRoute','cwControllers']);

claudiowilsondotcom.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/swag', {
			templateUrl : 'index.html',
			controller : 'albumController'
		});
}]);
