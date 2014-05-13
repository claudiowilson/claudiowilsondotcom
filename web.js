var express = require('express'),
	stylus = require('stylus'),
	searcher = require('./musicSearch'),
	albumDb = require('./albumDb'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');

var app = express();
app.use(stylus.middleware({
	src: __dirname + '/views',
	dest: __dirname + '/public'
}));

app.use(cookieParser());
app.use(session({secret: 'yolo'}));
app.use(bodyParser.urlencoded());

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.render('layout.jade');
});

app.get('/index', function(request, response) {
	response.render('index.jade');
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
	if(request.session.lastWritten && request.session.lastWritten < date.getTime()) {
		request.session.lastWritten = new Date().getTime();
		response.send(500);
	} else {
		if(searcher.hasUserSelection(request.body.index)) {
			albumDb.addAlbum(searcher.getUserSelection(request.body.index), function(err) {
				if(err) {
					response.send(500);
				} else {
					response.send(200);
				}
			});
		} else {
			response.send(500);
		}
	}
});

var port = process.env.PORT || 80;
app.listen(port, function() {
	console.log('Listening on ' + port);
});
