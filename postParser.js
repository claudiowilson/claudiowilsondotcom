var fs = require('fs'),
	marked = require('marked'),
	folderName = './posts',
	regex = '([0-9]*-[0-9]*-[0-9]*)_([a-zA-Z ,!]*)\.md';

var getPosts = function(callback) {
	fs.readdir(folderName, function(err, files) {
		var correct = files.map(function(name) {
			return getDateAndTitle(name);
		});
		callback(null, correct);
	});
}

var getDateAndTitle = function(postFileName) {
	var groups = postFileName.match(regex);
	if (groups) {
		return { date : groups[1], title : groups[2], file: postFileName };
	}
}

var getHtmlFromMd = function(post, callback) {
	fs.readFile(folderName + '/' + post, 'ascii', function(err, data) {
		return marked(data, callback);
	});
}


exports.getHtmlFromMd = getHtmlFromMd;
exports.getPosts = getPosts;
