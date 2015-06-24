var assert = require('assert');
var nock = require('nock');
var setList = require('../modules/setListFm.js');

suite('setListFm', function(){
	'use strict';

	test('should parse the result if api.setlist.fm returns 200', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=best_artist')
			.reply(200, {setlists: 'foo'});

		setList.getSets('best_artist').then(function(payload){
			assert.equal(payload, 'foo', 'the content of setlists is passed to the parser');

			apiSetList.done();
			done();
		}).done();
	});

	test('should return 404 if api.setlist.fm returns not found', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=best_artist')
			.reply(404, {});

		setList.getSets('best_artist').then(null, function(err){
			assert.equal(err.statusCode, 404);

			apiSetList.done();
			done();
		}).done();
	});

	test('should return 500 if api.setlist.fm returns not 200 nor 404', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=best_artist')
			.reply(502, {});

		setList.getSets('best_artist').then(null, function(err){
			assert.equal(err.statusCode, 500);

			apiSetList.done();
			done();
		}).done();
	});

});
