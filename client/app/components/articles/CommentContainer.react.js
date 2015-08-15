var React = require('react');

var CommentList = require('./CommentList.react');
var NewCommentBox = require('./NewCommentBox.react.js');
var SessionStore = require('./../../stores/SessionStore.react');

var toggleComments = {
    textDecoration: 'underline',
    padding: '10px'
};

var CommentContainer = React.createClass({

    getInitialState: function () {
        return SessionStore.getUserData();
    },

    toggleCommentList: function () {
        this.setState({openCommentList: !this.state.openCommentList});
    },

    openNewCommentWindow: function () {
        this.setState({openNewCommentBox: !this.state.openNewCommentBox});
    },

    render: function () {
        var toggleComments =
            <div style={toggleComments} onClick={this.toggleCommentList}>
                Show comments
            </div>;

        var addCommentBtn =
            <div className="p10">
                <input type="text" className="p10"
                       onClick={this.openNewCommentWindow} />
            </div>;

        return (
            <div>
                {toggleComments}
                {this.state.openCommentList ? <CommentList articleId={this.props.articleId} /> : <span></span>}
                {this.state.openNewCommentBox && this.state.isLoggedIn ? <NewCommentBox articleId={this.props.articleId} /> : <span></span>}
                {this.state.openNewCommentBox && this.state.isLoggedIn ? <span></span> : addCommentBtn}
            </div>
        )
    }
});

module.exports = CommentContainer;