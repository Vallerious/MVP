var React = require('react');
var DateUtils = require('../../utils/DateUtils');

var commentBox = {
    padding: '5px',
    marginTop: '5px',
    marginBottom: '5px'
};

var Comment = React.createClass({
   render: function () {

       // TODO: implement "yesterday" 14:30" type of date display from timestamp

       return (
           <div className="row" style={commentBox}>
               <div className="col-xs-1 col-xs-offset-1">
                   <img src={this.props.avatar ? this.props.avatar : "./images/default-user-icon.png"} alt="avatar" width="30" height="30" />
               </div>
               <div className="col-xs-10">
                   <div><strong>{this.props.username}</strong></div>
                   <div style={{color: '#87CEFA'}}>{DateUtils.formatCommentDate(this.props.date)}</div>
                   <div style={{width: '80%', wordWrap: 'break-word'}}>{this.props.content}</div>
               </div>
           </div>
       )
   }
});

module.exports = Comment;