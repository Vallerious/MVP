var React = require('react');
var ArticleStore = require('../../stores/ArticleStore.react');
var SessionStore = require('../../stores/SessionStore.react');

var CommentContainer = require('./../comments/CommentContainer.react');
import VoteBar from './../common/VoteBar.react';

//Theme dependencies:
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    Card = mui.Card,
    CardActions = mui.CardActions,
    CardHeader = mui.CardHeader,
    CardText = mui.CardText,
    CardTitle = mui.CardTitle,
    CardMedia = mui.CardMedia,
    FlatButton = mui.FlatButton,
    Avatar = mui.Avatar,
    Dialog = mui.Dialog,
    FloatingActionButton = mui.FloatingActionButton,
    FontIcon = mui.FontIcon,
    RaisedButton = mui.RaisedButton;

// Styles
var modalWindow = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    padding: '15px',
    width: '80%',
    height: '80%',
    maxHeight: '80%',
    maxWidth: '80%',
    zIndex: '10000',
    overflowY: 'hidden'
};

var mask = {
    position: 'absolute',
    top: 0,
    left: '0',
    zIndex: '10001',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.8)'
};

var mainPane = {
    height: '394px',
    overflowY: 'auto'
}

function getStateFromStores() {
    return SessionStore.getUserData();
}

var ArticleModal = React.createClass({

    getInitialState: function () {
        var initState = getStateFromStores();

        return initState;
    },

    componentDidMount: function () {
        var self = this;
        ArticleStore.addChangeListener(this._onChange);

        $("html, body").css("overflow-y", "hidden");

        $(document).keyup(function (e) {
            if (e.which == 27) {
                self.closeModal();
            }
        });
    },

    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._onChange);
        $("html, body").css("overflow-y", "auto");
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    _onChange: function () {
        this.setState(getStateFromStores());
    },

    closeModal: function () {
        this.props.closeHandler();
    },

    render: function () {
        return (
            <div style={mask}>
                <span className="glyphicon glyphicon-remove btn--close-article" onClick={this.closeModal}></span>
                <div style={modalWindow}>
                    <Card initiallyExpanded={true} style={{padding: '15px'}}>
                        <div className="col-md-5">
                            <CardMedia overlay={<CardTitle title={this.props.title}
                                    subtitle={new Date(this.props.date).toDateString()} />}>
                                <img src={this.props.image ? this.props.image : './images/default-user-icon.png'} />
                            </CardMedia>
                        </div>
                        <div className="col-md-7">
                            <div style={mainPane} className="cool-scroll-black">
                                <CardHeader
                                    title={this.props.title}
                                    subtitle={new Date(this.props.date).toDateString()}
                                    avatar={this.props.image ? this.props.image : './images/default-user-icon.png'}
                                    showExpandableButton={false} />
                                
                                <CardText expandable={true} style={{wordWrap: 'break-word'}}>
                                    {this.props.content}
                                </CardText>
                                <CardActions expandable={true}>
                                    <VoteBar votes={this.props.votes} articleId={this.props.articleId} />
                                </CardActions>
                                <CommentContainer articleId={this.props.articleId} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
});

module.exports = ArticleModal;