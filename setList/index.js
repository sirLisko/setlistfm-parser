'use strict';

var request = require('request');
var q = require('q');
var parser = require('./parser');

var domain = 'http://api.setlist.fm';
var path = '/rest/0.1/search/setlists.json?year=2014&artistName=';
var credits = 'setLists lovely provided by <a href="http://www.setlist.fm/>setlist.fm</a>';

function getSets(artist) {
	var defer = q.defer();

	request(domain + path + artist, function(err, resp, body){
		if (!err && resp.statusCode === 200) {
			defer.resolve(JSON.parse(body).setlists);
		} else if (resp.statusCode === 404) {
			defer.reject({ statusCode: 404 });
		} else {
			defer.reject({ statusCode: 500 });
		}
	});

	return defer.promise;
}

function getTracks(artist){
	var defer = q.defer();

	getSets(artist).then(parser.getTracks).then(function(tracks){
		tracks.credits = credits;
		defer.resolve(tracks);
	}, defer.reject).done();

	return defer.promise;
}

exports.getTracks = getTracks;
