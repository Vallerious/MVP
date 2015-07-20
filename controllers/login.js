/*
	Controller for the login screen and functionality
*/
var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');

var getLogin = function (req, res) {
	// get login view
};

var postLogin = function (req, res) {
	var user = req.body;

	// username should be unique
	if (user.username && user.password) {
		// get user from mongo with that username and check password match
		when.resolve(User.findOne({ username: user.username }).exec()).then(function (foundUser) {
			if (!foundUser || (foundUser.password != user.password)) {
				// should send error object instead of string message
				throw new Error("Invalid username or password!");
			}

			res.status(200).send({});
		}).catch(function (err) {
			res.status(400).send({
				code: -1,
				message: err
			});
		});
	} else {
		res.status(200).send({
			code: -1,
			message: 'Invalid input data'
		});
	}
};

module.exports = {
	getLogin: getLogin,
	postLogin: postLogin
};