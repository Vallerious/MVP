var React = require('react');
var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.js');
var MenuList = require('../common/MenuList.react.js');

//Theme dependencies:
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField;

/*
 Styles
 */
var articleBox = {
    maxWidth: '1140px !important',
    border: '1px solid black',
    padding: '15px',
    margin: '0 auto'
};

var ArticleNew = React.createClass({

    getInitialState: function () {
        return {
            tags: "",
            categories: ""
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

    _onChange: function () {
        this.setState({errors: SessionStore.getErrors()});
    },

    componentDidMount: function () {
        if (!SessionStore.isLoggedIn()) {
            //RouteActionCreators.redirect('main');
        }
    },

    _onSubmit: function (e) {
        e.preventDefault();
        this.setState({errors: []});
        var title = this.refs.title.getValue();
        var content = this.refs.content.getValue();
        var tags = this.state.tags;
        var categories = this.state.categories;
        ArticleActionCreators.createArticle(title, content, tags, categories);
    },
    getChildInput: function (refs) {
        this.state.tags = refs.tags.getValue();
        this.state.categories = refs.categories.getValue();
    },
    render: function () {
        return (
            <article className={articleBox}>
                <form onSubmit={this._onSubmit}>
                    <div className="row">
                        <div className="col-md-5 mt10">
                            <MenuList onInputUpdate={this.getChildInput} />
                        </div>
                        <div className="col-md-7">
                            <TextField
                                ref="title"
                                hintText="Enter article title..."
                                floatingLabelText="Title"
                                fullWidth={true}/>
                            <TextField
                                ref="content"
                                hintText="Say what`s on your mind :)"
                                floatingLabelText="Content"
                                multiLine={true}
                                rows={12}
                                fullWidth={true}/>
                            <RaisedButton type="submit" className="pull-right" label="Publish" secondary={true}/>
                        </div>
                    </div>
                </form>
            </article>
        );
    }

});

module.exports = ArticleNew;
