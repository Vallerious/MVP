var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var Post = require('./../models/article');
var Comment = require('./../models/comment');
var User = require('./../models/user');

var getCommentsByArticle = function(req, res) {
    var error = new Error();

    try {
        var articleId = req.query.id;

        if (articleId) {
            Comment.find({
                articleId: articleId
            }, function(err, comments) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {

                    res.status(200).json({
                        success: true,
                        payload: {
                            comments: comments || []
                        },
                        error: null
                    });
                }
            })
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Article ID is needed to get comments!";
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

var addEditComment = function(req, res) {
    var commentData = req.body.comment;
    var error = new Error();

    try {
        if (commentData.articleId && commentData.content && commentData.postedBy) { // postId should be sent from the front-end

            User.findById(commentData.postedBy, function(err, user) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    if (user) {
                        var newComment = new Comment({
                            content: commentData.content,
                            postedBy: user.username,
                            articleId: commentData.articleId,
                            createdOn: Date.now(),
                            likes: 0,
                            likedBy: []
                        });

                        if (!commentData.commentId) { // add comment
                            newComment.save(function(err, comment) {
                                if (err) {
                                    err.status = 500;
                                    throw err;
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        payload: {
                                            comment: comment
                                        },
                                        error: null
                                    });
                                }
                            });
                        } else { // edit comment
                            Comment.findByIdAndUpdate(commentData.commentId, {
                                content: commentData.content,
                                createdOn: Date.now()
                            }, function(err, comment) {
                                if (err) {
                                    err.status = 500;
                                    throw err;
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        payload: {
                                            comment: comment
                                        },
                                        error: null
                                    });
                                }
                            })
                        }
                    } else {
                        error.message = "Attempted to vote with non-existent user";
                        res.status(400).json({
                            success: false,
                            payload: {},
                            error: error
                        });
                    }
                }
            })
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

var deleteComment = function(req, res) {
    var error = new Error();
    var commentData = req.body.comment;

    try {
        if (commentData.id) {
            Comment.remove({
                _id: commentData.id
            }, function(err, comment) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    res.status(200).json({
                        success: true,
                        payload: {
                            comment: comment
                        },
                        error: null
                    });
                }
            });
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Comment ID is needed to delete a comment!";
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

var likeComment = function(req, res) {
    try {
        var commentData = req.body.comment;
        var user = commentData.userId;
        var commentId = commentData.commentId;

        if (commentId) {
            Comment.findById(commentId, function(err, comment) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    var idx = comment.likedBy.indexOf(user);

                    if (idx > -1) { // found
                        comment.votedBy.splice(idx, 1);
                        comment.votes -= 1;
                    } else {
                        comment.votedBy.push(user);
                        comment.votes += 1;
                    }

                    comment.save(function(err) {
                        if (err) {
                            err.status = 500;
                            throw err;
                        }

                        res.status(200).json({
                            success: true,
                            payload: {
                                votes: comment.likes
                            },
                            error: null
                        });
                    });
                }
            });
        } else {
            error.status = 400;
            error.code = 124;
            error.message = "Comment ID is needed to like a comment!";
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
    likeComment: likeComment,
    getCommentsByArticle: getCommentsByArticle
};
