var React = require('react');
var CommentActionCreators = require('../../actions/CommentActionCreators.react');
var CommentStore = require('../../stores/CommentStore.react');
var Comment = require('./Comment.react');

var commentList = {
    color: '#f5f5f5',
    borderTop: '1px solid #686868'
};

var CommentList = React.createClass({

    getInitialState: function () {
        return {
            comments: [],
            commentCount: 0
        }
    },

    componentDidMount: function () {
        CommentStore.addChangeListener(this._onChange);
        CommentActionCreators.getCommentsByArticle(this.props.articleId);
    },

    componentWillUnmount: function () {
        CommentStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({comments: CommentStore.getAllCommentsByArticle()});
    },

    render: function () {
        var coms = [
            {content: "alabala", date: '2015-01-01', username: 'Valeri',
            avatar: './images/kenny.css'},

            {content: "alabala", date: '2015-01-01', username: 'Valeri',
                avatar: './images/kenny.css'},

            {content: "alabala", date: '2015-01-01', username: 'Valeri',
                avatar: './images/kenny.css'},

            {content: "alabala", date: '2015-01-01', username: 'Valeri',
                avatar: './images/kenny.css'}
        ];

        var comments = coms.map(function (comment) {
            return <Comment content={comment.content}
                            date={comment.createdOn}
                            username={comment.username}
                            avatar={comment.image}
                            key={comment._id} />
        });

        return (
            <div style={commentList}>
                {comments}
            </div>
        );
    }
});

module.exports = CommentList;