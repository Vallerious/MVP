var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ArticleStore = require('../../stores/ArticleStore.react.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var Router = require('react-router');
var Link = Router.Link;

var ArticlesPage = React.createClass({

  getInitialState: function() {
    return {
      articles: [],
      errors: []
    };
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
    //ArticleActionCreators.loadArticles();
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
   this.setState({
     articles: ArticleStore.getAllArticles(),
     errors: ArticleStore.getErrors()
   });
 },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <h1>Articles Page</h1>
    );
  }
});

module.exports = ArticlesPage;
