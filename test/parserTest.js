/*global suite, test */

var assert = require('assert');
var parser = require('../setList/parser.js');

suite('parser', function(){
	'use strict';

	var fakeJson = '{"setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"bar"},{"@name":"foobar"}]},{"@encore":"1","song":[{"@name":"foo"},{"@name":"barfoo"}]}]}},{"sets":""},{"sets":{"set":{"song":{"@name":"bar"}}}},{"sets":{"set":[{"song":[{"@name":"foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"bar"}]},{"@encore":"2","song":[{"@name":"bar"},{"@name":"foobar"}]}]}}]}';

	test('should return a JSON with tracks and numer of plays', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));
		assert.ok(tracks instanceof Object, 'tracks should be an object');
		assert.equal(JSON.stringify(tracks.songs), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]');
		assert.equal(tracks.songsTot, 11);
		assert.equal(tracks.artist, 'best_artist');
		done();
	});

	test('doesn\'t have to contain previous records', function(done){
		parser.getTracks(JSON.parse(fakeJson));
		var tracks2 = parser.getTracks(JSON.parse(fakeJson));
		assert.equal(JSON.stringify(tracks2.songs), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]');
		assert.equal(tracks2.artist, 'best_artist');
		done();
	});

	test('doesn\'t make any difference lowerCase to upperCase', function(done){
		var json = '{"setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"foo"},{"@name":"FOO"},{"@name":"Foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"foO"}]}]}}]}';
		var tracks = parser.getTracks(JSON.parse(json));
		assert.equal(JSON.stringify(tracks.songs), '[{"title":"foo","count":5},{"title":"bar","count":1}]');
		done();
	});

	test('is working also with only one setlist', function(done){
		var json = '{"setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}}';
		var tracks = parser.getTracks(JSON.parse(json));
		assert.equal(JSON.stringify(tracks.songs), '[{"title":"foo","count":1}]');
		assert.equal(tracks.artist, 'best_artist');
		done();
	});

});

