var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ArticleStore = require('../../stores/ArticleStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var State = require('react-router').State;

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
        return {
            
        }    
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    openArticleModal: function () {
        this.refs.showArticle.show();
    },

    render: function () {
        var standardActions = [
              { text: 'Cancel' }
        ];

        return (
            <Card initiallyExpanded={true} className="mb15">
                <CardHeader
                    title={this.props.title}
                    subtitle={new Date(this.props.date).toDateString()}
                    avatar="http://lorempixel.com/600/337/nature/">
                </CardHeader>
                <CardText expandable={true}>
                    {this.props.content.substring(0, 140) + "..."}
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton label="Read more..." onClick={this.openArticleModal}/>
                </CardActions>
                <Dialog
                    ref="showArticle"
                    actions={standardActions}
                    autoDetectWindowHeight={true} autoScrollBodyContent={true}>
                    <div style={{height: 'auto'}}>
                        <Card initiallyExpanded={true}>
                              <CardHeader
                                title={this.props.title}
                                subtitle={new Date(this.props.date).toDateString()}
                                avatar="http://lorempixel.com/600/337/nature/"
                                showExpandableButton={false} />
                                <CardMedia overlay={<CardTitle title={this.props.title} subtitle={new Date(this.props.date).toDateString()} />}>
                                    <img src="http://lorempixel.com/600/337/nature/"/>
                                </CardMedia>
                              <CardText expandable={true}>
                                {this.props.content}
                              </CardText>
                              <CardActions expandable={true}>
                                <FlatButton label="Vote Up"/>
                                <FlatButton label="Vote Down"/>
                                <FlatButton label="+ Favorites"/>
                              </CardActions>
                              {
                                    this.props.comments.map(function(comment, idx) {
                                        
                                    });    
                              }
                        </Card>
                    </div>
                </Dialog>
            </Card>
        );
    }
});

module.exports = Article;