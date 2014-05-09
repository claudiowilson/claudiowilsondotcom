var firebaseTokenGenerator = require('firebase-token-generator'),
	firebase = require('firebase');

var tokenGenerator = new firebaseTokenGenerator('');
var token = tokenGenerator.createToken();

var albumRef = new firebase('https://glowing-fire-8113.firebaseio.com/albums');

albumRef.auth(token, function(err) {
	if(err) {
		console.log("Authentication failed!");
	} else {
		console.log("Login succeeded!");
	}
});

var addAlbum = function(album, callback) {
	if(album["album"] && album["artist"] && album["image"]) {
		albumRef.push().set(album);
		callback(null);
	}
	callback(new Error("Album JSON was missing some items"));
};



exports.addAlbum = addAlbum;
