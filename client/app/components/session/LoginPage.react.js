var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.js');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField;

var LoginPage = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return { errors: [] };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this._onSubmit}>
              <TextField
                hintText="Enter your username"
                floatingLabelText="Username"
                fullWidth={true} />
              <TextField
                hintText="Enter your password"
                floatingLabelText="Password"
                fullWidth={true} >
                  <input type="password" />
              </TextField>
              <RaisedButton
                label="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
