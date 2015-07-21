var mongoose = require( 'mongoose' );
var when = require( 'when' );
var db = require( './../helpers/mongodbConnect' );
var Post = require( './../models/post' );

var addEditPost = function ( req, res ) {
    var postData = req.body;
    
    if ( postData.title && postData.content && postData.postedBy ) {
        var newPost = new Post({
            title: postData.title,
            content: postData.content,
            postedBy: postData.postedBy,
            comments: [], // add the Comment schema in the array after it`s created : )
            date: postData.date || Date.now(),
            votes: 0
        });

        if ( !postData._id ) {
            newPost.save( function ( err ) {
                if ( err ) {
                    res.status( 500 ).json({
                        success: false,
                        payload: {},
                        error: {
                            code: 100,
                            message: "There was an error adding a post"
                        }
                    });
                } else {
                    res.status( 200 ).json( {
                        success: true,
                        payload: {},
                        error: null
                    } );
                }
            });
        } else {
            newPost = newPost.toObject();
            delete newPost._id;
            delete newPost.votes;
            delete newPost.date;
            delete newPost.comments;

            Post.update( { _id: postData._id }, newPost, { multi: false }, function (err, post) {
                if ( !err ) {
                    res.status( 200 ).json( {
                        success: true,
                        payload: {},
                        error: null
                    } );
                } else {
                    res.status( 400 ).json({
                        success: false,
                        payload: {},
                        error: {
                            code: 100,
                            message: "Error during 'post' document update"
                        }
                    });
                }
            });
        }
    } else {
        res.status( 400 ).json({
            success: false,
            payload: {},
            error: {
                code: 124,
                message: "Posts should have title and content"
            }
        });
    }
};

module.exports = {
    addEditPost: addEditPost
};