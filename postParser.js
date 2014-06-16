var fs = require('fs'),
	folderName = './posts',
	regex = '([0-9]*-[0-9]*-[0-9]*)_([a-zA-Z ]*)\.md';

var getPosts = function() {
	fs.readdir(folderName, function(err, files) {
		return files.filter(function(name) {
			if(name.match(regex)) {
				return true;
			}
			return false;
		});
	});
}



exports.getPosts = getPosts;
