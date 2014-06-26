'use strict';

var cwController = angular.module('cwControllers', ["firebase"]);

cwController.factory('AlbumService', ['$firebase', function($firebase) {
	var ref = new Firebase('https://glowing-fire-8113.firebaseIO.com/albums');
	return $firebase(ref);
}]);

cwController.controller('albumController', ['$scope','AlbumService', function($scope, factory) {
	$scope.albums = factory;
}]);

cwController.controller('searchAlbumController', ['$scope','$http', function($scope, $http) {
	$scope.submitAlbum = function() {
		$http({method: 'POST', url:'/newalbum', data : $scope.index}).success(function(data, status) {
		});
	}

}]);

cwController.directive('autocomplete', function() {
	return {
		restrict : 'A',
		link : function(scope, elem, attr, ctrl) {
			elem.autocomplete({
				minLength : 2,
				source: function(request, response) {
					$.ajax({
						url : "/search/" + request.term,
						dataType : "json",
						success : function(data) {
							response(data.map(function(x) {
								return {
									label : x["album"],
									value : x["album]"],
									artist : x["artist"],
									icon : x["image"],
									index : x["index"]
								}
							}));
						},
						error: function(result) {
							$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
						}
					});
				},
				select : function(event, ui) {
					scope.index = ui.item.index;
					scope.image = ui.item.icon;
					scope.albumName = ui.item.value;
					scope.artistName = ui.item.artist;
					scope.$apply();
					$('#albumSelection').show();
				}
			}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li>" )
				.append( '<a><img src="' + item.icon + '" height="50" width="50"><span>' + item.label + '</span><br><span style="font-size:small">' + item.artist + "</span></a>" )
				.appendTo( ul );;
			}
		}
	}
});


