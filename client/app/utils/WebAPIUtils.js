var ServerActionCreators = require('../actions/ServerActionCreators.react.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
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

  signup: function(email, username, password) {
    request.post(APIEndpoints.REGISTRATION)
      .send({user: {
        email: email,
        username: username,
        password: password
      }})
      .set('Accept', 'application/json')
      .end(function(error, res) {
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

  login: function(username, password) {
    request.post(APIEndpoints.LOGIN)
      .send({user: {username: username, password: password, grant_type: 'password' }})
      .set('Accept', 'application/json')
      .end(function(error, res){
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

  loadArticles: function() {
    request.get(APIEndpoints.ARTICLES)
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          var json = res.body.payload;
          ServerActionCreators.receiveArticles(json);
        }
      });
  },

  loadArticle: function(storyId) {
    request.get(APIEndpoints.ARTICLES + '/' + articleId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveArticle(json);
        }
      });
  },

  createArticle: function(title, content, tags, categories) {
    request.post(APIEndpoints.CREATE_ARTICLE)
      .set('Accept', 'application/json')
      //.set('Authorization', sessionStorage.getItem('accessToken'))
      .send({ article: { title: title, content: content, tags: tags, categories: categories } })
      .end(function(error, res) {
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
  }

};
