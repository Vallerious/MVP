var ServerActionCreators = require('../actions/ServerActionCreators.react.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

var json;

function _getErrors(res) {
    var errorMsgs = ["Something went wrong, please try again"];
    if (json = res.body) {
        if (json['errors']) {
            errorMsgs = json['errors'];
        } else if (json['error']) {
            errorMsgs = [json['error']];
        }
    }
    return errorMsgs;
}

var APIEndpoints = AppConstants.APIEndpoints;

module.exports = {

    signup: function (email, username, password, image) {
        request
            .post(APIEndpoints.REGISTRATION)
            .send({
                user: {
                    email: email,
                    username: username,
                    password: password,
                    image: image
                }
            })
            .set('Accept', 'application/json')
            .end(function (error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsgs = _getErrors(res);
                        ServerActionCreators.receiveLogin(null, errorMsgs);
                    } else {
                        json = JSON.parse(res.text);
                        ServerActionCreators.receiveLogin(json, null);
                    }
                }
            });
    },

    login: function (username, password) {
        request.post(APIEndpoints.LOGIN)
            .send({user: {username: username, password: password, grant_type: 'password'}})
            .set('Accept', 'application/json')
            .end(function (error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsgs = _getErrors(res);
                        ServerActionCreators.receiveLogin(null, errorMsgs);
                    } else {
                        ServerActionCreators.receiveLogin(res.body, null);
                    }
                }
            });
    },

    loadArticles: function (pageNum) {
        request.get(APIEndpoints.ARTICLES + pageNum)
            .set('Accept', 'application/json')
            .end(function (error, res) {
                if (res) {
                    var json = res.body.payload;
                    ServerActionCreators.receiveArticles(json);
                }
            });
    },

    loadArticle: function (storyId) {
        request.get(APIEndpoints.ARTICLES + '/' + articleId)
            .set('Accept', 'application/json')
            .set('Authorization', sessionStorage.getItem('accessToken'))
            .end(function (error, res) {
                if (res) {
                    json = JSON.parse(res.text);
                    ServerActionCreators.receiveArticle(json);
                }
            });
    },

    createArticle: function (title, content, image, createdBy, tags, categories) {
        request.post(APIEndpoints.CREATE_ARTICLE)
            .set('Accept', 'application/json')
            //.set('Authorization', sessionStorage.getItem('accessToken'))
            .send({article: {title: title, content: content, image: image, createdBy: createdBy, tags: tags, categories: categories}})
            .end(function (error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsgs = _getErrors(res);
                        ServerActionCreators.receiveCreatedArticle(null, errorMsgs);
                    } else {
                        json = JSON.parse(res.body.payload);
                        ServerActionCreators.receiveCreatedArticle(json, null);
                    }
                }
            });
    },

    voteArticle: function (articleId, user) {
        request.post(APIEndpoints.VOTE_ARTICLE)
        .set('Accept', 'application/json')
        .send({ article: {articleId: articleId, user: user}})
        .end(function (error, res) {
            if (res.error) {
                var errorMsgs = _getErrors(res);
                ServerActionCreators.receiveVotedArticle(null, errorMsgs);
            } else {
                json = res.body.payload;
                ServerActionCreators.receiveVotedArticle(json, null);
            }
        })
    }
};
