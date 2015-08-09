var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.js');
var SessionStore = require('../../stores/SessionStore.react.js');
var ErrorNotice = require('../../components/common/ErrorNotice.react.js');
var ReactPropTypes = React.PropTypes;

//Theme dependencies:
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    Paper = mui.Paper;

var SignupPage = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    getInitialState: function () {
        return {
            errors: []
        };
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
        this.setState({errors: []});
        var email = this.refs.email.getValue();
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        //validate if pass and repPass match
        SessionActionCreators.signup(email, username, password);
    },

    render: function () {
        var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
        return (
            <div>
                {errors}
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Paper className="form-container" zDepth={2}>
                            <form onSubmit={this._onSubmit}>
                                <h1 className="form-heading">Sign Up</h1>
                                <TextField
                                    ref="username"
                                    hintText="Enter a new username"
                                    floatingLabelText="Username"
                                    fullWidth={true}/>
                                <TextField
                                    ref="email"
                                    hintText="Enter your E-mail"
                                    floatingLabelText="E-mail"
                                    fullWidth={true}
                                    />
                                <TextField
                                    ref="password"
                                    hintText="Enter a new password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    type="password">
                                </TextField>
                                <TextField
                                    className="mb20"
                                    ref="passwordConfirmation"
                                    hintText="Repeat the new password"
                                    floatingLabelText="Repeat password"
                                    fullWidth={true}
                                    type="password">
                                </TextField>
                                <RaisedButton
                                    type="submit"
                                    label="Sign Up"
                                    secondary={true}/>
                            </form>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SignupPage;
