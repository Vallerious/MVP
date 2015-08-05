var APIRoot = "http://127.0.0.1:3000/api";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/register",
    ARTICLES: APIRoot + "/post/list",
    CREATE_ARTICLE: APIRoot + "/post/add"
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
