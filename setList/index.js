'use strict';

var request = require('request');
var q = require('q');
var parser = require('./parser');

var domain = 'http://api.setlist.fm';
var path = '/rest/0.1/search/setlists.json?year=2014&artistName=';

function getSets(artist) {
	var defer = q.defer();

	request(domain + path + artist, function(err, resp, body){
		if (err) {
			defer.reject(new Error('error on retrieve artist setlist'));
		} else if (body.trim() === 'not found') {
			defer.reject('artist not found');
		} else {
			defer.resolve(JSON.parse(body).setlists);
		}
	});

	return defer.promise;
}

function getTracks(artist){
	var defer = q.defer();

	getSets(artist).then(parser.getTracks).then(defer.resolve, defer.reject).done();

	return defer.promise;
}

exports.getTracks = getTracks;
