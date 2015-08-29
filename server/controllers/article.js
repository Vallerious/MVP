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
                })
            })
    } else {
        error.message = "Invalid input data";

        res.status(400).json({
            success: false,
            payload: {},
            error: error
        });
    }
};

/**
 * Votes up or down a Post/Article from mongoDB by post Id.
 *
 * @author Valeri Hristov
 * @param {Id} req.body.articleId - The mongoDb Id of the article that is to be deleted.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var voteArticle = function(req, res) {
    var error = new Error();

    try {
        var articleData = req.body.article;

        if (articleData.articleId && articleData.user) {
            var articleId = articleData.articleId;
            var votedBy = articleData.user;

            Article.findById(articleId, function(err, article) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    if (article) {
                        User.findById(votedBy, function(err, user) {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    payload: {},
                                    error: err
                                });
                            } else {
                                if (user) {
                                    var idx = article.votedBy.indexOf(votedBy);

                                    if (idx > -1) { // found
                                        article.votedBy.splice(idx, 1);
                                        article.votes -= 1;
                                    } else {
                                        article.votedBy.push(votedBy);
                                        article.votes += 1;
                                    }

                                    article.save(function(err) {
                                        if (err) {
                                            err.status = 500;
                                            throw err;
                                        }

                                        res.status(200).json({
                                            success: true,
                                            payload: {
                                                votes: article.votes
                                            },
                                            error: null
                                        });
                                    });
                                } else {
                                    error.message = "Voting with a non-existent user!";

                                    res.status(400).json({
                                        success: false,
                                        payload: {},
                                        error: error
                                    });
                                }
                            }
                        });
                    } else {
                        error.message = "Article with that ID does not exist";
                        res.status(400).json({
                            success: false,
                            payload: {},
                            error: error
                        });
                    }
                }
            });
        } else {
            error.code = 124;
            error.message = "ArticleId and userId is required to vote an article!";
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code || 666,
                message: err.message
            }
        });
    }
};

/**
 * Gets all Posts/Articles from mongoDB with pagination.
 *
 * @author Valeri Hristov
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var getAllArticles = function(req, res) {
    try {
        var articlesPerPage = 5;
        var pageNumber = req.query.page;

        Article.paginate({}, {
            page: pageNumber,
            limit: articlesPerPage
        }, function(err, results, pageCount, itemCount) {
            if (!err) {
                res.status(200).json({
                    success: true,
                    payload: {
                        data: results,
                        pageCount: pageCount,
                        itemCount: itemCount
                    },
                    error: null
                });
            } else {
                err.status = 500;
                throw err;
            }
        });
    } catch (err) {
        res.status(err.status || 400).json({
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
    addEditArticle: addEditArticle,
    deleteArticle: deleteArticle,
    voteArticle: voteArticle,
    getAllArticles: getAllArticles
};