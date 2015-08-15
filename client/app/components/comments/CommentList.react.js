var React = require('react');
var CommentActionCreators = require('../../actions/CommentActionCreators.react');
var CommentStore = require('../../stores/CommentStore.react');
var Comment = require('./Comment.react');

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
        var comments = this.state.comments.map(function (comment) {
            return <Comment content={comment.content}
                            date={comment.createdOn}
                            username={comment.postedBy}
                            avatar={comment.image}
                            key={comment._id} />
        });

        return (
            <div>
                {comments}
            </div>
        );
    }
});

module.exports = CommentList;