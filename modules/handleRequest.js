/*global console */

var http = require('http');

define(['node-pubsub', 'handleResponse'], function(pubsub, handleResp){
	'use strict';

	var options = {
		host: 'api.setlist.fm',
		port: 80
	};
	var api = {
		setLists: '/rest/0.1/search/setlists.json?year=2013&artistName='
	};

	return function (req, res) {
		if (req.url === '/favicon.ico') {
			return false;
		}

		pubsub.subscribe('handleResp', function( status, message ){
			res.writeHead(status, {
				'Content-Type': 'text/json',
				'Access-Control-Allow-Origin' : 'http://shouldilisten.it'
			});
			res.end(JSON.stringify(message), 'utf-8');
		});

		var artistName = req.url.substring(1);

		options.path = api.setLists + artistName;
		console.log(options.path);
		http.get(options, handleResp)
			.on('error', function(e) {
				console.log('Got error: ' + e.message);
			});
	};
});
