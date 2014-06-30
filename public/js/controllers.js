'use strict';

var cwController = angular.module('cwControllers', ["firebase"]);

cwController.factory('AlbumService', ['$firebase', function($firebase) {
	var ref = new Firebase('https://glowing-fire-8113.firebaseIO.com/albums');
	return $firebase(ref);
}]);

cwController.controller('albumController', ['$scope','AlbumService', '$http', '$sce', function($scope, factory, $http, $sce) {
	$scope.albums = factory;

	$scope.showAlbum = function(image, artist, album, location, id) {
		$http({method: 'GET', url: '/getsongs/' + id})
		.success(function(data, status) {
			$scope.songs = data.map(function(item) {
				item["preview"] = $sce.trustAsResourceUrl(item["preview"]);
				return item;
			});
			$scope.artistName = artist;
			$scope.albumName = album;
			$scope.location = getLocationText(location);
			$scope.image = image.replace('100x100', '600x600');
		});
	}

	$scope.hideAlbum = function() {
		$scope.image = "";
	}

	var getLocationText = function(location) {
		 var text = "Added by someone in ";
		 if (location.city) {
		  text += location.city + ', ';
		 }
		 
		 if (location.region) {
		  text += location.region + ', ';
		 }
		 
		 if (location.country) {
		  text += location.country;
		 }
		 
		 return text;
	}
}]);

cwController.controller('searchAlbumController', ['$scope','$http', function($scope, $http) {
	$scope.submitAlbum = function() {
		$http({method: 'POST', url:'/newalbum', data : { index : $scope.index }, dataType: 'json'})
		.success(function(data, status) {
			$scope.result = data.added;
			$('#resultText').show();
			$('#resultText').fadeOut(1500);
		});
	}

}]);

cwController.controller('blogIndexController', ['$scope', '$http', function($scope, $http) {
	$http({method: 'GET', url:'/blog/index'})
	.success(function(data, status) {
		$scope.posts = data;
	});
}]);

cwController.controller('blogController', ['$scope', '$http', '$sce', '$routeParams', function($scope, $http, $sce, $routeParams) {
	$http({method: 'GET', url:'/blog/' + $routeParams.blogurl})
	.success(function(data, status) {
		$scope.post = $sce.trustAsHtml(JSON.parse(data));
	});
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
					$('.ui-autocomplete-loading').removeClass("ui-autocomplete-loading");
					scope.$apply();
				}
			}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li>" )
				.append( '<a><img src="' + item.icon + '" height="50" width="50"><span>' + item.label + '</span><br><span style="font-size:small">' + item.artist + "</span></a>" )
				.appendTo( ul );;
			}
		}
	}
});


