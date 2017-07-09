app.api = {

    url: app.url + '/api',
    ajax: function(options) {
        var url = app.api.url + options.url;
        function error(res){
            switch (res.status) {
                case 401:
                case 403:
                    window.location.href = window.location.origin + "/userinfo.html#/user_login";
                    break;
                case 404:
                    break;
                default:
                    options.error(res)
                    break;
            }
        }
        var settings = {
            url: url,
            async: options.async || true,
            type: options.type,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
             //   'wechat': 'assistant'
            },
            dataType: 'json',
            success: options.success,
            error: error
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
// employee项目多次使用，所以前提
var employee = null;
try {    
    if (localStorage.employee && JSON.parse(localStorage.employee)) {
         employee = JSON.parse(localStorage.employee);
    }
}
cathc(e){
    console.error(e);
}
