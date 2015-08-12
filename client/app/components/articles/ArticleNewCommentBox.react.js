var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton;

// Styles
var newCommentBox = {
    padding: '10px'
};

var avatar = {
    float: 'left'
};

var textareaComment = {
    resize: 'none'
};

var NewCommentBox = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    addComment: function () {
        var content = this.refs.articleComment.getDOMNode().value;
        var postedBy = SessionStore.getUserId();
        var articleId = this.props.articleId;

        WebAPIUtils.addComment(articleId, content, postedBy);
    },

    render: function () {
        return (
            <div className="row" style={newCommentBox}>
                <div className="col-xs-1">
                    <img src={this.props.avatar ?  this.props.avatar : './images/default-user-icon.png'} width="30" height="30" alt="avatar" style={avatar} />
                </div>
                <div className="col-xs-11">
                    <div class="form-group">
                        <textarea class="form-control" rows="5" cols="35" style={textareaComment} ref="articleComment"></textarea>
                    </div>
                    <RaisedButton label="Post comment" onClick={this.addComment} secondary={true} style={{marginRight: '10px'}} />
                    <RaisedButton label="Cancel" />
                </div>
            </div>
        )
    }
});

module.exports = NewCommentBox;