var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    signup: function (email, username, password, image) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SIGNUP_REQUEST,
            email: email,
            username: username,
            password: password,
            image: image
        });

        WebAPIUtils.signup(email, username, password, image);
    },

    login: function (username, password) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOGIN_REQUEST,
            username: username,
            password: password
        });

        WebAPIUtils.login(username, password);
    },

    logout: function () {
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOGOUT
        });
    }

};
