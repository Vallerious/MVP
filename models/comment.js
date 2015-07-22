var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    content: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    date: String,
    likes: Number,
    // add additional properties...
});

module.exports = mongoose.model("Comments", CommentSchema);