var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PersonSchema = new Schema({
	name: String,
	age: String
});

var db = mongoose.connect('mongodb://localhost:27017/Posts', function (error) {
	if (error) {
		console.log(error);
	};
});

var Person = db.model('posts', PersonSchema);
var pesho = new Person({name: "mitko", age: 20});

pesho.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("Post saved");
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.post('/', function(req, res, next) {
  db.Posts.save(req.body);
});

module.exports = router;
