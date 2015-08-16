var mongoose = require('mongoose');
var User = require('./user');

var CommentSchema = new mongoose.Schema({
    content: String,
    postedBy: String,
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articles'
    },
    createdOn: String,
    likes: Number,
    likedBy: [String]
});

module.exports = mongoose.model("Comments", CommentSchema);