var React = require('react');
var CommentActionCreators = require('../../actions/CommentActionCreators');
var SessionStore = require('../../stores/SessionStore.react');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton;

// Styles
var p10 = {
    padding: '10px'
};

var avatar = {
    float: 'left'
};

var textareaComment = {
    resize: 'none'
};

var NewCommentBox = React.createClass({

    getInitialState: function () {
        return {content: ""};
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    componentWillMount: function () {
        console.log("New comment box mounted");
    },

    addEditComment: function () {
        var content = this.refs.articleComment.getDOMNode().value;
        var postedBy = SessionStore.getUserId();
        var articleId = this.props.articleId;
        var commentId = this.props.commentId;

        CommentActionCreators.addEditComment(articleId, content, postedBy, commentId);
        CommentActionCreators.getCommentsByArticle(articleId);
        
        this.cancelAddComment();  
    },

    cancelAddComment: function () {
        this.props.cancelHandler();
    },

    render: function () {
        return (
            <div className="row" style={p10}>
                <div className="col-xs-1">
                    <img src={this.props.avatar ?  this.props.avatar : './images/default-user-icon.png'} 
                        width="30" height="30" alt="avatar" style={avatar} />
                </div>
                <div className="col-xs-11">
                    <div class="form-group">
                        <textarea class="form-control" rows="5" cols="35" style={textareaComment} ref="articleComment" defaultValue={this.props.content} autoFocus></textarea>
                    </div>
                    <RaisedButton label="Post comment" onClick={this.addEditComment} secondary={true} style={{marginRight: '10px'}} />
                    <RaisedButton label="Cancel" onClick={this.cancelAddComment} />
                </div>
            </div>
        )
    }
});

module.exports = NewCommentBox;