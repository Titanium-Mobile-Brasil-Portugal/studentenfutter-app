
/**
 *	Gets all lunches
 *	@param {Object} data The GET parameter to form the URL
 *	@param {Callback} cb The callback to be invoked after the asyncronous request
 *	@return void
 */
exports.getLunches = function(params, cb) {
	var auth = null;
	
	try {
		auth = require('/auth');
	} catch(e) {
		var dummyLunches = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'json/lunches.json');
					
		// Simulate HTTP request	
		setTimeout(function() {
			try {
				cb(_.extend(JSON.parse(dummyLunches.read()), {success: true}));
			} catch(e) {
				Ti.API.error('Unable to parse JSON: ' + e);
				cb({success: false});
			} 
		}, 1000);
		
		return;
	}
	
	var RequestInstance = require('/request');
	var request = new RequestInstance({
		url : "/lunches/list/" + params.date + "/" + params.location,
		type : "GET",
		success : function(json) {
			cb(_.extend(json, {success: true}));
		},
		error : function() {
			cb({success: false});
		}
	});
	request.load();
};
