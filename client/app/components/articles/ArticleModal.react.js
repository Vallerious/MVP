var React = require('react');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react');
var ArticleStore = require('../../stores/ArticleStore.react');
var SessionStore = require('../../stores/SessionStore.react');

var CommentContainer = require('./../comments/CommentContainer.react');

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
    return {
        isLoggedIn: SessionStore.isLoggedIn(),
        username: SessionStore.getUsername()
    };
}

var ArticleModal = React.createClass({

    getInitialState: function () {
        var initState = getStateFromStores();

        initState.votes = this.props.votes;
        initState.activeVoteBtnStyle = false;

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

        var prevVotes = this.state.votes;
        var currVotes = ArticleStore.getVotes();

        if ( prevVotes < currVotes ) { // red
            this.setState({activeVoteBtnStyle: true});
        } else { // normal
            this.setState({activeVoteBtnStyle: false});
        }

        this.setState({votes: ArticleStore.getVotes()});
    },

    voteArticle: function (articleId) {
        var userId = sessionStorage.getItem('user_id');
        ArticleActionCreators.voteArticle(articleId, userId);
    },

    renderButtonBar: function () {
        return (
            this.state.isLoggedIn ?
                <RaisedButton secondary={!this.state.activeVoteBtnStyle}
                              primary={this.state.activeVoteBtnStyle}
                              label={"+ " + (this.state.votes == 0 ? 1 : this.state.votes)}
                              onClick={this.voteArticle.bind(null, this.props.articleId)} />
             : <span></span>
            );
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
                                    {this.renderButtonBar()}
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