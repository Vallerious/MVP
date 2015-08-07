/*
 A mongoose model of the 'Post' object
 */
var mongoose = require('mongoose');
var mongoosePaging = require('mongoose-paginate');

var ArticleSchema = new mongoose.Schema({
    title: String,
    title_normalized: String,
    content: String,
    content_normalized: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        content: String,
        content_normalized: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        createdOn: Number,
        editedOn: String,
        likes: Number
    }],
    createdOn: Number,
    editedOn: String,
    votes: Number,
    tags: [],
    categories: []
});

ArticleSchema.plugin(mongoosePaging);

module.exports = mongoose.model("Articles", ArticleSchema);