var React = require('react');
var router = require('./stores/RouteStore.react.js').getRouter();

window.React = React;

router.run(function (Handler, state) {
    React.render(<Handler/>, document.getElementById('main'));
});