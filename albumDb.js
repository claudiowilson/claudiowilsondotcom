var firebaseTokenGenerator = require('firebase-token-generator'),
	firebase = require('firebase');

var tokenGenerator = new firebaseTokenGenerator('');
var token = tokenGenerator.createToken({"not" : "null"});
var duplicates = {};

var albumRef = new firebase('https://glowing-fire-8113.firebaseio.com/albums');

albumRef.auth(token, function(err) {
	if(err) {
		console.log("Authentication failed!");
	} else {
		console.log("Login succeeded!");
	}
});

var addAlbum = function(album, ipAddress, callback) {
	album["location"] = ipAddress;
	if(album["album"] && album["artist"] && album["image"] && !duplicates[album["image"]]) {
		albumRef.push().set(album);
		callback(null);
	}
	callback(new Error("Album JSON was missing some items or was a duplicate"));
};

albumRef.on('child_added', function(snapshot) {
	duplicates[snapshot.val()["image"]] = true;
});


exports.addAlbum = addAlbum;
