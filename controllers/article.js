var fs = require('fs');
var mongoose = require('mongoose');
var when = require('when');
var db = require('./../helpers/mongodbConnect');
var config = require('./../config');
var Article = require('./../models/article');

/**
 * Adds a Post/Article to mongoDB. If an Id is provided the method will edit the article.
 *
 * @author Valeri Hristov
 * @param {string} req.body.title
 * @param {string} req.body.content
 * @param {Id} req.body.postedBy - The mongoDb Id of the user that submits the article.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var addEditArticle = function (req, res) {
    var articleData = req.body.article;
    var error = new Error();

    try {
        if (articleData.title && articleData.content && articleData.createdBy) {

            if (!articleData._id) { // no id? add new article
                var newArticle = new Article({
                    title: articleData.title,
                    content: articleData.content,
                    image: articleData.image,
                    postedBy: articleData.createdBy,
                    createdOn: Date.now(),
                    editedOn: "",
                    votes: 0,
                    votedBy: [],
                    tags: articleData.tags,
                    categories: articleData.categories
                });

                newArticle.save(function (err) {
                    if (err) {
                        err.status = 500;
                        throw err;
                    } else {
                        res.status(200).json({
                            success: true,
                            payload: {},
                            error: null
                        });
                    }
                });
            } else { // id provided, editing existing article
                var newArticle = {
                    title: articleData.title,
                    content: articleData.content,
                    image: articleData.image,
                    editedOn: "",
                    tags: articleData.tags,
                    categories: articleData.categories
                };

                Article.findByIdAndUpdate(articleData.articleId, newArticle, {multi: false}, function (err, article) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            payload: {article: article},
                            error: null
                        });
                    } else {
                        err.status = 500;
                        throw err;
                    }
                });
            }
        } else {
            error.message = "Invalid input data";
            error.code = 124;
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({
            success: false,
            payload: {},
            error: {
                code: err.code,
                message: err.message
            }
        });
    }
};

/**
 * Deletes a Article from mongoDB by article Id.
 *
 * @author Valeri Hristov
 * @param {Id} req.body.articleId - The mongoDb Id of the article that is to be deleted.
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var deleteArticle = function (req, res) {
    var articleData = req.body.article;
    var error = new Error();

    try {
        if (articleData.articleId) {
            Article.findById(articleData.articleId).remove(function (err) {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        payload: {},
                        error: null
                    });
                } else {
                    err.status = 500;
                    throw err;
                }
            });
        } else {
            error.code = 124;
            error.message = "Id is required to delete a document!";
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
        })
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
var voteArticle = function (req, res) {
    var error = new Error();

    try {
        var articleData = req.body.article;

        if (articleData.articleId && articleData.user) {
            var articleId = articleData.articleId;
            var votedBy = articleData.user;

            Article.findById(articleId, function (err, article) {
                if (err) {
                    err.status = 500;
                    throw err;
                } else {
                    var idx = article.votedBy.indexOf(votedBy);

                    if ( idx > -1 ) { // found
                        article.votedBy.splice(idx, 1);
                        article.votes -= 1;
                    } else {
                        article.votedBy.push(votedBy);
                        article.votes += 1;
                    }

                    article.save(function (err) {
                        if ( err ) {
                            err.status = 500;
                            throw err;
                        }

                        res.status(200).json({
                            success: true,
                            payload: {votes: article.votes},
                            error: null
                        });
                    });
                }
            });
        } else {
            error.code = 124;
            error.message = "Id is required to vote an article!";
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
var getAllArticles = function (req, res) {
    try {
        var articlesPerPage = config.articlesPerPage;
        var pageNumber = req.query.page;

        Article.paginate({}, {
            page: pageNumber,
            limit: articlesPerPage
        }, function (err, results, pageCount, itemCount) {
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
