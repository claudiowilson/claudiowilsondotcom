var firebaseTokenGenerator = require('firebase-token-generator'),
	firebase = require('firebase');

var tokenGenerator = new firebaseTokenGenerator('');
var token = tokenGenerator.createToken({"not" : "null"}, {expires : 16725225600});
var duplicates = {};

var albumRef = new firebase('https://glowing-fire-8113.firebaseio.com/albums');
var count = 0;

albumRef.auth(token, function(err) {
	if(err) {
		console.log("Authentication failed!");
	} else {
		console.log("Login succeeded!");
	}
});

var addAlbum = function(album, ipAddress, callback) {
	album["location"] = ipAddress;
	album["time"] = new Date().getTime();
	if(album["album"] && album["artist"] && album["image"] && !duplicates[album["image"]]) {
		albumRef.push().set(album);
		callback(null);
	} else {
		callback(new Error("Album JSON was missing some items or was a duplicate"));
	}
};

albumRef.on('child_added', function(snapshot) {
	duplicates[snapshot.val()["image"]] = true;
	count++;
});


exports.addAlbum = addAlbum;
exports.count = function() {
	return count;
};
