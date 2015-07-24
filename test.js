/**
 * Created by valeri.hristov on 7/21/2015.
 */
var mongoose = require( 'mongoose' );
var when = require( 'when' );
var db = require( './helpers/mongodbConnect' );
var Post = require( './models/post' );

var newPost = new Post({
    title: "Mugi",
    content: "beeels",
    postedBy: "55ad04701085734c19cb7269",
    comments: [], // add the Comment schema in the array after it`s created : )
    date: Date.now(),
    votes: 0
});
var commentId = "55b1e1bf1199701c1c21c88d";
Post.findOne( { _id: '55adf388634dca24170b4a9f' }, function (err, post) {
    if ( !err ) {
        if ( post ) {
            var foundElement = post.comments.filter(function (comment) {
                return comment._id == commentId;
            })[0];

            if ( foundElement ) {
                foundElement.content = "I`ve changed the content";
            }

            console.log( post.comments );

            post.save(function(err) {

            });
        }
    }
});
