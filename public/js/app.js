'use strict';

var claudiowilsondotcom = angular.module('claudiowilsondotcom', 
	['ngRoute','cwControllers']);

claudiowilsondotcom.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/index', {
			templateUrl : 'partials/add.html',
			controller: 'searchAlbumController'
		}).
		when('/contact', {
			templateUrl : 'partials/contact.html'
		}).
		when('/blog/index', {
			templateUrl: '/partials/blogindex.html',
			controller : 'blogIndexController'
		}).
		when('/blog/:blogurl', {
			templateUrl: '/partials/blog.html',
			controller: 'blogController'
		})
		.when('/projects', {
			templateUrl: '/partials/projects.html'
		});
}]);
