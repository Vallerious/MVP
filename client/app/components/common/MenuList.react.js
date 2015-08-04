var React = require('react');

var WordpressAccordeon = require('../common/WordpressAccordeon.react.js');

var MenuList = React.createClass({
    getInitialState: function () {
        return {
            menuItems: [
                {dropdownContent: "renderTagsAndCategories", title: "Tags & Categories", glyph: "glyphicon glyphicon-tags"},
                {dropdownContent: "renderTagsAndCategories", title: "Article Photo", glyph: "glyphicon glyphicon-picture"}
            ]
        }
    },
    renderMenuItems: function () {
        var menuItems = this.state.menuItems.map(function (item, idx) {
            return <WordpressAccordeon title={item.title} />
        });

        return menuItems;
    },
    render: function () {
        var menuItems = this.state.menuItems.map(function (item, idx) {
            return <WordpressAccordeon title={item.title} />
        });

        return (
            <div>
                {menuItems}
            </div>
        )
    }
});

module.exports = MenuList;