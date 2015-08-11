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
            _id: String,
            username: String,
            password: String,
            email: String,
            roleId: String,
            image: String
        },
        createdOn: Number,
        editedOn: String,
        likes: Number
    }],
    createdOn: Number,
    editedOn: String,
    votes: Number,
    profilesVoted: [String],
    tags: [String],
    categories: [String]
});

ArticleSchema.plugin(mongoosePaging);

module.exports = mongoose.model("Articles", ArticleSchema);