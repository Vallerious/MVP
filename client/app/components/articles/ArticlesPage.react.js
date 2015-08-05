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
    ArticleActionCreators.loadArticles();
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

    sortArticles: function () {
        this.state.articles = this.state.articles.sort(function (a1, a2) {
            return a1.title.localeCompare(a2.title);
        });
    },
  render: function() {
      var articles = this.state.articles.map(function (article, idx) {
          return <div>{article.title} - {article.content}</div>
      });
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
          <h1>Articles Page</h1>
          <label for="articles__sortBy">Sort by:</label>
          <select name="articlesSortBy" id="articles__sortBy" ref="articlesSortBy">
              <option value="content">Content</option>
              <option value="title">Title</option>
              <option value="createdOn">Date Created</option>
          </select>
          <label for="articles__order">Order:</label>
          <select name="articlesOrder" id="articles__order" ref="articlesOrder">
              <option value="1">Ascending</option>
              <option value="-1">Descending</option>
          </select>
          <button onClick={this.sortArticles}>Filter</button>
          {articles}
      </div>

    );
  }
});

module.exports = ArticlesPage;
