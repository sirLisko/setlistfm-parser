'use strict';

var _ = require('lodash');

var songs;

function populateSongs(song) {
	if (song['@name'].length) {
		songs.push(song['@name'].toLowerCase());
	}
}

function extractSet(set) {
	if (set instanceof Array){
		set.forEach(extractSet);
		return;
	}
	if (set.song instanceof Array) {
		set.song.forEach(populateSongs);
	} else {
		populateSongs(set.song);
	}
}

function extractSetList(setlist){
	if (setlist instanceof Array){
		setlist.forEach(function(setlist){
			if(setlist.sets && setlist.sets.set){
				extractSet(setlist.sets.set);
			}
		});
	} else if(setlist.sets && setlist.sets.set){
		extractSet(setlist.sets.set);
	}
}

function getTracks(setLists){
	songs = [];
	extractSetList(setLists.setlist);

	var songsTot = songs.length;
	songs = _.countBy(songs);

	return {songs: songs, songsTot: songsTot};
}

function getArtistName(setLists){
	return (setLists.setlist instanceof Array) ? setLists.setlist[0].artist['@name'] : setLists.setlist.artist['@name'];
}

function getTracksOrdered(setLists){
	var setsTotal = setLists['@total'];
	var trackList = getTracks(setLists), tracks = [];

	for (var track in trackList.songs) {
		if (trackList.songs.hasOwnProperty(track)) {
			tracks.push({title: track, count: trackList.songs[track]});
		}
	}

	tracks = _.sortBy(tracks, 'count');

	return {artist: getArtistName(setLists), songs: tracks.reverse(), songsTot: trackList.songsTot, setsTot: setsTotal};
}

exports.getTracks = getTracksOrdered;
exports.getArtistName = getArtistName;
