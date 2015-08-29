var mongoose = require('mongoose');
var when = require('when');
var User = require('./../config/mongoose/models/user');
var passHash = require('password-hash');

var getUser = function (username) {
    return when.resolve(User.findOne({username: username}).exec());
};

module.exports = {
    getUser: getUser
};