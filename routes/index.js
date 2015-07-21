var express = require( 'express' );
var router = express.Router();
var loginController = require( './../controllers/login' );
var registerController = require( './../controllers/register' );
var postController = require( './../controllers/post' );

/* Login screen */
router.post( '/login', loginController.login );
router.post( '/register', registerController.register );
router.post( '/post/add', postController.addEditPost );
router.post( '/post/edit', postController.addEditPost );

module.exports = router;
