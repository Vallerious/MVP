var mongoose = require('mongoose');
var User = require('./user');

var CommentSchema = new mongoose.Schema({
    content: String,
    postedBy: {
        _id: String,
        username: String,
        password: String,
        email: String,
        roleId: String,
        image: String
    },
    createdOn: String,
    editedOn: String,
    likes: Number
});

module.exports = mongoose.model("Comments", CommentSchema);