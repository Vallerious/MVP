var mongoose = require('mongoose'),
	when = require('when'),
	Article = require('./../../config/mongoose/models/article'),
	mongoUserRequests = require('./user');

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

module.exports = {
	addEditArticle: addEditArticle,
	deleteArticle: deleteArticle
}