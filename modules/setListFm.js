'use strict';

var q = require('q');
var request = require('request');

var domain = 'http://api.setlist.fm';
var path = '/rest/0.1/search/setlists.json?artistName={{artist}}';

function getSets(artist) {
	var defer = q.defer();

	var url = domain + path.replace('{{artist}}', artist);

	request(url, function(err, resp, body){
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

exports.getSets = getSets;
