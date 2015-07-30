var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/Header.react.js');
var SessionStore = require('../stores/SessionStore.react.js');
var RouteStore = require('../stores/RouteStore.react.js');

function getStateFromStores() {
  return {

  };
}

var MainPage = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          email={this.state.email} />
          <div className="container">
            <RouteHandler/>
          </div>
      </div>
    );
  }

});

module.exports = MainPage;
