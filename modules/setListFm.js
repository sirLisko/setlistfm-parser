'use strict'

var q = require('q')
var request = require('request')

var domain = 'https://api.setlist.fm'
var path = '/rest/1.0/search/setlists?artistName={{artist}}'

var headers = {
  'Accept': 'application/json',
  'x-api-key': process.env.SETLISTFMAPIKEY
}

function getSets (artist) {
  var defer = q.defer()

  var url = domain + path.replace('{{artist}}', artist)

  var options = {
    headers: headers,
    url: url
  }

  request(options, function (err, resp, body) {
    if (!err && resp.statusCode === 200) {
      defer.resolve(JSON.parse(body).setlist)
    } else if (resp.statusCode === 404) {
      defer.reject({ statusCode: 404 })
    } else {
      defer.reject({ statusCode: 500 })
    }
  })

  return defer.promise
}

exports.getSets = getSets
