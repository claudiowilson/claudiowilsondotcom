var express = require('express'),
	stylus = require('stylus'),
	Firebase = require('firebase'),
	FirebaseTokenGenerator = require('firebase-token-generator');

var app = express();
app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));
var tokenGenerator = new FirebaseTokenGenerator('GyzhDVAARVJ01NtpPDcqUbBJzK0WUyVDXuGauqQr');
var token = tokenGenerator.createToken();

var albumRef = new Firebase('https://glowing-fire-8113.firebaseio.com/albums');
var albumCache = [];

albumRef.auth(token, function(err) {
	if(err) {
		console.log("Authentication failed!");
	} else {
		console.log("Login succeeded!");
	}
});

albumRef.on('child_added', function(snapshot) {
	console.log(JSON.stringify(snapshot.val()) + " added!");
	albumCache.push(snapshot.val());
});

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.render('layout.jade', {albums: JSON.stringify(albumCache)});
});

app.get('/index', function(request, response) {
	response.render('index.jade', {albums: JSON.stringify(albumCache)});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on ' + port);
});
