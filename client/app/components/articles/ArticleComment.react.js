var React = require('react');

var ArticleComment = React.createClass({
   render: function () {
       return (
           <div>
               {this.props.content}
           </div>
       )
   }
});

module.exports = ArticleComment;