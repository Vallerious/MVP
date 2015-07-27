var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.js');
var ReactPropTypes = React.PropTypes;

//Theme dependencies:
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField;

var SignupPage = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {
      errors: []
     };
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
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;
    if (password !== passwordConfirmation) {
      this.setState({ errors: ['Password and password confirmation should match']});
    } else {
      SessionActionCreators.signup(email, username, password, passwordConfirmation);
    }
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
                hintText="Enter a new username"
                floatingLabelText="Username"
                fullWidth={true} />
              <TextField
                hintText="Enter your E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
                 />
              <TextField
                hintText="Enter a new password"
                floatingLabelText="Password"
                fullWidth={true} >
                  <input type="password" />
              </TextField>
              <TextField
                hintText="Repeat the new password"
                floatingLabelText="Repeat password"
                fullWidth={true}>
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

module.exports = SignupPage;
