var express = require('express'),
	stylus = require('stylus'),
	async = require('async');
var app = express();

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(stylus.middleware({
		src: __dirname + '/views',
		dest: __dirname + '/public'
	}));
	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(request, response) {
	response.send('Welcome to my personal website!');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on ' + port);
});