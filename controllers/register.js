var mongoose = require( 'mongoose' );
var when = require( 'when' );
var db = require( './../helpers/mongodbConnect' );
var User = require( './../models/user' );
var userUtils = require( './../helpers/userUtils' );
var passHash = require('password-hash');

var register = function ( req, res ) {
    var userData = req.body;

    if ( userData && userData.username && userData.password && userData.email ) {
        userUtils.getUser( userData.username ).then( function ( foundUser ) {
            if ( !foundUser ) {
                var newUser = new User({
                    username: userData.username,
                    password: passHash.generate(userData.password),
                    email: userData.email,
                    roleId: ''
                });

                newUser.save( function ( err ) {
                    if ( err ) {
                        res.status( 500 ).json({
                            success: false,
                            payload: {},
                            error: {
                                code: 100,
                                message: "There was an error creating a user. Please contact your administrator!"
                            }
                        });
                    } else {
                        delete newUser.password;
                        delete newUser._id;

                        res.status( 200 ).json( {
                            success: true,
                            payload: newUser,
                            error: null
                        } );
                    }
                });
            } else {
                res.status( 200 ).json({
                    success: false,
                    payload: {},
                    error: {
                        code: 124,
                        message: "User already exists with that username!"
                    }
                });
            }
        });
    } else {
        res.status( 400 ).json({
            success: false,
            payload: {},
            error: {
                code: 124,
                message: "Please fill your email, username and password!"
            }
        });
    }
};

module.exports = {
    register: register
};