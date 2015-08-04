var React = require('react');

/*
    Styles
 */
var bar = {
    borderTop: '2px solid #c8d7e1',
    borderBottom: '2px solid #c8d7e1',
    padding: '10px',
    width: '280px',
    height: '69px',
    lineHeight: '49px',
    letterSpacing: '0.1em'
};

var WPToggleBar = React.createClass({
    render: function () {
        return (
            <div>
                <div style={bar} onClick={this.props.clickHandler}><span className={this.props.glyph || "glyphicon glyphicon-star"}></span>{this.props.title || "no title"}</div>
            </div>
        );
    }
});

module.exports = WPToggleBar;