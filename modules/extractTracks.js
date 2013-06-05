define(function () {
	'use strict';

	var songs,
		songsTot;

	function populateSongs(song) {
		song = song['@name'].toLowerCase();
		songsTot++;
		if(songs[song]){
			songs[song]++;
		} else {
			songs[song] = 1;
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
		} else {
			if(setlist.sets && setlist.sets.set){
				extractSet(setlist.sets.set);
			}
		}
	}

	function extrackTracks(data){
		songs = {};
		songsTot = 0;
		extractSetList(data.setlists.setlist);
		return {songs: songs, songsTot: songsTot};
	}

	return extrackTracks;
});
