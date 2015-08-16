var React = require('react');
var CommentActionCreators = require('../../actions/CommentActionCreators');
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

    propagedeAction: function (params) {
        var action = params[0];

        if (action == "comment.delete") {
            CommentActionCreators.deleteComment(params[2]);
            CommentActionCreators.getCommentsByArticle(this.props.articleId);
        } else {
            this.props.propagedeAction(params);
        }
    },

    render: function () {
        var self = this;
        var comments = this.state.comments.map(function (comment) {
            return <Comment content={comment.content}
                            date={comment.createdOn}
                            username={comment.postedBy}
                            avatar={comment.image}
                            articleId={comment.articleId}
                            key={comment._id}
                            commentId={comment._id}
                            propagedeAction={self.propagedeAction} />
        });

        return (
            <div>
                {comments}
            </div>
        );
    }
});

module.exports = CommentList;