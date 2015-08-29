var mongoose = require('mongoose'),
    when = require('when'),
    User = require('./../../config/mongoose/models/user'),
    passHash = require('password-hash');

var getUser = function getUser(prop, value) {
	var defer = when.defer();

	var requestParams = {};
	requestParams[prop] = value;

	User.findOne(requestParams).exec(function (err, user) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(user);
		}
	});

	return defer.promise;
};

var checkAvailability = function checkAvailability(prop, value) {
	var defer = when.defer();

	var requestParams = {};
	requestParams[prop] = value;

	User.findOne(requestParams).exec(function (err, user) {
		if (err) {
			defer.reject(err);
		} else {
			if (user) {
				defer.resolve(false);
			} else {
				defer.resolve(true);
			}
		}
	});

	return defer.promise;
};

var addUser = function addUser(userData) {
	var defer = when.defer();

	var user = new User({
		username: userData.username,
        password: passHash.generate(userData.password),
        email: userData.email,
        image: userData.image,
        roleId: ''
	});

	user.save(function (err, user) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(user);
		}
	});

	return defer.promise;
};

module.exports = {
	getUser: getUser,
	checkAvailability: checkAvailability,
	addUser: addUser
};