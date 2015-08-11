var React = require('react');
var router = require('./stores/RouteStore.react.js').getRouter();

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

window.React = React;

router.run(function (Handler, state) {
    React.render(<Handler/>, document.getElementById('main'));
});