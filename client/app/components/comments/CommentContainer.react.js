var React = require('react');
var CommentStore = require('./../../stores/CommentStore.react');
var CommentList = require('./CommentList.react');
var NewCommentBox = require('./NewCommentBox.react.js');
var SessionStore = require('./../../stores/SessionStore.react');

// Styles
var commentContainer = {
    display: 'inline-block',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    width: '100%'
};

var toggleComments = {
    padding: '1px 0px 10px 0px'
};

var addCommentBtn = {
    width: '100%'
}

var CommentContainer = React.createClass({

    getInitialState: function () {
        return SessionStore.getUserData();
    },

    componentDidMount: function () {
        CommentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CommentStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({commentCount: CommentStore.getCommentCount()});
    },

    toggleCommentList: function () {
        this.setState({openCommentList: !this.state.openCommentList});
    },

    toggleNewCommentWindow: function () {
        this.setState({openNewCommentBox: !this.state.openNewCommentBox});
    },

    propagedeAction: function (params) {
        var action = params[0];

        if (action == "comment.edit") {
            this.setState({openNewCommentBox: true});
            this.setState({commentId: params[2]});
            this.setState({content: params[3]});
        }
    },

    closeNewCommentBox: function () {
        this.setState({content: ""});
        this.setState({commentId: ""});
        this.setState({openNewCommentBox: false});
    },

    renderShowCommentsBtn: function () {
       return (
            <div style={toggleComments} onClick={this.toggleCommentList}>
                <span className="btn-link">{this.state.commentCount ? (this.state.commentCount + " ") : "Show "} comments</span>
                {this.state.openCommentList ? 
                    <span className="glyphicon glyphicon-menu-up"></span> : <span className="glyphicon glyphicon-menu-down"></span>}
            </div>
        )
    },

    renderAddCommentsBtn: function () {
        return (
            <div className="p10">
                <input type="text" 
                        className="p10" 
                        onClick={this.toggleNewCommentWindow}
                        placeholder="Add a comment..."
                        style={addCommentBtn} />
            </div>
            );
    },

    render: function () {
        return (
            <div style={commentContainer}>
                {this.renderShowCommentsBtn()}
                {this.state.openCommentList ? 
                    <CommentList articleId={this.props.articleId} propagedeAction={this.propagedeAction} /> : <span></span>}
                {this.state.openNewCommentBox && this.state.isLoggedIn ?
                    <NewCommentBox articleId={this.props.articleId}
                                    commentId={this.state.commentId}
                                    cancelHandler={this.closeNewCommentBox}
                                    content={this.state.content} /> : <span></span>}
                {(this.state.openNewCommentBox || !this.state.isLoggedIn) ? <span></span> : this.renderAddCommentsBtn()}
            </div>
        )
    }
});

module.exports = CommentContainer;