var express = require('express');
var router = express.Router();
var loginController = require('./../controllers/login');
var registerController = require('./../controllers/register');

/* Login screen */
router.post('/login', loginController.login);
router.post('/register', registerController.register);

module.exports = router;
