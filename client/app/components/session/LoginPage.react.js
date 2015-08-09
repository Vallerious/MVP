var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.js');
var SessionStore = require('../../stores/SessionStore.react.js');

var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    Paper = mui.Paper;

var LoginPage = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function () {
        return {errors: []};
    },

    componentDidMount: function () {
        SessionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        SessionStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({errors: SessionStore.getErrors()});
    },

    _onSubmit: function (e) {
        e.preventDefault();
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();

        if (username.length > 0 && password.length > 0) {
          this.setState({ errors: [] });
          SessionActionCreators.login(username, password);
        } else {
          if (!username || !username.length) {
            this.refs.username.setErrorText('Please, fill in you username');
          } if (!password || !password.length) {
            this.refs.password.setErrorText('Please, fill in your password');
          }
        }
    },

    clearUsernameError: function() {
      this.refs.username.setErrorText(null);
    },

    clearPasswordError: function() {
      this.refs.password.setErrorText(null);
    },

    render: function () {

        var username = (
          <TextField
              ref="username"
              hintText="Enter your username"
              floatingLabelText="Username"
              fullWidth={true}
              onChange={this.clearUsernameError}/>
        );

        var password = (
          <TextField
              className="mb20"
              ref="password"
              hintText="Enter your password"
              floatingLabelText="Password"
              fullWidth={true}
              type="password"
              onChange={this.clearPasswordError}/>
        );

        return (
            <div>
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <Paper className="form-container" zDepth={2}>
                    <form onSubmit={this._onSubmit}>
                        <h1 className="form-heading">Sign In</h1>
                        {username}
                        {password}
                        <RaisedButton
                            type="submit"
                            label="Login"
                            secondary={true}
                            />
                    </form>
                  </Paper>
                </div>
              </div>
            </div>
        );
    }
});

module.exports = LoginPage;
