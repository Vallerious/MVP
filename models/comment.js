var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    content: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdOn: String,
    editedOn: String,
    likes: Number
});

module.exports = mongoose.model("Comments", CommentSchema);