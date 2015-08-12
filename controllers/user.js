var mongoose = require('mongoose');
var when = require('when');
var jwt = require('jsonwebtoken');
var passHash = require('password-hash');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');
var userUtils = require('./../helpers/userUtils');
var config = require('./../config');

var login = function (req, res) {
    var userData = req.body.user;
    var error = new Error();

    try {
        if (userData && userData.username && userData.password) {
            userUtils.getUser(userData.username).then(function (foundUser) {
                if (!foundUser || !( passHash.verify(userData.password, foundUser.password))) {
                    error.status = 400;
                    error.code = 124;
                    error.message = 'Invalid username or password!';
                    throw error;
                }

                // if user is found and password is right
                // create a token
                var token = jwt.sign(foundUser, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.status(200).json({
                    success: true,
                    payload: foundUser,
                    token: token,
                    error: null
                });
            }).catch(function (err) {
                res.status(200).json({
                    success: false,
                    payload: {},
                    error: {
                        code: 123,
                        message: err.message
                    }
                });
            });
        } else {
            error.status = 400;
            error.code = 124;
            error.message = 'Invalid input data';
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
};

var register = function (req, res) {
    var userData = req.body.user;

    if (userData && userData.username && userData.password && userData.email) {
        when.resolve(User.findOne({email: userData.email}).exec()).then(function (foundUser) {
            if (!foundUser) {
                userUtils.getUser(userData.username).then(function (foundUser) {
                    if (!foundUser) {
                        var newUser = new User({
                            username: userData.username,
                            password: passHash.generate(userData.password),
                            email: userData.email,
                            image: userData.image,
                            roleId: ''
                        });

                        newUser.save(function (err) {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    payload: {},
                                    error: {
                                        code: 100,
                                        message: "There was an error creating a user. Please contact your administrator!"
                                    }
                                });
                            } else {
                                delete newUser.password;
                                delete newUser._id;

                                res.status(200).json({
                                    success: true,
                                    payload: newUser,
                                    error: null
                                });
                            }
                        });
                    } else {
                        res.status(200).json({
                            success: false,
                            payload: {},
                            error: {
                                code: 124,
                                message: "User already exists with that username!"
                            }
                        });
                    }
                });
            } else {
                res.status(200).json({
                    success: false,
                    payload: {},
                    error: {
                        code: 124,
                        message: "User already exists with that email!"
                    }
                });
            }
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

var editUser = function (req, res) {
    try {
        var userData = req.body.user;

        if (userData) {
            User.update({_id: userData._id}, {email: userData.email}, function (err) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    res.status(200).json({
                        success: true,
                        payload: {}, // TODO: maybe return a user here
                        error: null
                    });
                }
            });
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
};

module.exports = {
    login: login,
    register: register,
    editUser: editUser
};