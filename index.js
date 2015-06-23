'use strict';

var q = require('q');
var async = require('async');

var parser = require('./modules/parser');
var setList = require('./modules/setListFm');

function setListResponse(defer) {
	return function (err, results) {
		if (results[0] || results[1]) {
			defer.resolve(results);
		} else {
			defer.reject(err);
		}
	};
}

function getSets(artist) {
	var defer = q.defer();
	var currentYear = new Date().getFullYear();

	async.map([currentYear, currentYear - 1], setList.getSets(artist), setListResponse(defer));

	return defer.promise;
}

function getTracks(artist) {
	var defer = q.defer();

	getSets(artist)
		.then(parser.parse)
		.then(defer.resolve, defer.reject)
		.done();

	return defer.promise;
}

exports.getTracks = getTracks;
