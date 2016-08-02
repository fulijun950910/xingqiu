app.api = {

	url : app.url + '/api',
	ajax : function(options) {

		var settings = {
			url : url,
			type : options.type,
			contentType : 'application/json',
			dataType : 'json',
			timeout : 150000,
			success : options.success,
			async : options.async||false,
			error : options.error,
			xhrFields : {
				withCredentials : true
			}
		};

		if (options.data) {
			if (options.type.toUpperCase() === 'GET') {
				settings.data = $.serializeObject(options.data);
			} else {
				settings.data = JSON.stringify(options.data);
			}
		}
		$.ajax(settings);
	}
};
