var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/v1/login",
    REGISTRATION:   APIRoot + "/v1/users",
    STORIES:        APIRoot + "/v1/stories"
  },

  PayloadSources: {
    SERVER_ACTION: 'SERVER_ACTION',
    VIEW_ACTION: 'VIEW_ACTION'
  },

  ActionTypes: {
    // Session
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_RESPONSE: 'LOGIN_RESPONSE',

    // Routes
    REDIRECT: 'REDIRECT',

    LOAD_ARTICLES: 'LOAD_ARTICLES',
    RECEIVE_ARTICLES: 'RECEIVE_ARTICLES',
    LOAD_ARTICLE: 'LOAD_ARTICLE',
    RECEIVE_ARTICLE: 'RECEIVE_ARTICLE',
    CREATE_ARTICLE: 'CREATE_ARTICLE',
    RECEIVE_CREATED_ARTICLE: 'RECEIVE_CREATED_ARTICLE'
  }

};
