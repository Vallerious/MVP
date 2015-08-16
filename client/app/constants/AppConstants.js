var APIRoot = "http://127.0.0.1:3000/api";

module.exports = {

    APIEndpoints: {
        LOGIN: APIRoot + "/login",
        REGISTRATION: APIRoot + "/register",
        ARTICLES: APIRoot + "/article/list?page=",
        CREATE_ARTICLE: APIRoot + "/article/add",
        VOTE_ARTICLE: APIRoot + "/article/vote",
        ADD_EDIT_COMMENT: APIRoot + "/article/comment/add",
        LIST_COMMENTS: APIRoot + "/article/comment/list",
        DELETE_COMMENT: APIRoot + "/article/comment/delete"
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

        // Articles
        LOAD_ARTICLES: 'LOAD_ARTICLES',
        RECEIVE_ARTICLES: 'RECEIVE_ARTICLES',
        LOAD_ARTICLE: 'LOAD_ARTICLE',
        RECEIVE_ARTICLE: 'RECEIVE_ARTICLE',
        CREATE_ARTICLE: 'CREATE_ARTICLE',
        RECEIVE_CREATED_ARTICLE: 'RECEIVE_CREATED_ARTICLE',
        RECEIVE_PAGE_COUNT: 'RECEIVE_PAGE_COUNT',
        VOTE_ARTICLE: 'VOTE_ARTICLE',
        RECEIVE_VOTED_ARTICLE: 'RECEIVE_VOTED_ARTICLE',

        // Comments
        RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
        ADD_COMMENT: 'ADD_COMMENT',
        RECEIVE_ADD_COMMENT: 'RECEIVE_ADD_COMMENT',
        RECIEVE_DELETED_COMMENT: 'RECIEVE_DELETED_COMMENT'
    }

};
