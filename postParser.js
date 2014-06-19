var fs = require('fs'),
	marked = require('marked'),
	moment = require('moment'),
	folderName = './posts',
	regex = '([0-9]*-[0-9]*-[0-9]*)_([a-zA-Z ,!]*)\.md',
	titleDict,
	lastRead;

var updateTitleToFileDict = function(callback) {
	if(titleDict != undefined && moment().subtract('minutes', 30).unix() < lastRead ) {
		callback();
	} else {
		fs.readdir(folderName, function(err, files) {
			titleDict = {};
			var correct = files.map(function(name) {
				item = getDateAndTitle(name);
				if(item) {
					titleDict[item.url] = name;
				}
			});
			lastRead = moment();
			callback();
		});	
	}

}


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
		return { date : groups[1], title : groups[2], url : encodeURI(groups[2])};
	}
}

var getHtmlFromMd = function(title, callback) {
	updateTitleToFileDict(function() {
		var mdFile = titleDict[encodeURI(title)];
		if(mdFile) {
			fs.readFile(folderName + '/' + mdFile, 'ascii', function(err, data) {
				return marked(data, callback);
			});
		} else {
			callback(new Error("No such post!"));
		}
	});
}


exports.getHtmlFromMd = getHtmlFromMd;
exports.getPosts = getPosts;
