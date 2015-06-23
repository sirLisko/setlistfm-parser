'use strict';

var request = require('request');

var domain = 'http://api.setlist.fm';
var path = '/rest/0.1/search/setlists.json?artistName={{artist}}&year={{year}}';

function getSets(artist) {
	var baseUrl = domain + path.replace('{{artist}}', artist);

	return function (year, callback) {
		var url = baseUrl.replace('{{year}}', year || new Date().getFullYear());

		request(url, function (err, resp, body) {
			if (!err && resp.statusCode === 200) {
				callback(undefined, JSON.parse(body).setlists);
			} else if (resp.statusCode === 404) {
				callback({ statusCode: 404 });
			} else {
				callback({ statusCode: 500 });
			}
		});
	};
}

exports.getSets = getSets;
