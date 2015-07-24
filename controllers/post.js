var mongoose = require( 'mongoose' );
var when = require( 'when' );
var db = require( './../helpers/mongodbConnect' );
var Post = require( './../models/post' );

var addEditPost = function ( req, res ) {
    var postData = req.body;
    var error = new Error();

    try {
        if ( postData.title && postData.content && postData.postedBy ) {
            var newPost = new Post({
                title: postData.title,
                content: postData.content,
                postedBy: postData.postedBy,
                comments: [], // add the Comment schema in the array after it`s created : )
                createdOn: postData.date || Date.now(),
                editedOn: "",
                votes: 0
            });

            if ( !postData._id ) { // no id? add new post
                newPost.save( function ( err ) {
                    if ( err ) {
                        err.status = 500;
                        throw err;
                    } else {
                        res.status( 200 ).json( {
                            success: true,
                            payload: {},
                            error: null
                        } );
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

                Post.update( { _id: postData._id }, newPost, { multi: false }, function ( err, post ) {
                    if ( !err ) {
                        res.status( 200 ).json( {
                            success: true,
                            payload: {},
                            error: null
                        } );
                    } else {
                        err.status = 500;
                        throw err;
                    }
                });
            }
        } else {
            error.message = "Posts should have title and content";
            error.code = 124;
            throw error;
        }
    } catch ( err ) {
        res.status( err.status || 400 ).json({
            success: false,
            payload: {},
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
};

var deletePost = function ( req, res ) {
    var postData = req.body;
    var error = new Error();

    try {
        if ( postData._id ) {
            Post.findById( postData._id ).remove(function (err) {
                if ( !err ) {
                    res.status( 200 ).send({
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
    } catch ( err ) {
        res.status( err.status || 400 ).json({
            success: false,
            payload: {},
            error: {
                code: err.code || 666,
                message: err.message
            }
        })
    }
};

var votePost = function (req, res) {
    try {
        var postData = req.body;
        var postId = postData.postId;
        var increment = 1;

        if ( postData.voteDown ) {
            increment = -1;
        }

        Post.findByIdAndUpdate( postId, { $inc: { "votes" : increment } }, function ( err ) {
            if ( err ) {
                err.status = 500;
                throw err;
            } else {
                res.status( 200 ).json({
                    success: true,
                    payload: {},
                    error: null
                });
            }
        });
    } catch ( err ) {
        res.status( err.status || 400 ).json({
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
    votePost: votePost
};