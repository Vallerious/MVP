var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    loadArticles: function (pageNum) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_ARTICLES
        });
        WebAPIUtils.loadArticles(pageNum);
    },

    loadArticle: function (articleId) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_ARTICLE,
            articleId: articleId
        });

        WebAPIUtils.loadArticle(articleId);
    },

    createArticle: function (title, content, createdBy, tags, categories) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CREATE_ARTICLE,
            title: title,
            content: content,
            tags: tags,
            categories: categories,
            createdBy: createdBy
        });

        WebAPIUtils.createArticle(title, content, createdBy, tags, categories);
    },

    voteArticle: function (articleId, user) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.VOTE_ARTICLE,
            articleId: articleId,
            user: user
        });

        WebAPIUtils.voteArticle(articleId, user);
    }
};
