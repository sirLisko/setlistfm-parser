define(['node-pubsub', 'factoryTracks'], function(pubsub, factoryTracks){
	'use strict';

	return function(respons) {
		var content = '';
		if(respons.statusCode === 200){
			respons.setEncoding('utf8');
			respons.on('data', function (chunk) {
				content += chunk;
			});
			respons.on('end', function(){
				var json = factoryTracks(content);
				pubsub.publish('handleResp', [202, json]);
			});
		} else {
			pubsub.publish('handleResp', [404, {'message': 'notFound'}]);
		}
	};
});
