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
    var articleData = req.body;
    var error = new Error();

    try {
        if (articleData.title && articleData.content) {
            var newArticle = new Article({
                title: articleData.title,
                title_normalized: articleData.title.toLowerCase(),
                content: articleData.content,
                content_normalized: articleData.content.toLowerCase(),
                postedBy: articleData.postedBy,
                comments: [], // add the Comment schema in the array after it`s created : )
                createdOn: Date.now(),
                editedOn: "",
                votes: 0,
                tags: articleData.tags,
                categories: articleData.categories
            });

            if (!articleData._id) { // no id? add new article
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
                newArticle = newArticle.toObject();
                newArticle.editedOn = Date.now();
                delete newArticle._id;
                delete newArticle.votes;
                delete newArticle.date;
                delete newArticle.comments;
                delete newArticle.postedBy;

                Article.update({_id: articleData._id}, newArticle, {multi: false}, function (err, article) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            payload: {},
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
    try {
        var articleData = req.body.article;

        if (articleData.articleId) {
            var articleId = articleData.articleId;
            var increment = 1;

            if (articleData.voteDown) {
                increment = -1;
            }

            Article.update({_id: articleId}, {$inc: {votes: increment}}, {upsert: false}, function (err) {
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
 * Gets all Posts/Articles from mongoDB.
 *
 * @author Valeri Hristov
 * @param {Number} req.body.dataParams.pageNumber - the number of the required page
 * @param {Object} req.body.dataParams.sortBy - {field: 'content', order: 1}
 * @returns {HTTP.RESPONSE}
 * @public
 * @version 0.1 Beta
 */
var getAllArticles = function (req, res) {
    try {
        var articlesPerPage = config.articlesPerPage;
        var pageNumber = req.query.page;
        var sortBy = {field: 'content', order: 1}; // Object - name of the field and -1 or 1 for asc and desc

        if (sortBy.field == "content" || sortBy.field == "title") {
            sortBy.field += "_normalized";
        }

        var mongoSortObj = {};

        if (sortBy.field) {
            mongoSortObj[sortBy.field] = sortBy.order;
        }

        Article.paginate({}, {
            page: pageNumber,
            limit: articlesPerPage,
            sortBy: mongoSortObj
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

var filterArticles = function (req, res) {
    try {
        var filterText = req.query.filterText;

        Article.find({title_normalized: new RegExp(filterText, "i")}, function (err, articles) {
            if (!err) {
                res.status(200).json({
                    success: true,
                    payload: articles,
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
    getAllArticles: getAllArticles,
    filterArticles: filterArticles
};