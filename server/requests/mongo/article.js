var mongoose = require('mongoose'),
	when = require('when'),
	Article = require('./../../config/mongoose/models/article'),
	User = require('./../../config/mongoose/models/user'),
	mongoUserRequests = require('./user');

var ARTICLES_PER_PAGE = 5;


var getAllArticles = function getAllArticles(page) {
	var defer = when.defer();

	Article.paginate({}, {
		page: page,
		limit: ARTICLES_PER_PAGE
	}, function(err, results, pageCount, itemCount) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve({
				data: results,
				pageCount: pageCount,
				itemCount: itemCount
			});
		}
	});

	return defer.promise;
}

var addEditArticle = function addEditArticle(articleData) {
	var defer = when.defer();

	mongoUserRequests.getUser('_id', articleData.postedBy)
		.then(function(user) {
			if (user) {
				if (!articleData._id) { // no id? add new article
					var newArticle = new Article({
						title: articleData.title,
						content: articleData.content,
						image: articleData.image,
						postedBy: articleData.postedBy,
						createdOn: Date.now(),
						editedOn: "",
						votes: 0,
						votedBy: [],
						tags: articleData.tags,
						categories: articleData.categories
					});

					newArticle.save(function(err, user) {
						if (err) {
							defer.reject(err);
						} else {
							defer.resolve(user);
						}
					});
				} else { // id provided, editing existing article
					var newArticle = {
						title: articleData.title,
						content: articleData.content,
						image: articleData.image,
						editedOn: Date.now(),
						tags: articleData.tags,
						categories: articleData.categories
					};

					Article.findByIdAndUpdate(articleData.articleId, newArticle, {
							multi: false
						})
						.exec(function(err, article) {
							if (err) {
								defer.reject(err);
							} else {
								defer.resolve(article);
							}
						});
				}
			} else {
				return when.reject(new Error('Trying to create an article with a non existent user'));
			}
		}).catch(function(err) {
			defer.reject(err);
		})

	return defer.promise;
};

var deleteArticle = function deleteArticle(articleId) {
	var defer = when.defer();

	Article.findById(articleId).remove().exec(function(err, article) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(article);
		}
	});

	return defer.promise;
};

var voteArticle = function voteArticle(articleId, userId) {
	return when.promise(function(resolve, reject) {
		Article.findById(articleId).exec(function(err, article) {
			if (err) {
				return when.reject(err);
			} else {
				return when.resolve(article);
			}
		})
		.then(function(article) {
			return when.all([article, when.promise(function(resolve, reject) {
				User.findById(userId).exec(function(err, user) {
					if (err) {
						reject(err);
					} else {
						resolve(user);
					}
				});
			})]);
		})
		.then(function(promises) {
			var article = promises[0];
			var user = promises[1];

			if (user) {
				var idx = article.votedBy.indexOf(userId);

				if (idx > -1) { // found
					article.votedBy.splice(idx, 1);
					article.votes -= 1;
				} else {
					article.votedBy.push(userId);
					article.votes += 1;
				}

				return when.resolve(article);
			} else {
				return when.reject(new Error("Voting with a non-existent user!"));
			}
		})
		.then(function(article) {
			return when.promise(function(resolve, reject) {
				article.save(function(err, article) {
					if (err) {
						reject(err);
					} else {
						resolve(article);
					}
				});
			});
		})
		.then(function(article) {
			resolve(article);
		}, function(err) {
			reject(err);
		});
	});
};

module.exports = {
	addEditArticle: addEditArticle,
	deleteArticle: deleteArticle,
	voteArticle: voteArticle,
	getAllArticles: getAllArticles
}