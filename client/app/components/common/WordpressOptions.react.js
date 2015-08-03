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
    Collapse = require('react-bootstrap').Collapse,
    Well = require('react-bootstrap').Well;

/*
    Styles
 */
var WordpressOptions = React.createClass({
    getInitialState: function () {
        return {};
    },
    toggleBar: function () {
        this.setState({open: !this.state.open});
    },
    render: function () {
        return (
            <div>
                <WPToggleBar clickHandler={this.toggleBar} />
                <Collapse in={this.state.open}>
                    {this.props.dropdownContent}
                </Collapse>
            </div>
        );
    }
});

module.exports = WordpressOptions;