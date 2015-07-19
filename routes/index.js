var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');
var Post = require('./../models/post');

var pesho = new User({
	username: "pesho2",
	password: "12345",
	email: "akon@abv.bg",
	roleId: "A"
});

pesho.save(function (err) {
  if (err) {
		return err;
  } else {
  	console.log("User saved");
  }
});

var post = new Post({
    title: "Hello World",
    postedBy: pesho._id,
    comments: [{
        text: "Nice post!",
        postedBy: pesho._id
    }, {
        text: "Thanks :)",
        postedBy: pesho._id
    }]
});

post.save(function (err) {
  if (err) {
		console.log(err);
  } else {
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
