var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage
var _accessToken = sessionStorage.getItem('accessToken');
var _username = sessionStorage.getItem('username');
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    isLoggedIn: function () {
        return _accessToken ? true : false;
    },

    getAccessToken: function () {
        return _accessToken;
    },

    getUsername: function () {
        return _username;
    },

    getErrors: function () {
        return _errors;
    }

});

SessionStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case ActionTypes.LOGIN_RESPONSE:
            if (action.json && action.json.token) {
                _accessToken = action.json.token;
                _username = action.json.payload.username;
                // Token will always live in the session, so that the API can grab it with no hassle
                sessionStorage.setItem('accessToken', _accessToken);
                sessionStorage.setItem('username', _username);
            }
            if (action.errors) {
                _errors = action.errors;
            }
            SessionStore.emitChange();
            break;

        case ActionTypes.LOGOUT:
            _accessToken = null;
            _username = null;
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('username');
            SessionStore.emitChange();
            break;

        default:
    }

    return true;
});

module.exports = SessionStore;
