'use strict';

var _ = require('lodash');

function getArtist(sets) {
	return _
		.chain(sets)
		.first()
		.get('artist[@name]')
		.value();
}

function formatTracks(tracks) {
	return _
		.chain(tracks)
		.countBy(function(track){
			return track['@name'].toLowerCase();
		})
		.omit('')
		.map(function(count, track){
			return { title: track, count: count };
		}).sortBy(function(track){
			return -track.count;
		})
		.value();
}

function getTracks(sets) {
	return _
		.chain(sets)
		.map(function(set){
			return set.song;
		})
		.flatten()
		.value();
}

function getSets(setsLists){
	return _
		.chain(setsLists)
		.map(function(setList){
			return setList.sets.set;
		})
		.flatten()
		.compact()
		.value();
}

function getSetsLists(requests){
	var sets = [];
	if (_.isPlainObject(requests)) {
		sets.push(requests.setlist);
	} else {
		sets = _.map(requests, function(request){
			return request.setlist;
		});
	}
	return _.flatten(sets);
}

function parse(setsListsBlob, gigsLimit){
	var setsLists = getSetsLists(setsListsBlob);
	setsLists = _.slice(setsLists, 0, gigsLimit);

	var tracks = getTracks(getSets(setsLists));

	return {
		artist: getArtist(setsLists),
		tracks: formatTracks(tracks),
		tracksTot: tracks.length,
		setsTot: setsLists.length
	};
}

exports.parse = parse;
