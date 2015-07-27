var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var MainPage = require('./components/MainPage.react.js');
var LoginPage = require('./components/session/LoginPage.react.js');
var ArticlesPage = require('./components/articles/ArticlesPage.react.js');
var ArticlePage = require('./components/articles/ArticlePage.react.js');
var ArticleNew = require('./components/articles/ArticleNew.react.js');
var SignupPage = require('./components/session/SignupPage.react.js');

module.exports = (
  <Route name="main" path="/" handler={MainPage}>
    <DefaultRoute handler={ArticlesPage} />
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="articles" path="/articles" handler={ArticlesPage}/>
    <Route name="article" path="/articles/:articleId" handler={ArticlePage} />
    <Route name="new-article" path="/article/new" handler={ArticleNew}/>
  </Route>
);
