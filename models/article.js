/*
 A mongoose model of the 'Post' object
 */
var mongoose = require('mongoose');
var mongoosePaging = require('mongoose-paginate');

var ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdOn: Number,
    editedOn: String,
    votes: Number,
    votedBy: [String],
    tags: [String],
    categories: [String]
});

ArticleSchema.plugin(mongoosePaging);

module.exports = mongoose.model("Articles", ArticleSchema);
