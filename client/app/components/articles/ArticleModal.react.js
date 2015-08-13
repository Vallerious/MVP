var React = require('react');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react');
var ArticleStore = require('../../stores/ArticleStore.react');
var SessionStore = require('../../stores/SessionStore.react');

var CommentContainer = require('./CommentContainer.react');

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
    left: '50%',
    zIndex: '10000',
    marginLeft: '-300px'
};

var mask = {
    position: 'absolute',
    top: 0,
    left: '0',
    zIndex: '10001',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(88,88,88, 0.8)'
};

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
        ArticleStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._onChange);
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

    render: function () {

        var buttonBar = this.state.isLoggedIn ?

                <RaisedButton secondary={!this.state.activeVoteBtnStyle}
                              primary={this.state.activeVoteBtnStyle}
                              label={"+ " + (this.state.votes == 0 ? 1 : this.state.votes)}
                              onClick={this.voteArticle.bind(null, this.props.articleId)} />
             : <span></span>;

        return (
            <div style={mask}>
                <div style={modalWindow}>
                    <Card initiallyExpanded={true}>
                        <FlatButton label="Close" onClick={this.props.closeHandler} />
                        <CardHeader
                            title={this.props.title}
                            subtitle={new Date(this.props.date).toDateString()}
                            avatar={this.props.image ? this.props.image : './images/default-user-icon.png'}
                            showExpandableButton={false} />
                        <CardMedia overlay={<CardTitle title={this.props.title}
                                   subtitle={new Date(this.props.date).toDateString()} />}>
                            <img src={this.props.image ? this.props.image : './images/default-user-icon.png'} />
                        </CardMedia>
                        <CardText expandable={true}>
                            {this.props.content}
                        </CardText>
                        <CardActions expandable={true}>
                            {buttonBar}
                        </CardActions>
                        <CommentContainer articleId={this.props.articleId} />
                    </Card>
                </div>
            </div>
        )
    }
});

module.exports = ArticleModal;