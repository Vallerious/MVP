var React = require('react');

// Stores
var SessionStore = require('../../stores/SessionStore.react');

// Components
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
    RaisedButton = mui.RaisedButton;

// Styles
var modalWindow = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    padding: '15px',
    width: '90%',
    height: '90%',
    maxHeight: '90%',
    maxWidth: '90%',
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
    width: '100%',
    margin: '0 auto',
    overflowY: 'auto',
}

var ArticleModal = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function () {
        return SessionStore.getUserData();
    },

    componentDidMount: function () {
        var self = this;

        $("html, body").css("overflow-y", "hidden");

        $(document).keyup(function (e) {
            if (e.which == 27) {
                self.closeModal();
            }
        });
    },

    componentWillUnmount: function () {
        $("html, body").css("overflow-y", "auto");
    },

    _onChange: function () {},

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