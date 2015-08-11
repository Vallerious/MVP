var React = require('react');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton;

// Styles
var newCommentBox = {
    display: 'inline-block',
    padding: '5px'
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

    render: function () {
        return (
            <div className="row" style={newCommentBox}>
                <div className="col-xs-1">
                    <img src={this.props.avatar} width="30" height="30" alt="avatar" />
                </div>
                <div className="col-xs-11">
                    <div class="form-group">
                        <label for="comment">Comment:</label>
                        <textarea class="form-control" rows="5" id="comment" ref="articleComment"></textarea>
                    </div>
                    <RaisedButton label="Secondary" secondary={true} />
                    <RaisedButton label="Default" />
                </div>
            </div>
        )
    }
});

module.exports = NewCommentBox;