var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    receiveLogin: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.LOGIN_RESPONSE,
            json: json,
            errors: errors
        });
    },

    receiveArticles: function (json) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_ARTICLES,
            json: json
        });
    },

    receiveArticle: function (json) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_ARTICLE,
            json: json
        });
    },

    receiveCreatedArticle: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_CREATED_ARTICLE,
            json: json,
            errors: errors
        });
    },

    receiveVotedArticle: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_VOTED_ARTICLE,
            json: json,
            errors: errors
        });
    },

    receiveAddedComment: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_ADD_COMMENT,
            json: json,
            errors: errors
        });
    },

    receiveComments: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_COMMENTS,
            json: json,
            errors: errors
        });
    },

    recieveDeletedComments: function (json, errors) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECIEVE_DELETED_COMMENT,
            json: json,
            errors: errors
        });
    }
};
