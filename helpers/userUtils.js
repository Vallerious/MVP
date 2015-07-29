var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');
var passHash = require('password-hash');

var getUser = function ( username ) {
    return when.resolve(User.findOne({username: username}).exec());
};

var addEditUser = function (params) {
    var result;

    try {
        if ( params && params.username && params.password && params.email ) {
            var user = new User({
                username: params.username,
                password: passHash.generate(params.password),
                email: params.email,
                roleId: ''
            });

            if ( params._id ) { // edit
                User.update({_id: userId}, user, {upsert: false}, function (err, model) {
                    if (err) {
                        err.status = 500;
                        result = err;
                    } else {
                        result = model;
                    }
                });
            } else { // add
                User.findOne({username: params.username}, function (err, model) {
               if ( err ) {
                   result = err;
               } else {
                   result = new Error("Username " + params.username + " has already been taken.");
               }


                });
            }
        }
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getUser: getUser
};