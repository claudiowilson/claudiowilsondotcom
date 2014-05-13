var https = require('https'),
	lru = require('lru-cache'),
	banned = {"Miley Cyrus" : true, "Justin Bieber" : true,
				"One Direction" : true, "Katy Perry" : true, "Hannah Montana" : true, "Selena Gomez" : true},
	maxItems = 500,
	options = { max: maxItems,
              	maxAge: 1000 * 60 * 60 },
    cache = lru(options);

var index = 0;

var getAlbums = function(term, callback) {
	var url = "https://itunes.apple.com/search?term=";
	url += term;
	url += '&entity=album&limit=5';

	https.get(url, function(response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		});

		response.on('end', function () {
			var result = JSON.parse(str);
			var obj = result['results'].map(function(album) {
				var item = { "album" : album["collectionName"], 
							"artist" : album["artistName"], 
							"image" : album["artworkUrl100"]};
				if(banned[item["artist"]]) {
					item = {"album" : "NO",
							"artist" : "Just, no.",
							"image" : "https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg"};
				} else {
					cache.set(index, JSON.parse(JSON.stringify(item)));
					item["index"] = index;
					index = (index + 1) % maxItems;
				}

				return item;
			});

			callback(null, obj);
		});
	});
};

var hasUserSelection = function(index) {
	return cache.has(index);
}

var getUserSelection = function(index) {
	return cache.get(index);
}

exports.getAlbums = getAlbums;
exports.hasUserSelection = hasUserSelection;
exports.getUserSelection = getUserSelection;