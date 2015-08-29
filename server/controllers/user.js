var mongoose = require('mongoose'),
    when = require('when'),
    jwt = require('jsonwebtoken'),
    passHash = require('password-hash'),
    config = require('./../config/config')['development'],
    mongoUserRequests = require('./../requests/mongo/user');

var login = function(req, res) {
    var userData = req.body.user;
    var error = new Error();


    if (userData && userData.username && userData.password) {
        mongoUserRequests.getUser('username', userData.username)
            .then(function(user) {
                if (!user || !(passHash.verify(userData.password, user.password))) {
                    error.status = 200;
                    error.message = 'Ivalid username / password';

                    return when.reject(error);
                } else {
                    return user;
                }
            })
            .then(function(user) {
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.status(200).json({
                    success: true,
                    payload: user,
                    token: token,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(err.status).json({
                    success: false,
                    payload: {},
                    error: err
                });
            })
    } else {
        res.status(400).json({
            success: false,
            payload: {},
            error: {
                message: 'Username and password are required to log in!'
            }
        });
    }
};

var register = function(req, res) {
    var userData = req.body.user;
    var error = new Error();

    if (userData && userData.username && userData.password && userData.email) {
        mongoUserRequests.checkAvailability('username', userData.username)
            .then(function(isAvailable) {
                if (!isAvailable) {
                    error.message = "User already exists with that username!";
                    error.status = 200;

                    return when.reject(error);
                } else {
                    return mongoUserRequests.checkAvailability('email', userData.email);
                }
            })
            .then(function(isAvailable) {
                if (!isAvailable) {
                    error.message = "User already exists with that email!";
                    error.status = 200;

                    return when.reject(error);
                } else {
                    return mongoUserRequests.addUser(userData);
                }
            })
            .then(function(user) {
                if (user) {
                    delete user.password;
                    delete user._id;

                    res.status(200).json({
                        success: true,
                        payload: user,
                        error: null
                    });
                }
            })
            .catch(function(err) {
                res.status(err.status).json({
                    success: false,
                    payload: {},
                    error: err
                });
            });
    } else {
        res.status(400).json({
            success: false,
            payload: {},
            error: {
                code: 124,
                message: "Please fill your email, username and password!"
            }
        });
    }
};

module.exports = {
    login: login,
    register: register
};