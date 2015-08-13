var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _comments = [];
var _errors = [];

var CommentStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAllCommentsByArticle: function () {
        return _comments;
    },

});

CommentStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action) {
        case ActionTypes.RECIEVE_COMMENTS:
            _comments = action.json;
            CommentStore.emitChange();
            break;
    }
});

module.exports = CommentStore;