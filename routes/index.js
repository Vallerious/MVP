var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user');
var articleController = require('./../controllers/article');
var commentController = require('./../controllers/comment');
var config = require('./../config');
var jwt = require('jsonwebtoken');

router.post('/login', userController.login);
router.post('/register', userController.register);

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

router.get('/article/list', articleController.getAllArticles);
router.get('/article/filter', articleController.filterArticles);
router.post('/article/add', articleController.addEditArticle);
router.post('/article/edit', articleController.addEditArticle);
router.post('/article/delete', articleController.deleteArticle);
router.post('/article/vote', articleController.voteArticle);
router.post('/article/comment/add', commentController.addEditComment);
router.post('/article/comment/edit', commentController.addEditComment);
router.post('/article/comment/like', commentController.likeComment);
router.post('/article/comment/delete', commentController.deleteComment);

module.exports = router;
