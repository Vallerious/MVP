var express = require( 'express' );
var router = express.Router();
var userController = require( './../controllers/user' );
var postController = require( './../controllers/post' );
var commentController = require( './../controllers/comment' );
var config = require('./../config');
var jwt = require( 'jsonwebtoken' );

router.post( '/login', userController.login );
router.post( '/register', userController.register );

// Middleware
//router.use(function(req, res, next) {
//    // check header or url parameters or post parameters for token
//    var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//    // decode token
//    if (token) {
//        // verifies secret and checks exp
//        jwt.verify(token, config.secret, function(err, decoded) {
//            if (err) {
//                return res.json({ success: false, message: 'Failed to authenticate token.' });
//            } else {
//                // if everything is good, save to request for use in other routes
//                req.decoded = decoded;
//                next();
//            }
//        });
//    } else {
//        return res.status(403).send({
//            success: false,
//            message: 'No token provided.'
//        });
//    }
//});

router.get( '/post/list', postController.getAllPosts );
router.post( '/post/add', postController.addEditPost );
router.post( '/post/edit', postController.addEditPost );
router.post( '/post/delete', postController.deletePost );
router.post( '/post/vote', postController.votePost );
router.post( '/post/comment/add', commentController.addEditComment );
router.post( '/post/comment/edit', commentController.addEditComment );
router.post( '/post/comment/like', commentController.likeComment );
router.post( '/post/comment/delete', commentController.deleteComment );

module.exports = router;
