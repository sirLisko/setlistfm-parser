/*global suite, test */

var assert = require('assert');
var nock = require('nock');
var setList = require('../modules/setListFm.js');

suite('setListFm', function(){
	'use strict';

	test('should parse the result if api.setlist.fm returns 200', function(){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=muse&year=2015')
			.reply(200, {setlists: 'foo'});

		setList.getSets('muse')(2015, function(payload){
			assert.equal(payload, 'foo', 'the content of setlists is passed to the parser');
		});

		setTimeout(function() {
			apiSetList.done();
		}, 0);
	});

	test('should return 404 if api.setlist.fm returns not found', function(){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=muse&year=2015')
			.reply(404, {});

		setList.getSets('muse')(2015, function(err){
			assert.equal(err.statusCode, 404);
		});

		setTimeout(function() {
			apiSetList.done();
		}, 0);
	});

	test('should return 500 if api.setlist.fm returns not 200 nor 404', function(){
		var apiSetList = nock('http://api.setlist.fm')
			.get('/rest/0.1/search/setlists.json?artistName=muse&year=2015')
			.reply(502, {});

		setList.getSets('muse')(2015, function(err){
			assert.equal(err.statusCode, 500);
		});

		setTimeout(function() {
			apiSetList.done();
		}, 0);
	});

});
