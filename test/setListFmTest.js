'use strict'

var test = require('tape')
var nock = require('nock')
var setList = require('../modules/setListFm.js')

test('should parse the result if api.setlist.fm returns 200', function (t) {
  var apiSetList = nock('https://api.setlist.fm')
    .get('/rest/1.0/search/setlists?artistName=best_artist')
    .reply(200, {setlist: 'foo'})

  setList.getSets('best_artist').then(function (payload) {
    t.equal(payload, 'foo', 'the content of setlists is passed to the parser')

    apiSetList.done()
    t.end()
  }).done()
})

test('should return 404 if api.setlist.fm returns not found', function (t) {
  var apiSetList = nock('https://api.setlist.fm')
    .get('/rest/1.0/search/setlists?artistName=best_artist')
    .reply(404, {})

  setList.getSets('best_artist').then(null, function (err) {
    t.equal(err.statusCode, 404)

    apiSetList.done()
    t.end()
  }).done()
})

test('should return 500 if api.setlist.fm returns not 200 nor 404', function (t) {
  var apiSetList = nock('https://api.setlist.fm')
    .get('/rest/1.0/search/setlists?artistName=best_artist')
    .reply(502, {})

  setList.getSets('best_artist').then(null, function (err) {
    t.equal(err.statusCode, 500)

    apiSetList.done()
    t.end()
  }).done()
})
