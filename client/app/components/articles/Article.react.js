var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ArticleStore = require('../../stores/ArticleStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var State = require('react-router').State;
var SessionStore = require('../../stores/SessionStore.react');

var ArticleModal = require('./ArticleModal.react');

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
    Dialog = mui.Dialog;

var Article = React.createClass({

    getInitialState: function () {
        return {};
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    componentDidMount: function () {
        ArticleStore.addChangeListener(this._onChange);
        ArticleActionCreators.loadArticles();
    },

    toggleArticleModal: function () {
        this.setState({show: !this.state.show});

        if ( window.pageYOffset > 400 ) {
            $("html, body").animate({ scrollTop: "0px" }, 1000);
        }
    },

    render: function () {
        var standardActions = [
              { text: 'Cancel' }
        ];

        var modal = this.state.show ?
            <ArticleModal closeHandler={this.toggleArticleModal}
                          articleId={this.props.articleId}
                          title={this.props.title}
                          image={this.props.image}
                          content={this.props.content}
                          date={this.props.date}
                          keyId={this.props.keyId}
                          votes={this.props.votes}
                          comments={this.props.comments} /> : '';

        return (
            <Card initiallyExpanded={true} className="mb15">
                <CardHeader
                    title={this.props.title}
                    subtitle={new Date(this.props.date).toDateString()}
                    avatar={this.props.image}>
                </CardHeader>
                <CardText expandable={true}>
                    {this.props.content.substring(0, 140) + "..."}
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton label="Read more..." onClick={this.toggleArticleModal}/>
                </CardActions>
                {modal}
            </Card>
        );
    }
});

module.exports = Article;
