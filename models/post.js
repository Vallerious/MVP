/*
	A mongoose model of the 'Post' object
*/
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    }],
    date: String,
    votes: Number,
    // add additional properties...
});

module.exports = mongoose.model("Posts", PostSchema);