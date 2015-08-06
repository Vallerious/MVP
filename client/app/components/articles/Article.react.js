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
    Avatar = mui.Avatar;

var Article = React.createClass({
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
            <Card initiallyExpanded={true} className="mb15">
                <CardHeader
                    title={this.props.title}
                    subtitle="Subtitle"
                    avatar={<Avatar style={{color:'#e8f0f5'}}>A</Avatar>}>
                </CardHeader>
                <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
                    <img src="http://lorempixel.com/600/337/nature/"/>
                </CardMedia>
                <CardText expandable={true}>
                    {this.props.content}
                </CardText>
                <CardActions expandable={true}>
                    <FlatButton label="Action1"/>
                    <FlatButton label="Action2"/>
                </CardActions>
                <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
        );
    }
});

module.exports = Article;