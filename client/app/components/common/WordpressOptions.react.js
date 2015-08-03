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
    borderTop: '1px solid #c8d7e1',
    borderBottom: '1px solid #c8d7e1',
    padding: '10px',
    width: '280px',
    height: '69px',
    lineHeight: '49px',
    letterSpacing: '0.1em',
    marginBottom: '5px'
};



var WordpressOption = React.createClass({
    getInitialState: function () {
        return {};
    },
    toggleBar: function () {
        this.setState({open: !this.state.open});
    },
    render: function () {
        var optionStyle = bar;

        if ( this.state.open ) { // implement this with state
            optionStyle.borderLeft = '1px solid #c8d7e1';
            optionStyle.borderRight = '1px solid #c8d7e1';
        }
        return (
            <div>
                <div>
                    <div style={optionStyle} onClick={this.toggleBar}><span className={this.props.glyph || "glyphicon glyphicon-star"}></span>{this.props.title || "no title"}</div>
                </div>
                <Collapse in={this.state.open}>
                    {this.props.dropdownContent}
                </Collapse>
            </div>
        );
    }
});

module.exports = WordpressOption;