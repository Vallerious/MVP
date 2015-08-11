/*
 External libraries
 */
var React = require('react');

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

var toggleBox = {
    padding: '10px',
    width: '280px',
    borderLeft: '2px solid #c8d7e1',
    borderRight: '2px solid #c8d7e1'
};

var MenuItem = React.createClass({
    getInitialState: function () {
        return {};
    },
    toggleBar: function () {
        this.setState({open: !this.state.open});
    },
    renderTagsAndCategories: function () {
        return (
            <div style={toggleBox}>
                <div className="form-group">
                    <label for="usr">Tags</label>

                    <div className="clearfix"></div>
                    <input type="text" ref="tags" className="form-control"
                           data-role="tagsinput" id="input__tags"/>
                </div>
                <div className="form-group">
                    <label for="usr">Categories</label>

                    <div className="clearfix"></div>
                    <input type="text" ref="categories" className="form-control" data-role="tagsinput"
                           id="input__categories"/>
                </div>
            </div>
        );
    },
    render: function () {
        return (
            <div>
                <div>
                    <div style={this.state.open ? $.extend({}, closedBar, openedBar) : closedBar}
                         onClick={this.toggleBar}><span
                        className={this.props.glyph || "glyphicon glyphicon-star"}></span><span
                        className="ml12">{this.props.title || "no title"}</span></div>
                </div>
                <Collapse in={this.state.open}>
                    {this[this.props.content]()}
                </Collapse>
            </div>
        );
    }
});

module.exports = MenuItem;