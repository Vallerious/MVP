var mongoose = require( 'mongoose' );
var when = require( 'when' );
var db = require( './../helpers/mongodbConnect' );
var User = require( './../models/user' );
var userUtils = require( './../helpers/userUtils' );

var login = function ( req, res ) {
	var userData = req.body;

	if ( userData && userData.username && userData.password ) {
		userUtils.getUser( userData.username ).then( function ( foundUser ) {
			if ( !foundUser || ( foundUser.password != userData.password ) ) {
				return when.reject( new Error( "Invalid username or password!" ) );
			}

			res.status( 200 ).json({
				success: true,
				payload: foundUser,
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
		res.status( 400 ).json({
			success: false,
			payload: {},
			error: {
				code: 124,
				message: 'Invalid input data'
			}
		});
	}
};

module.exports = {
	login: login
};