var React = require('react');
var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ArticleActionCreators = require('../../actions/ArticleActionCreators.react.js');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.js');

//Theme dependencies:
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField;

// Styles
var articleBox = {
  maxWidth: '1140px !important',
  border: '1px solid black',
  padding: '15px',
  margin: '0 auto'
};

var articleContent = {
  width: '652.5px',
  resize: 'none'
};

var multiValue = {
  width: '100% !important'
};

var ArticleNew = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      //RouteActionCreators.redirect('main');
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.title.getValue();
    var password = this.refs.content.getValue();
    SessionActionCreators.login(email, password);
  },

  render: function() {
    return (
        <article className={articleBox}>
          <form onSubmit={this._onSubmit}>
            <div className="row">
              <div className="col-md-5 mt10">
                <div className="form-group">
                  <label for="usr">Tags</label>
                  <div className="clearfix"></div>
                  <input type="text" className="form-control" style={{width: '100% !important;'}} value="" data-role="tagsinput" />
                </div>
                <div className="form-group">
                  <label for="usr">Categories</label>
                  <div className="clearfix"></div>
                  <input type="text" className="form-control" value="" data-role="tagsinput" />
                </div>
              </div>
              <div className="col-md-7">
                <TextField
                    ref="title"
                    hintText="Enter article title..."
                    floatingLabelText="Title"
                    fullWidth={true} />
                <TextField
                    ref="content"
                    hintText="Say what`s on your mind :)"
                    floatingLabelText="Content"
                    multiLine={true}
                    rows={12}
                    fullWidth={true} />
                <RaisedButton type="submit" className="pull-right" label="Publish" secondary={true} />
              </div>
            </div>
          </form>
        </article>
     );
  }

});

module.exports = ArticleNew;
