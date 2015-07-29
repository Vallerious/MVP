var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var User = require('./../models/user');
var userUtils = require('./../helpers/userUtils');

var editUser = function (req, res) {
    try {
        var userId = req.body._id;

        if ( userId ) {
            User.update({_id: userId}, {})
        }
    } catch (err) {

    }
};