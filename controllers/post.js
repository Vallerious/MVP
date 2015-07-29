var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var Post = require('./../models/post');

/**
 * Adds a Post/Article to mongoDB. If an Id is provided the method will edit the post.
 *
 * @author Valeri Hristov
 * @param {string} req.body.title
 * @param {string} req.body.content
 * @param {Id} req.body.postedBy - The mongoDb Id of the user that submits the post.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var addEditPost = function (req, res) {
    var postData = req.body;
    var error = new Error();

    try {
        if (postData.title && postData.content && postData.postedBy) {
            var newPost = new Post({
                title: postData.title,
                content: postData.content,
                postedBy: postData.postedBy,
                comments: [], // add the Comment schema in the array after it`s created : )
                createdOn: postData.date || Date.now(),
                editedOn: "",
                votes: 0
            });

            if (!postData._id) { // no id? add new post
                newPost.save(function (err) {
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
            } else { // id provided, editing existing post
                newPost = newPost.toObject();
                newPost.editedOn = Date.now();
                delete newPost._id;
                delete newPost.votes;
                delete newPost.date;
                delete newPost.comments;
                delete newPost.postedBy;

                Post.update({_id: postData._id}, newPost, {multi: false}, function (err, post) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            payload: {},
                            error: null
                        });
                    } else {
                        err.status = 500;
                        throw err;
                    }
                });
            }
        } else {
            error.message = "Invalid input data";
            error.code = 124;
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
};

/**
 * Deletes a Post/Article from mongoDB by post Id.
 *
 * @author Valeri Hristov
 * @param {Id} req.body.postId - The mongoDb Id of the post that is to be deleted.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var deletePost = function (req, res) {
    var postData = req.body;
    var error = new Error();

    try {
        if (postData.postId) {
            Post.findById(postData.postId).remove(function (err) {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        payload: {},
                        error: null
                    });
                } else {
                    err.status = 500;
                    throw err;
                }
            });
        } else {
            error.code = 124;
            error.message = "Id is required to delete a document!";
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
        })
    }
};

/**
 * Votes up or down a Post/Article from mongoDB by post Id.
 *
 * @author Valeri Hristov
 * @param {Id} req.body.postId - The mongoDb Id of the post that is to be deleted.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var votePost = function (req, res) {
    try {
        var postData = req.body;

        if (postData.postId) {
            var postId = postData.postId;
            var increment = 1;

            if (postData.voteDown) {
                increment = -1;
            }

            Post.update({_id: postId}, {$inc: {votes: increment}}, {upsert: false}, function (err, model) {
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
            error.code = 124;
            error.message = "Id is required to vote a post!";
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

/**
 * Gets all Posts/Articles from mongoDB.
 *
 * @author Valeri Hristov
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var getAllPosts = function (req, res) {
    try {
        Post.find({}, function (err, data) {
            if (!err) {
                res.status(200).json({
                    success: true,
                    payload: data,
                    error: null
                });
            } else {
                err.status = 500;
                throw err;
            }
        });
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
    addEditPost: addEditPost,
    deletePost: deletePost,
    votePost: votePost,
    getAllPosts: getAllPosts
};