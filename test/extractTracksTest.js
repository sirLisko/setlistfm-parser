/*global __dirname, suite, test */

var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
	baseUrl: __dirname + '/../modules'
});

suite('extractTracks', function(){
	'use strict';

	var fakeJson = '{"setlists":{"setlist":[{"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"bar"},{"@name":"foobar"}]},{"@encore":"1","song":[{"@name":"foo"},{"@name":"barfoo"}]}]}},{"sets":""},{"sets":{"set":{"song":{"@name":"bar"}}}},{"sets":{"set":[{"song":[{"@name":"foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"bar"}]},{"@encore":"2","song":[{"@name":"bar"},{"@name":"foobar"}]}]}}]}}';

	test('should return a JSON with tracks and numer of plays', function(done){
		requirejs(['extractTracks'],function(extractTracks) {
			var tracks = extractTracks(JSON.parse(fakeJson));
			assert.ok(tracks instanceof Object, 'tracks should be an object');
			assert.equal(JSON.stringify(tracks.songs), '{"foo":3,"bar":5,"foobar":2,"barfoo":1}');
			assert.equal(tracks.songsTot, 11);
			done();
		});
	});

	test('doesn\'t have to contain previous records', function(done){
		requirejs(['extractTracks'],function(extractTracks) {
			extractTracks(JSON.parse(fakeJson));
			var tracks2 = extractTracks(JSON.parse(fakeJson));
			assert.equal(JSON.stringify(tracks2.songs), '{"foo":3,"bar":5,"foobar":2,"barfoo":1}');
			done();
		});
	});

	test('doesn\'t make any difference lowerCase to upperCase', function(done){
		requirejs(['extractTracks'],function(extractTracks) {
		var json = '{"setlists":{"setlist":[{"sets":{"set":[{"song":[{"@name":"fOo"},{"@name":"foo"},{"@name":"FOO"},{"@name":"Foo"},{"@name":"bar"}]},{"@encore":"1","song":[{"@name":"foO"}]}]}}]}}';
			var tracks = extractTracks(JSON.parse(json));
			assert.equal(JSON.stringify(tracks.songs), '{"foo":5,"bar":1}');
			done();
		});
	});

	test('is working also with only one setlist', function(done){
		requirejs(['extractTracks'],function(extractTracks) {
		var json = '{"setlists":{"setlist":{"sets":{"set":{"song":{"@name":"fOo"}}}}}}';
			var tracks = extractTracks(JSON.parse(json));
			assert.equal(JSON.stringify(tracks.songs), '{"foo":1}');
			done();
		});
	});

});
