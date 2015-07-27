var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var SessionActionCreators = require('../actions/SessionActionCreators.react.js');

var Header = React.createClass({

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">RSD Blog</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="articles">Articles</Link></li>
              <li><Link to="new-article">New article</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="login">Sign in</Link></li>
              <li><Link to="signup">Sign up</Link></li>
            </ul>
        </div>
      </div>
      </nav>
    );
  }
});

module.exports = Header;
