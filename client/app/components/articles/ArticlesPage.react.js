var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ArticleStore = require('../../stores/ArticleStore.react.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.js');
var Article = require('../../components/articles/Article.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.js');
var Router = require('react-router');
var Link = Router.Link;

var Pager = require('react-pager');
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    DropDownMenu = mui.DropDownMenu,
    RadioButtonGroup = mui.RadioButtonGroup,
    RadioButton = mui.RadioButton,
    DatePicker = mui.DatePicker;

// Styles
var pagination = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
}; 

var ArticlesPage = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    handlePageChanged: function (newPage) {
        this.setState({current: newPage});
        ArticleActionCreators.loadArticles(newPage + 1);
        this.setState({
            articles: ArticleStore.getAllArticles().data,
            total: ArticleStore.getAllArticles().pageCount,
            visiblePages: ArticleStore.getAllArticles().pageCount,
            errors: ArticleStore.getErrors()
        });
    },

    getInitialState: function () {
        return {
            articles: [],
            errors: [],
            sortingMenuItems: [
                {payload: '', text: 'None'},
                {payload: 'title', text: 'Title'},
                {payload: 'content', text: 'Content'},
                {payload: 'createdOn', text: 'Date Created'},
                {payload: 'votes', text: 'Votes'}
            ],
            current: 0
        };
    },

    componentDidMount: function () {
        ArticleStore.addChangeListener(this._onChange);
        ArticleActionCreators.loadArticles();
    },

    componentWillUnmount: function () {
        ArticleStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            articles: ArticleStore.getAllArticles().data,
            total: ArticleStore.getAllArticles().pageCount,
            visiblePages: ArticleStore.getAllArticles().pageCount,
            errors: ArticleStore.getErrors()
        });
    },

    sortArticles: function () {
        this.state.articles = this.state.articles.sort(function (a1, a2) {
            return a1.title.localeCompare(a2.title);
        });
    },
    render: function () {
        var articles = this.state.articles.map(function (article) {
            return <Article title={article.title}
                            content={article.content}
                            date={article.createdOn}
                            image={article.image}
                            articleId={article._id}
                            votes={article.votes}
                            key={article._id} />
        });

        var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors} /> : <div></div>;

        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-md-offset-1">
                        <DatePicker
                            ref="createdOn"
                            hintText="Created On"
                            mode="landscape"/>
                    </div>
                </div>
                <div className="clearfix mb15"></div>
                {articles.length ? articles : "No articles match your criteria."}
                <div style={pagination}>
                    <Pager total={this.state.total}
                       current={this.state.current}
                       visiblePages={this.state.visiblePages}
                       onPageChanged={this.handlePageChanged} />
                </div>
            </div>
        );
    }
});

module.exports = ArticlesPage;
