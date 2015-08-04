var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  loadArticles: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ARTICLES
    });
    WebAPIUtils.loadArticles();
  },

  loadArticle: function(articleId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_ARTICLE,
      articleId: articleId
    });
    WebAPIUtils.loadArticle(articleId);
  },

  createArticle: function(title, content, tags, categories) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_ARTICLE,
      title: title,
      content: content,
      tags: tags,
      categories: categories
    });
    WebAPIUtils.createArticle(title, content, tags, categories);
  }

};
