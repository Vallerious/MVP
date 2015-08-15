/*
 A mongoose model of the 'User' object
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    roleId: String,
    image: String
    // more...
});

module.exports = mongoose.model('Users', UserSchema);
