/*
	Testing the ES6 Syntax!
*/

import React from 'react';

import SessionStore from './../../stores/SessionStore.react';
import ArticleStore from './../../stores/ArticleStore.react';
import ArticleActionCreators from './../../actions/ArticleActionCreators';

// Theme dependancies
import mui from 'material-ui';
var RaisedButton = mui.RaisedButton;

class VoteBar extends React.Component {
	constructor(props) {
		super();
		this.state = {votes: props.votes, hasVoted: false, isLoggedIn: SessionStore.getUserData().isLoggedIn};

		// Binding methods that need 'this' meaning the component itself.
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		ArticleStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		 ArticleStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		var prevVotes = this.state.votes;
        var currVotes = ArticleStore.getVotes();

        if ( prevVotes < currVotes ) { // red button
            this.state.hasVoted = true;
        } else { // blue button
            this.state.hasVoted = false;
        }

        this.state.votes = currVotes;
	}

	voteArticle(articleId) {
		var userId = window.sessionStorage.getItem('user_id');
        ArticleActionCreators.voteArticle(articleId, userId);
	}

	render() {
		return (
			<div>
				 <RaisedButton secondary={!this.state.hasVoted}
                              primary={this.state.hasVoted}
                              label={"+ " + (this.state.votes == 0 ? 1 : this.state.votes)} 
                              onClick={this.voteArticle.bind(this, this.props.articleId)}
                              disabled={!this.state.isLoggedIn} />
			</div>
			);
	}
}

export default VoteBar;