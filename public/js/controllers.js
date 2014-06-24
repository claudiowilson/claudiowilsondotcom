'use strict';

var cwController = angular.module('cwControllers', ['firebase']);

cwController.controller('albumController', ['$scope', '$firebase', '$window', function($scope, $firebase, $window) {
	var ref = new Firebase('https://glowing-fire-8113.firebaseIO.com/albums');
	var height = $window.innerHeight;
	var width = $window.innerWidth;
	$scope.albums = $firebase(ref);
	console.log($scope.albums);
}]);

