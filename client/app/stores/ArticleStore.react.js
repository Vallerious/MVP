var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _articles = [];
var _errors = [];
var _article = { title: "" };

var ArticleStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllArticles: function() {
    return _articles;
  },

  getArticle: function() {
    return _article;
  },

  getErrors: function() {
    return _errors;
  }
});

ArticleStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_ARTICLES:
      _articles = action.json;
      ArticleStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_ARTICLE:
      if (action.json) {
        _articles.unshift(action.json);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ArticleStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ARTICLE:
      if (action.json) {
        _article = action.json;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      ArticleStore.emitChange();
      break;
  }

  return true;
});

module.exports = ArticleStore;
