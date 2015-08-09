var APIRoot = "http://127.0.0.1:3000/api";

module.exports = {

    APIEndpoints: {
        LOGIN: APIRoot + "/login",
        REGISTRATION: APIRoot + "/register",
        ARTICLES: APIRoot + "/article/list?page=",
        CREATE_ARTICLE: APIRoot + "/article/add",
        VOTE_ARTICLE: APIRoot + "/article/vote"
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
        RECEIVE_CREATED_ARTICLE: 'RECEIVE_CREATED_ARTICLE',
        RECIEVE_PAGE_COUNT: 'RECIEVE_PAGE_COUNT',
        VOTE_ARTICLE: 'VOTE_ARTICLE',
        RECIEVE_VOTED_ARTICLE: 'RECIEVE_VOTED_ARTICLE'
    }

};
