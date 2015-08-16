var React = require('react');
var DateUtils = require('../../utils/DateUtils');

var commentBox = {
    padding: '5px',
    marginTop: '5px',
    marginBottom: '5px',
    maxWidth: '512px'
};

var Comment = React.createClass({
  propTypes: {
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
    content: React.PropTypes.string
  },

  propagedeAction: function (params) {
    this.props.propagedeAction(params);
  },

  render: function () {

  // TODO: implement "yesterday" 14:30" type of date display from timestamp

    return (
       <div className="row" style={commentBox}>
           <div className="col-xs-1" style={{paddingTop: '3px'}}>
               <img src={this.props.avatar ? this.props.avatar : "./images/default-user-icon.png"} 
                    alt="avatar" width="30" height="30" />
           </div>
           <div className="col-xs-11">
               <div>
                  <strong>{this.props.username}</strong>
                  {this.props.username == window.sessionStorage.getItem('username') ?

                  <span><span className="btn-link pull-right" 
                        onClick={this.propagedeAction.bind(this, ["comment.edit", "getCommentsByArticle", this.props.commentId, this.props.content, this.props.articleId])}>Edit</span>
                  <span className="btn-link glyphicon glyphicon-remove pull-right" 
                        onClick={this.propagedeAction.bind(this, ["comment.delete", "getCommentsByArticle", this.props.commentId, this.props.articleId])}></span></span>
                        :
                        <span></span>}
               </div>
               <div style={{color: '#87CEFA'}}>{DateUtils.formatCommentDate(this.props.date)}</div>
               <div style={{width: '80%', wordWrap: 'break-word'}}>{this.props.content}</div>
           </div>
       </div>
    );
  }
});

module.exports = Comment; 