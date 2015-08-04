/*
    External libraries
 */
var React = require('react');

/*
    Include Components
 */
var WPToggleBar = require('../../components/common/WPToggleBar.react.js');

// External theme dependencies:
var Button = require('react-bootstrap').Button,
    Collapse = require('react-bootstrap').Collapse;

/*
    Styles
 */
var closedBar = {
    borderTop: '2px solid #c8d7e1',
    borderBottom: '2px solid #c8d7e1',
    padding: '10px',
    width: '280px',
    height: '69px',
    lineHeight: '49px',
    letterSpacing: '0.1em'
};

var openedBar = {
    borderLeft: '2px solid #c8d7e1',
    borderRight: '2px solid #c8d7e1'
};

var WordpressOption = React.createClass({
    getInitialState: function () {
        return {};
    },
    toggleBar: function () {
        this.setState({open: !this.state.open});
    },
    render: function () {
        return (
            <div>
                <div>
                    <div style={this.state.open ? $.extend({}, closedBar, openedBar) : closedBar} onClick={this.toggleBar}><span className={this.props.glyph || "glyphicon glyphicon-star"}></span>{this.props.title || "no title"}</div>
                </div>
                <Collapse in={this.state.open}>
                    {this.props.dropdownContent}
                </Collapse>
            </div>
        );
    }
});

module.exports = WordpressOption;