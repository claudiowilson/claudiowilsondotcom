var express = require('express'),
	stylus = require('stylus'),
	searcher = require('./musicSearch'),
	albumDb = require('./albumDb'),
	posts = require('./postParser'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	geoip = require('geoip-lite');

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
	response.render('layout.jade', {count : albumDb.count()});
});

app.get('/index', function(request, response) {
	response.render('index.jade', {count : albumDb.count()});
});

app.get('/blog/:blogname', function(request, response) {
	if (request.params.blogname == 'index') {
		posts.getPosts(function(err, data) {
			response.render('blogindex.jade', {count : albumDb.count(), posts : data});
		});
	} else {
		posts.getHtmlFromMd(request.params.blogname, function(err, html) {
			response.render('blogpost.jade', {count : albumDb.count(), post : html});
		});
	}
	
});

app.get('/search/:name', function(request, response) {
	if(!request.params.name || request.params.name.length < 3) {
		return {};
	}

	searcher.getAlbums(request.params.name, function(err, json) {
		response.json(json);
	});
});

app.get('/getsongs/:id', function(request, response) {
	searcher.getSongsForAlbum(request.params.id, function(err, songs) {
		response.json(200, songs);
	});
});

app.get('/contact', function(request, response) {
	response.render('contact.jade', {count: albumDb.count()});
});


app.post('/newalbum', function(request,response) {
	var result = geoip.lookup(request.connection.remoteAddress);
	var lookup = result ? result : {"country" : "Unknown"};
	if (request.connection.remoteAddress == "127.0.0.1") {
		lookup = { "country" : "Claudio's Computer" };
	}

	if(searcher.hasUserSelection(request.body.index)) {
		albumDb.addAlbum(searcher.getUserSelection(request.body.index), lookup, function(err) {
			if(err) {
				response.json(200, {"added" : "Album was a duplicate"})
			} else {
				response.json(200, {"added" : "Album added!"});
			}
		});
	} else {
		response.json(200, {"added" : "Something went wrong :("});
	}
});

var port = process.env.PORT || 80;
app.listen(port, function() {
	console.log('Listening on ' + port);
});
