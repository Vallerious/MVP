var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var Post = require('./../models/article');
var User = require('./../models/user');
var Comment = require('./../models/comment');

var addEditComment = function (req, res) {
    var commentData = req.body;
    var error = new Error();

    try {
        if (commentData.articleId && commentData.content && commentData.postedBy) { // postId should be sent from the front-end

            var newComment = new Comment({
                content: commentData.content,
                postedBy: commentData.postedBy,
                createdOn: Date.now(),
                likes: 0
            });

            if (!commentData.commentId) {
                User.findById(commentData.postedBy, function (err, user) {
                    if ( err ) {
                        err.status = 500;
                        throw err;
                    } else {
                        var commentingUser = user.toObject();
                        delete commentingUser.password;

                        newComment.postedBy = commentingUser;

                        Post.findByIdAndUpdate(
                            commentData.articleId,
                            {$push: {"comments": newComment}},
                            {new: true},
                            function (err, model) {
                                if (err) {
                                    err.status = 500;
                                    throw err;
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        payload: {},
                                        error: null
                                    });
                                }
                            }
                        );
                    }
                });
            } else { // edit comment
                Post.update({'comments._id': commentData.commentId}, {
                    '$set': {
                        'comments.$.content': commentData.content,
                        'comments.&.editedOn': Date.now()
                    }
                }, {upsert: true}, function (err) {
                    if (err) {
                        err.status = 500;
                        throw err;
                    } else {
                        res.status(200).json({
                            success: true,
                            payload: {},
                            error: null
                        });
                    }
                });
            }
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Invalid input data!";
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code || 666,
                message: err.message
            }
        });
    }
};

var deleteComment = function (req, res) {
    var commentData = req.body.comment;

    try {
        if (commentData.commentId && commentData.postId) {
            Post.update(
                {'_id': commentData.postId},
                {$pull: {"comments": {_id: commentData.commentId}}},
                function (err) {
                    if (err) {
                        err.status = 500;
                        throw err;
                    } else {
                        res.status(200).json({
                            success: true,
                            payload: {},
                            error: null
                        });
                    }
                }
            );
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Invalid input data!";
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code || 666,
                message: err.message
            }
        });
    }
};

var likeComment = function (req, res) {
    try {
        var commentData = req.body.comment;

        if (commentData.postId && commentData.commentId) {
            var postId = commentData.postId;
            var commentId = commentData.commentId;
            var increment = 1;

            if (commentData.voteDown) {
                increment = -1;
            }

            Post.update({'comments._id': commentId}, {
                '$inc': {
                    'comments.$.likes': increment
                }
            }, {upsert: false}, function (err) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    res.status(200).json({
                        success: true,
                        payload: {},
                        error: null
                    });
                }
            });
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Invalid input data!";
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code || 666,
                message: err.message
            }
        });
    }
};

module.exports = {
    addEditComment: addEditComment,
    deleteComment: deleteComment,
    likeComment: likeComment
};