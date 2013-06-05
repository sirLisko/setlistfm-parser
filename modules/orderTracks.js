/*global define*/

define(['lodash'], function (_) {
	'use strict';

	var tracks;

	function orderTracks(payload){
		var songs = payload.songs;
		var elm, trackObj;
		tracks = [];
		for(elm in songs) {
			if (songs.hasOwnProperty(elm)) {
				trackObj = {name: elm, count: songs[elm], quota: Math.round(songs[elm] / payload.songsTot * 100)};
				tracks.push(trackObj);
			}
		}
		tracks = _.sortBy(tracks, function(obj){return -obj.count;});
		return tracks;
	}

	return orderTracks;
});
