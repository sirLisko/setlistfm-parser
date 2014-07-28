/*global suite, test */

var assert = require('assert');
var nock = require('nock');
var setList = require('../setList/index.js');
var parser = require('../setList/parser.js');

suite('setList', function(){
	'use strict';

	test('should parse the result if api.setlist.fm returns 200', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?year=2014&artistName=muse')
			.reply(200, {setlists: 'foo'});

		parser.getTracks = function(payload){
			assert.equal(payload, 'foo', 'the content of setlists is passed to the parser');
			return {};
		};

		setList.getTracks('muse').done();

		setTimeout(function() {
			apiSetList.done();
			done();
		}, 0);
	});

	test('should return 404 if api.setlist.fm returns not found', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?year=2014&artistName=muse')
			.reply(404, {});

		setList.getTracks('muse').then(null, function(err){
			assert.equal(err.statusCode, 404);
		}).done();

		setTimeout(function() {
			apiSetList.done();
			done();
		}, 0);
	});

	test('should return 500 if api.setlist.fm returns not 200 nor 404', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?year=2014&artistName=muse')
			.reply(502, {});

		setList.getTracks('muse').then(null, function(err){
			assert.equal(err.statusCode, 500);
		}).done();

		setTimeout(function() {
			apiSetList.done();
			done();
		}, 0);
	});

	test('should return the credits if api.setlist.fm returns 200', function(done){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?year=2014&artistName=muse')
			.reply(200, {setlists: 'foo'});

		parser.getTracks = function(){
			return {};
		};

		setList.getTracks('muse').then(function(payload){
			assert.equal(typeof payload.credits, 'string', 'a string is returned as credits');
		}).done();

		setTimeout(function() {
			apiSetList.done();
			done();
		}, 0);
	});

});
