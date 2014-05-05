var express = require('express'),
	stylus = require('stylus'),
	async = require('async'),
	Firebase = require('firebase');

var app = express();
app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));

var albumRef = new Firebase('https://glowing-fire-8113.firebaseio.com/albums');
var albumCache = [];

albumRef.once('value', function(albums) {
	var obj = albums.val();
	for (var property in obj) {
		if(obj.hasOwnProperty(property)) {
			albumCache.push(obj[property]);
		}
	}
});

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.render('index.jade', {albums: JSON.stringify(albumCache)});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on ' + port);
});
