var mongoose = require( 'mongoose' );
var when = require( 'when' );
var jwt = require( 'jsonwebtoken' );
var db = require( './../helpers/mongodbConnect' );
var passHash = require('password-hash');
var userUtils = require( './../helpers/userUtils' );
var config = require('./../config');

var login = function ( req, res ) {
	var userData = req.body;
	var error = new Error();

	try {
		if ( userData && userData.username && userData.password ) {
			userUtils.getUser( userData.username ).then(function ( foundUser ) {
				if ( !foundUser || !( passHash.verify(userData.password, foundUser.password ))) {
					error.status = 400;
					error.code = 124;
					error.message = 'Invalid username or password!';
					throw error;
				}

				// if user is found and password is right
				// create a token
				var token = jwt.sign(foundUser, config.secret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				res.status( 200 ).json({
					success: true,
					payload: foundUser,
					token: token,
					error: null
				});
			}).catch( function ( err ) {
				res.status( 200 ).json({
					success: false,
					payload: {},
					error: {
						code: 123,
						message: err.message
					}
				});
			});
		} else {
			error.status = 400;
			error.code = 124;
			error.message = 'Invalid input data';
			throw error;
		}
	} catch ( err ) {
		res.status( err.status || 400 ).json({
			success: false,
			payload: {},
			error: {
				code: err.code,
				message: err.message
			}
		});
	}
};

module.exports = {
	login: login
};