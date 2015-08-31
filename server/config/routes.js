var express = require('express'),
	router = express.Router(),
	userController = require('./../controllers/user'),
	articleController = require('./../controllers/article'),
	commentController = require('./../controllers/comment'),
	config = require('./config'),
	jwt = require('jsonwebtoken');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/article/list', articleController.getAllArticles);
router.get('/article/comment/list', commentController.getCommentsByArticle);

// Middleware
// router.use(function(req, res, next) {
//    // check header or url parameters or post parameters for token
//    var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
// });

router.post('/article/add', articleController.addEditArticle);
router.post('/article/edit', articleController.addEditArticle);
router.delete('/article/delete', articleController.deleteArticle);
router.put('/article/vote', articleController.voteArticle);
router.post('/article/comment/add', commentController.addEditComment);
router.post('/article/comment/edit', commentController.addEditComment);
router.put('/article/comment/like', commentController.likeComment);
router.post('/article/comment/delete', commentController.deleteComment);

module.exports = router;