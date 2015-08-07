var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ArticleStore = require('../../stores/ArticleStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var State = require('react-router').State;

var ArticlePage = React.createClass({

    mixins: [State],

    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
        ArticleStore.addChangeListener(this._onChange);
        ArticleActionCreators.loadArticle(this.getParams().storyId);
    },

    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <h1>Article Page</h1>
        )
    }

});

module.exports = ArticlePage;
