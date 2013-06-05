define(['extractTracks', 'orderTracks'], function(extractTracks, orderTracks){
	'use strict';

	return function(content) {
		content = JSON.parse(content);
		var tracks = extractTracks(content);
		tracks = orderTracks(tracks);
		var json = {
			artistName: (content.setlists.setlist instanceof Array) ? content.setlists.setlist[0].artist['@name'] : content.setlists.setlist.artist['@name'],
			tracks: tracks
		};
		return json;
	};
});
