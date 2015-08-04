/*jshint quotmark: false */
'use strict';

var test = require('tape');
var parser = require('../modules/parser.js');

var fakeJson = {"@total":"5","setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"bar"},{"@name":"foobar"}]},{"@encore":"1","song":[{"@name":"foo"},{"@name":"barfoo"}]}]}},{"sets":""},{"sets":{"set":{"song":{"@name":"bar"}}}},{"sets":{"set":[{"song":[{"@name":"foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"bar"}]},{"@encore":"2","song":[{"@name":"bar"},{"@name":"foobar"}]}]}}]};

test('should return a JSON', function (t) {
	t.plan(1);
	var tracks = parser.parse(fakeJson);

	t.ok(tracks instanceof Object, 'tracks should be an object');
});

test('should return a list of tracks', function (t) {
	t.plan(1);
	var tracks = parser.parse(fakeJson);

	t.equal(JSON.stringify(tracks.tracks), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]');
});

test('doesn\'t make any difference if the track name is lowerCase or upperCase', function (t) {
	t.plan(1);
	var json = {"@total":"5","setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"foo"},{"@name":"FOO"},{"@name":"Foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"foO"}]}]}}]};
	var tracks = parser.parse(json);

	t.equal(JSON.stringify(tracks.tracks), '[{"title":"foo","count":5},{"title":"bar","count":1}]');
});

test('is working also with only one setlist', function (t) {
	t.plan(1);
	var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
	var tracks = parser.parse(json);

	t.equal(JSON.stringify(tracks.tracks), '[{"title":"foo","count":1}]');
});

test('should return the correct arstist name', function (t) {
	t.plan(1);
	var tracks = parser.parse(fakeJson);

	t.equal(tracks.artist, 'best_artist', 'the correct artist is present');
});

test('should return the correct number of sets', function (t) {
	t.plan(2);
	var tracks = parser.parse(fakeJson);
	t.equal(tracks.setsTot, 4, 'the number of sets has to be 4');

	var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
	tracks = parser.parse(json);
	t.equal(tracks.setsTot, 1, 'the number of sets has to be 1');
});

test('should return the correct number of tracks', function (t) {
	t.plan(2);
	var tracks = parser.parse(fakeJson);
	t.equal(tracks.tracksTot, 11, 'the number of sets has to be 11');

	var json = {"@total":"1","setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}};
	tracks = parser.parse(json);
	t.equal(tracks.tracksTot, 1, 'the number of tracks has to be 1');
});
