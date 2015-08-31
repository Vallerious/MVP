var mongoose = require('mongoose'),
	when = require('when'),
	Comment = require('./../../config/mongoose/models/comment'),
	User = require('./../../config/mongoose/models/user'),
	Article = require('./../../config/mongoose/models/article');

var getCommentsByArticle = function getCommentsByArticle(articleId) {
	var defer = when.defer();

	Comment.find({
		articleId: articleId
	}).exec(function(err, comments) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(comments);
		}
	});

	return defer.promise;
};

var addEditComment = function addEditComment(articleId, userId, content, commentId) {
	var defer = when.defer();
	var result = {};

	User.findById(userId).exec(function(err, user) {
			if (err) {
				return when.reject(err);
			} else {
				if (user) {
					return when.resolve(user);
				} else {
					defer.reject(new Error('Such user does not exist!'));
				}

			}
		})
		.then(function(user) {
			var defer = when.defer();

			Article.findById(articleId).exec(function(err, article) {
				if (err) {
					defer.reject(err);
				} else {
					defer.resolve(article);
				}
			});

			return when.all([user, defer.promise]);
		})
		.then(function(promises) {
			var user = promises[0],
				article = promises[1];

			if (user && article) {
				var newComment = new Comment({
					content: content,
					postedBy: user.username,
					articleId: articleId,
					createdOn: Date.now(),
					likes: 0,
					likedBy: []
				});

				if (!commentId) { // add comment
					newComment.save(function(err, comment) {
						if (err) {
							defer.reject(err);
						} else {
							defer.resolve(comment);
						}
					});
				} else { // edit comment
					Comment.findByIdAndUpdate(commentId, {
						content: content,
						createdOn: Date.now()
					}, function(err, comment) {
						if (err) {
							defer.reject(err);
						} else {
							defer.resolve(comment);
						}
					});
				}
			}
		}, function(err) {
			defer.reject(err);
		});

	return defer.promise;
};

var deleteComment = function deleteComment(commentId) {
	var defer = when.defer();

	Comment.remove({
		_id: commentId
	}, function(err, comment) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(comment);
		}
	});

	return defer.promise;
};

var likeComment = function likeComment(commentId, userId) {
	var defer = when.defer();

	Comment.findById(commentId).exec(function(err, comment) {
			if (err) {
				return when.reject(err);
			} else {
				return when.resolve(comment);
			}
		})
		.then(function(comment) {
			var idx = comment.likedBy.indexOf(userId);

			if (idx > -1) { // found
				comment.likedBy.splice(idx, 1);
				comment.likes -= 1;
			} else {
				comment.likedBy.push(userId);
				comment.likes += 1;
			}

			return comment;
		})
		.then(function(comment) {
			comment.save(function(err, comment) {
				if (err) {
					defer.reject(err);
				} else {
					defer.resolve(comment);
				}
			});
		}, function(err) {
			defer.reject(err);
		});

	return defer.promise;
};

module.exports = {
	getCommentsByArticle: getCommentsByArticle,
	addEditComment: addEditComment,
	deleteComment: deleteComment,
	likeComment: likeComment
};