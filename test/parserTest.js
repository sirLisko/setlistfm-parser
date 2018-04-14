/* jshint quotmark: false */
'use strict'

var test = require('tape')
var parser = require('../modules/parser.js')

var fakeJson = [{'artist': {'name': 'best_artist'}, 'sets': {'set': [{'song': [{'name': 'fOo'}, {'name': 'bar'}, {'name': 'foobar'}]}, {'@encore': '1', 'song': [{'name': 'foo'}, {'name': 'barfoo'}]}]}}, {'sets': ''}, {'sets': {'set': {'song': {'name': 'bar'}}}}, {'sets': {'set': [{'song': [{'name': 'foo'}, {'name': 'bar'}]}, {'@encore': '1', 'song': [{'name': 'bar'}]}, {'@encore': '2', 'song': [{'name': 'bar'}, {'name': 'foobar'}]}]}}]

test('should return a JSON', function (t) {
  t.plan(1)
  var tracks = parser.parse(fakeJson)

  t.ok(tracks instanceof Object, 'tracks should be an object')
})

test('should return a list of tracks', function (t) {
  t.plan(1)
  var tracks = parser.parse(fakeJson)

  t.equal(JSON.stringify(tracks.tracks), '[{"title":"bar","count":5},{"title":"foo","count":3},{"title":"foobar","count":2},{"title":"barfoo","count":1}]')
})

test('doesn\'t make any difference if the track name is lowerCase or upperCase', function (t) {
  t.plan(1)
  var json = [{'artist': {'name': 'best_artist'}, 'sets': {'set': [{'song': [{'name': 'fOo'}, {'name': 'foo'}, {'name': 'FOO'}, {'name': 'Foo'}, {'name': 'bar'}]}, {'@encore': '1', 'song': [{'name': 'foO'}]}]}}]
  var tracks = parser.parse(json)

  t.equal(JSON.stringify(tracks.tracks), '[{"title":"foo","count":5},{"title":"bar","count":1}]')
})

test('should return the correct arstist name', function (t) {
  t.plan(1)
  var tracks = parser.parse(fakeJson)

  t.equal(tracks.artist, 'best_artist', 'the correct artist is present')
})
