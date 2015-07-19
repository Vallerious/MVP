var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MVP', function (error) {
	if (error) {
		console.log("Unable to connect to mongodb database: \n" + error);
	};
});