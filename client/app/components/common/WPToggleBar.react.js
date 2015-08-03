var React = require('react');

/*
    Styles
 */
var bar = {
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
};

var WPToggleBar = React.createClass({
    render: function () {
        return (
            <div>
                <span style={bar} onClick={this.props.clickHandler}>CLick me </span>
            </div>
        );
    }
});

module.exports = WPToggleBar;