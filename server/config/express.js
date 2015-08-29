var path = require('path'),
	express = require('express'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	morgan = require('morgan');

module.exports = function (app, config, routes) {
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json({limit: config.maximumUploadSize}));
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, '../../client/public')));

	app.get('/', function (req, res) {
		res.sendfile('public/index.html');
	});

	// prefix routes with 'api'
	app.use('/api', routes);

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function (err, req, res, next) {
	        res.status(err.status || 500);
	        res.end();
	    });
	}
}