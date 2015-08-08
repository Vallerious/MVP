var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/Header.react.js');
var SessionStore = require('../stores/SessionStore.react.js');
var RouteStore = require('../stores/RouteStore.react.js');

function getStateFromStores() {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      username: SessionStore.getUsername()
    };
}

var MainPage = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function () {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    },

    render: function () {
        return (
            <div className="main">
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                    username={this.state.username}/>

                <div className="container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }

});

module.exports = MainPage;
