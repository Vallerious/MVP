var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');

var getUser = function (username) {
    return when.resolve(User.findOne({username: username}).exec());
};

module.exports = {
    getUser: getUser
};