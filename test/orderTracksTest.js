/*global __dirname, suite, test */

var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
	baseUrl: __dirname + '/../modules'
});


suite('orderTracks', function(){
	'use strict';

	var songs = {
		"songs": {
			"foobar": 9 ,
			"foobarfoo": 3 ,
			"bar": 3 ,
			"foo": 10 ,
			"barfoo": 7,
			"barfoobar": 1
		},
		"songsTot": 33
	};

	var singleSong = {
		"songs": {'foofoo': 1},
		"songsTot": 33
	};

	test('should return an array of objects ordered by count field', function(done){
		requirejs(['orderTracks'],function(orderTracks) {
			var ordered = orderTracks(songs);

			assert.ok(ordered instanceof Array, 'the result of orderTracks is an array');

			for(var i = 1, length = ordered.length; i < length; i++){
				if(ordered[i].count <= ordered[i-1].count){
					assert(true, 'following posistion as to be always bigger');
				} else {
					assert(false, 'following posistion as to be always bigger');
				}
			}

			done();
		});
	});

	test('should return a properly quota for each song', function(done){
		requirejs(['orderTracks'],function(orderTracks) {
			var ordered = orderTracks(songs);
			assert.equal(ordered[0].quota, 30);
			assert.equal(ordered[1].quota, 27);
			assert.equal(ordered[2].quota, 21);
			assert.equal(ordered[3].quota, 9);
			assert.equal(ordered[4].quota, 9);
			assert.equal(ordered[5].quota, 3);
			done();
		});
	});

	test('doesn\'t have to contain previous records', function(done){
		requirejs(['orderTracks'],function(orderTracks) {
			orderTracks(songs);
			var ordered2 = orderTracks(singleSong);
			assert(ordered2.length === 1, '');
			done();
		});
	});

});
