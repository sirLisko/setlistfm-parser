'use strict'

var q = require('q')

var parser = require('./modules/parser')
var setList = require('./modules/setListFm')

function getTracks (artist) {
  var defer = q.defer()

  setList.getSets(artist)
    .then(parser.parse)
    .then(defer.resolve, defer.reject)
    .done()

  return defer.promise
}

exports.getTracks = getTracks
