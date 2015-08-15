var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    Avatar = mui.Avatar;

var Header = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    propTypes: {
      isLoggedIn: ReactPropTypes.bool,
      username: ReactPropTypes.string
    },

    logout: function(e) {
      e.preventDefault();
      SessionActionCreators.logout();
    },

    render() {

        var rightNav = this.props.isLoggedIn ? (
          <ul className="nav navbar-nav navbar-right">
            <li><Avatar className="avatar" src={sessionStorage.getItem('userImage')} /></li>
            <li><a href="#">{this.props.username}</a></li>
            <li><a href='#' onClick={this.logout}>Logout</a></li>
          </ul>
        ) : (
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="login">Sign in</Link></li>
            <li><Link to="signup">Sign up</Link></li>
          </ul>
        );

        var leftNav = this.props.isLoggedIn ? (
          <ul className="nav navbar-nav">
            <li><Link to="articles">Articles</Link></li>
            <li><Link to="new-article">New article</Link></li>
          </ul>
        ) : (
          <ul className="nav navbar-nav">
            <li><Link to="articles">Articles</Link></li>
          </ul>
        );

        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">RSD Blog</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        {leftNav}
                        {rightNav}
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
