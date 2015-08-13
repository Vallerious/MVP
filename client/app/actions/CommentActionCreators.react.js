var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    addComment: function (articleId, content, postedBy) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_COMMENT,
            postedBy: postedBy,
            content: content,
            articleId: articleId
        });

        WebAPIUtils.addComment(articleId, content, postedBy);
    },

    getCommentsByArticle: function (id) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_COMMENTS,
            id: id
        });

        WebAPIUtils.getCommentsByArticle(id);
    }
};