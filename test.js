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

Post.findOne( { _id: '55adf388634dca24170b4a9f' }, function (err, post) {
    if ( !err ) {
        if ( post ) {
            post.title = postData.title;
            post.content = postData.content;

            post.save(function(err) {
                if(!err) {
                    console.log("contact " + contact.phone + " created at " + contact.createdAt + " updated at " + contact.updatedAt);
                }
                else {
                    console.log("Error: could not save contact " + contact.phone);
                }
            });
        }
    }
});
