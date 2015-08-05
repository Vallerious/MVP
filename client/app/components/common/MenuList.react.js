var React = require('react');

var MenuItem = require('../common/MenuItem.react.js');

var MenuList = React.createClass({
    getInitialState: function () {
        return {
            menuItems: [
                {content: "renderTagsAndCategories", title: "Tags & Categories", glyph: "glyphicon glyphicon-tags"},
                {content: "renderTagsAndCategories", title: "Article Photo", glyph: "glyphicon glyphicon-picture"}
            ]
        }
    },
    render: function () {
        var self = this;
        var menuItems = this.state.menuItems.map(function (item, idx) {
            return <MenuItem title={item.title} glyph={item.glyph} content={item.content} key={idx} />
        });

        return (
            <div>
                {menuItems}
            </div>
        )
    }
});

module.exports = MenuList;