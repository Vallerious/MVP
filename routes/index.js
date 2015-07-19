var express = require('express');
var router = express.Router();
var mainController = require('./../controllers/main');
var loginController = require('./../controllers/login');

/* Home page. */
router.get('/', mainController.getIndex);

/* Login screen */
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

module.exports = router;
