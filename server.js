/*global console, __dirname */

var requirejs = require('requirejs');
var http = require('http');
var pubsub = require('node-pubsub');

requirejs.config({
	baseUrl: __dirname + '/modules'
});

requirejs(['handleRequest'], function(handleReq) {
	'use strict';

	http.createServer(handleReq).listen(11200);

	console.log('Server running at http://127.0.0.1:11200/');
});
