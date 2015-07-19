/*
	Controller for the login screen and functionality
*/
var mongoose = require('mongoose');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');

var getLogin = function (req, res) {
	// get login view
};

var postLogin = function (req, res) {
	// authenticate user
	var user = req.body;

	// username should be unique
	if (user.hasOwnProperty('username') && user.username && user.hasOwnProperty('password') && user.password) {
		// get user from mongo with that username and check password match

		User.findOne({ username: user.username }, function (err, foundUser) {
		  if (err) {
				return err;
		  } else {
		  	if (foundUser !== null) {
		  		if (foundUser.password != user.password) {
		  			// should send error object instead of string message
		  			res.send("Passwords do not match!");
		  		} else {
		  			res.status(200).send("Logged in!");
		  		}
		  	} else {
		  		res.send("User doesn`t exist!");
		  	}
		  }
		});
	} else {
		res.status(400).send('Invalid input data');
	}
};

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin
}