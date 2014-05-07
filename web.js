var express = require('express'),
	stylus = require('stylus'),
	Firebase = require('firebase'),
	searcher = require('./musicSearch'),
	FirebaseTokenGenerator = require('firebase-token-generator'),
	cookieParser = require('cookie-parser'),
	session = require('express-session');

var app = express();
app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));

app.use(cookieParser());
app.use(session({secret: ''}));

var tokenGenerator = new FirebaseTokenGenerator('');
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

app.get('/search/:name', function(request, response) {
	if(!request.params.name || request.params.name.length < 3) {
		return {};
	}

	searcher.getAlbums(request.params.name, function(err, json) {
		response.json(json);
	});
});


app.post('/newalbum', function(request,response) {
	var date = new Date();
	date.setSeconds(date.getSeconds() - 1);
	if(!request.session.lastWritten || request.session.lastWritten < date.getTime()) {
		request.session.lastWritten = new Date().getTime();
		response.render('layout.jade', {albums: JSON.stringify(albumCache)});
	} else {
		console.log('yolo');
		response.render('layout.jade', {albums: JSON.stringify(albumCache)});
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on ' + port);
});
