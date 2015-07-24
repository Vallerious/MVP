var express = require( 'express' );
var router = express.Router();
var loginController = require( './../controllers/login' );
var registerController = require( './../controllers/register' );
var postController = require( './../controllers/post' );
var commentController = require( './../controllers/comment' );

/* Login screen */
router.post( '/login', loginController.login );
router.post( '/register', registerController.register );
router.post( '/post/add', postController.addEditPost );
router.post( '/post/edit', postController.addEditPost );
router.post( '/post/delete', postController.deletePost );
router.post( '/post/like', postController.votePost );
router.post( '/post/comment/add', commentController.addEditComment );
router.post( '/post/comment/edit', commentController.addEditComment );
router.post( '/post/comment/like', commentController.likeComment );
router.post( '/post/comment/delete', commentController.deleteComment );

module.exports = router;
