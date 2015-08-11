var React = require('react');

var NewCommentBox = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-1">
                    <img src={this.props.avatar} width="30" height="30" alt="avatar" />
                </div>
                <div className="col-xs-11">
                    <div class="form-group">
                        <label for="comment">Comment:</label>
                        <textarea class="form-control" rows="5" id="comment" ref="articleComment"></textarea>
                    </div>

                </div>
            </div>
        )
    }
});