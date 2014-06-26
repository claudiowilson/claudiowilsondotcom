'use strict';

var claudiowilsondotcom = angular.module('claudiowilsondotcom', 
	['ngRoute','cwControllers']);

claudiowilsondotcom.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/index', {
			templateUrl : 'partials/add.html',
			controller: 'searchAlbumController'
		});
}]);
