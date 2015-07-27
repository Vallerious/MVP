var React = require('react');
var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.js');

var ArticleNew = React.createClass({

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      RouteActionCreators.redirect('main');
    }
  },

  render: function() {
    return (
      <h1>Article New</h1>
     );
  }

});

module.exports = ArticleNew;
