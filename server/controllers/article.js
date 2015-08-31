var mongoose = require('mongoose'),
    when = require('when'),
    mongoArticleRequests = require('./../requests/mongo/article');

var addEditArticle = function(req, res) {
    var articleData = req.body;
    var error = new Error();

    if (articleData.title && articleData.content && articleData.postedBy) {
        mongoArticleRequests.addEditArticle(articleData)
            .then(function(article) {
                res.status(200).json({
                    success: true,
                    payload: article,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    } else {
        error.message = "Invalid input data";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var deleteArticle = function(req, res) {
    var articleData = req.body;
    var error = new Error();

    if (articleData && articleData.articleId) {
        mongoArticleRequests.deleteArticle(articleData.articleId)
            .then(function(article) {
                res.status(200).json({
                    success: true,
                    payload: {},
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    } else {
        error.message = "Invalid input data";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var voteArticle = function(req, res) {
    var error = new Error(),
        reqParams = req.body.article;

    if (reqParams && reqParams.articleId && reqParams.userId) {
        mongoArticleRequests.voteArticle(reqParams.articleId, reqParams.userId)
            .then(function(article) {
                res.status(200).json({
                    success: true,
                    payload: article,
                    error: null
                });
            })
            .catch(function(err) {
                res.status(500).json({
                    success: false,
                    payload: {},
                    error: {
                        message: err.message,
                        stack: err.stack
                    }
                });
            });
    } else {
        error.message = "Invalid input data";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

var getAllArticles = function(req, res) {
    var page = req.body;

    mongoArticleRequests.getAllArticles(page)
        .catch(function(err) {
            res.status(500).json({
                success: false,
                payload: {},
                error: {
                    message: err.message,
                    stack: err.stack
                }
            });
        })
        .done(function(articles) {
            res.status(200).json({
                success: true,
                payload: articles,
                error: null
            });
        });
};

module.exports = {
    addEditArticle: addEditArticle,
    deleteArticle: deleteArticle,
    voteArticle: voteArticle,
    getAllArticles: getAllArticles
};