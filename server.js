'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var setList = require('./setList');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/v1/artist/:artistName', function(req, res){
	var artist = req.params.artistName;

	res.header('Access-Control-Allow-Origin', 'http://shouldilisten.it');

	setList.getTracks(artist).then(function(menu){
		res.send(menu);
	}, function(err){
		res.status(err.statusCode).send(artist);
	}).done();
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port + '...');
