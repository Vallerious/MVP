var mongoose = require('mongoose'),
    when = require('when'),
    mongoCommentRequests = require('./../requests/mongo/comment');

var getCommentsByArticle = function(req, res) {
    var error = new Error(),
        articleId = req.query.id;

    if (articleId) {
        mongoCommentRequests.getCommentsByArticle(articleId)
            .then(function(comments) {
                res.status(200).json({
                    success: true,
                    payload: comments,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            })
    } else {
        error.message = "Article ID is needed to get comments!";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var addEditComment = function(req, res) {
    var commentData = req.body.comment;
    var error = new Error();

    if (commentData && commentData.articleId && commentData.content && commentData.postedBy) {
        mongoCommentRequests.addEditComment(
                commentData.articleId, commentData.postedBy, commentData.content, commentData.commentId)
            .then(function(comments) {
                res.status(200).json({
                    success: true,
                    payload: comments,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    } else {
        error.message = "Invalid input data!";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var deleteComment = function(req, res) {
    var error = new Error();
    var commentData = req.body.comment;

    if (commentData.id) {
        mongoCommentRequests.deleteComment(commentData.id)
            .then(function(comment) {
                res.status(200).json({
                    success: true,
                    payload: comment,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    } else {
        error.message = "Comment ID is needed to delete a comment!";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var likeComment = function(req, res) {
    var commentData = req.body.comment;

    if (commentData && commentData.id && commentData.userId) {
        mongoCommentRequests.likeComment(commentData.id, commentData.userId)
            .then(function(comment) {
                res.status(200).json({
                    success: true,
                    payload: comment,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            })
    } else {
        error.message = "Comment ID is needed to like a comment!";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

module.exports = {
    addEditComment: addEditComment,
    deleteComment: deleteComment,
    likeComment: likeComment,
    getCommentsByArticle: getCommentsByArticle
};