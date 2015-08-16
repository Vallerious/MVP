var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    addEditComment: function (articleId, content, postedBy, commentId) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.ADD_COMMENT,
            postedBy: postedBy,
            content: content,
            articleId: articleId
        });

        WebAPIUtils.addEditComment(articleId, content, postedBy, commentId);
    },

    getCommentsByArticle: function (id) {
        WebAPIUtils.getCommentsByArticle(id);
    },

    deleteComment: function (id) {
        WebAPIUtils.deleteComment(id);
    }
};