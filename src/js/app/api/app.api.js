app.api = {

    url: app.url + '/api',
    ajax: function (options) {
        var url = app.api.url + options.url;
        var settings = {
            url: url,
            type: options.type,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            success: options.success,
            error: options.error
        };

        if (options.data) {
            if (options.type.toUpperCase() === 'GET') {

            } else {
                settings.data = JSON.stringify(options.data);
            }
        }
        $.ajax(settings);
    }
};
