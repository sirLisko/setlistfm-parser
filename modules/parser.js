'use strict'

var _ = require('lodash')

function getArtist (sets) {
  return _
    .chain(sets)
    .first()
    .get('artist.name')
    .value()
}

function formatTracks (tracks) {
  return _
    .chain(tracks)
    .countBy(function (track) {
      return track.name.toLowerCase()
    })
    .omit('')
    .map(function (count, track) {
      return { title: track, count: count }
    }).sortBy(function (track) {
      return -track.count
    })
    .value()
}

function getTracks (sets) {
  return _
    .chain(sets)
    .map(function (set) {
      return set.song
    })
    .flatten()
    .value()
}

function getSets (setsLists) {
  return _
    .chain(setsLists)
    .map(function (setList) {
      return setList.sets.set
    })
    .flatten()
    .compact()
    .value()
}

function parse (setList) {
  var tracks = getTracks(getSets(setList))
  return {
    artist: getArtist(setList),
    tracks: formatTracks(tracks),
    tracksTot: tracks.length,
    setsTot: setList.length
  }
}

exports.parse = parse
