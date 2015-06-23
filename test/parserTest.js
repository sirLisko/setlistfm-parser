/*jshint quotmark: false */

var assert = require('assert');
var parser = require('../modules/parser.js');

suite('parser', function (){
	'use strict';

	var fakeJson = {"@total":"5","setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"bar"},{"@name":"foobar"}]},{"@encore":"1","song":[{"@name":"foo"},{"@name":"barfoo"}]}]}},{"sets":""},{"sets":{"set":{"song":{"@name":"bar"}}}},{"sets":{"set":[{"song":[{"@name":"foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"bar"}]},{"@encore":"2","song":[{"@name":"bar"},{"@name":"foobar"}]}]}}]};

	test('should return a JSON', function (done) {
		var tracks = parser.parse(fakeJson);

		assert.ok(tracks instanceof Object, 'tracks should be an object');
		done();
	});

	test('should return a list of tracks', function (done) {
		var tracks = parser.parse(fakeJson);

		assert.equal(JSON.stringify(tracks.tracks), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]');
		done();
	});

	test('doesn\'t make any difference if the track name is lowerCase or upperCase', function (done) {
		var json = {"@total":"5","setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"foo"},{"@name":"FOO"},{"@name":"Foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"foO"}]}]}}]};
		var tracks = parser.parse(json);

		assert.equal(JSON.stringify(tracks.tracks), '[{"title":"foo","count":5},{"title":"bar","count":1}]');
		done();
	});

	test('is working also with only one setlist', function (done) {
		var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
		var tracks = parser.parse(json);

		assert.equal(JSON.stringify(tracks.tracks), '[{"title":"foo","count":1}]');
		done();
	});

	test('should return the correct arstist name', function (done) {
		var tracks = parser.parse(fakeJson);

		assert.equal(tracks.artist, 'best_artist', 'the correct artist is present');
		done();
	});

	test('should return the correct number of sets', function (done) {
		var tracks = parser.parse(fakeJson);
		assert.equal(tracks.setsTot, 4, 'the number of sets has to be 4');

		var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
		tracks = parser.parse(json);
		assert.equal(tracks.setsTot, 1, 'the number of sets has to be 1');
		done();
	});

	test('should return the correct number of tracks', function (done) {
		var tracks = parser.parse(fakeJson);
		assert.equal(tracks.tracksTot, 11, 'the number of sets has to be 11');

		var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
		tracks = parser.parse(json);
		assert.equal(tracks.tracksTot, 1, 'the number of tracks has to be 1');
		done();
	});

});
