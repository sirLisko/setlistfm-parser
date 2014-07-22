/*global suite, test */

var assert = require('assert');
var parser = require('../setList/parser.js');

suite('parser', function(){
	'use strict';

	var fakeJson = '{"setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"bar"},{"@name":"foobar"}]},{"@encore":"1","song":[{"@name":"foo"},{"@name":"barfoo"}]}]}},{"sets":""},{"sets":{"set":{"song":{"@name":"bar"}}}},{"sets":{"set":[{"song":[{"@name":"foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"bar"}]},{"@encore":"2","song":[{"@name":"bar"},{"@name":"foobar"}]}]}}]}';

	test('should return a JSON', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));

		assert.ok(tracks instanceof Object, 'tracks should be an object');

		done();
	});

	test('should return a list of tracks', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));

		assert.equal(JSON.stringify(tracks.songs), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]');

		done();
	});

	test('doesn\'t make any difference if the track name is lowerCase or upperCase', function(done){
		var json = '{"setlist":[{"artist":{"@name":"best_artist"},"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"foo"},{"@name":"FOO"},{"@name":"Foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"foO"}]}]}}]}';
		var tracks = parser.getTracks(JSON.parse(json));

		assert.equal(JSON.stringify(tracks.songs), '[{"title":"foo","count":5},{"title":"bar","count":1}]');

		done();
	});

	test('is working also with only one setlist', function(done){
		var json = '{"setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}}';
		var tracks = parser.getTracks(JSON.parse(json));

		assert.equal(JSON.stringify(tracks.songs), '[{"title":"foo","count":1}]');
		assert.equal(tracks.songsTot, 1, 'the number of songs has to be 1');

		done();
	});

	test('should return the correct arstist name', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));

		assert.equal(tracks.artist, 'best_artist', 'the correct artist is present');

		done();
	});

	test('should return the correct number of sets', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));
		assert.equal(tracks.setsTot, 3, 'the number of sets has to be 3');

		var json = '{"setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}}';
		tracks = parser.getTracks(JSON.parse(json));
		assert.equal(tracks.setsTot, 1, 'the number of sets has to be 1');
		done();
	});


	test('should return the correct number of songs', function(done){
		var tracks = parser.getTracks(JSON.parse(fakeJson));
		assert.equal(tracks.songsTot, 11, 'the number of sets has to be 11');

		var json = '{"setlist":{"artist":{"@name":"best_artist"},"sets":{"set":{"song":{"@name":"fOo"}}}}}';
		tracks = parser.getTracks(JSON.parse(json));
		assert.equal(tracks.songsTot, 1, 'the number of songs has to be 1');
		done();
	});

});
