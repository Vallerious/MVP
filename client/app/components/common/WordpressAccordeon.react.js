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
    borderTop: '1px solid #c8d7e1',
    borderBottom: '1px solid #c8d7e1',
    padding: '10px',
    width: '280px',
    height: '69px',
    lineHeight: '49px',
    letterSpacing: '0.1em',
    marginBottom: '5px'
};

var toggleBox = {
    padding: '10px',
    width: '280px',
    borderLeft: '1px solid #c8d7e1',
    borderRight: '1px solid #c8d7e1'
};

var WordpressAccordeon = React.createClass({
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
                    <input type="text" className="form-control" style={{width: '100% !important;'}} value=""
                           data-role="tagsinput"/>
                </div>
                <div className="form-group">
                    <label for="usr">Categories</label>

                    <div className="clearfix"></div>
                    <input type="text" className="form-control" value="" data-role="tagsinput"/>
                </div>
            </div>
        );
    },
    render: function () {
        return (
            <div>
                <div>
                    <div style={closedBar} onClick={this.toggleBar}><span className={this.props.glyph || "glyphicon glyphicon-star"}></span>{this.props.title || "no title"}</div>
                </div>
                <Collapse in={this.state.open}>
                    {this.renderTagsAndCategories()}
                </Collapse>
            </div>
        );
    }
});

module.exports = WordpressAccordeon;