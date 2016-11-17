app.api = {

    url: app.url + '/api',
    ajax: function(options) {
        var url = app.api.url + options.url;
        var settings = {
            url: url,
            async: options.async || true,
            type: options.type,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'wechat': 'assistant'
            },
            dataType: 'json',
            success: options.success,
            error: options.error
        };

        if (options.success && options.code == 302 && options.data) {
            alert("打开页面时间太长，需要重新验证您的身份。");
            location.href = options.data;
        }

        if (options.data) {
            if (options.type.toUpperCase() === 'GET') {

            } else {
                settings.data = JSON.stringify(options.data);
            }
        }

        $.ajax(settings);
    }
};
