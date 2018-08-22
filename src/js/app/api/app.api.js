app.api = {

    url: app.url + '/api',
    ajax: function(options) {
        var url = app.api.url + options.url;
        function error(res) {
            switch (res.status) {
                case 401:
                case 403:
                    localStorage.clear();
                    window.location.href = window.location.origin + '/userinfo.html#/user_login';
                    if (location.pathname == '/userinfo.html') {
                        location.reload();
                    }
                    break;
                case 404:
                    break;
                default:
                    options.error(res);
                    break;
            }
        }
        function success(res) {
            if (res && res.code == 302 && res.data) {
                localStorage.clear();
                window.location.href = res.data;
            } else {
                options.success(res);
            }
        }

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
            success: success,
            error: error
        };

        if (options.success && options.code == 302 && options.data) {
            alert('打开页面时间太长，需要重新验证您的身份。');
            location.href = options.data;
        }

        if (options.data) {
            if (options.type.toUpperCase() === 'GET') {

            } else {
                settings.data = JSON.stringify(options.data);
            }
        }

        $.ajax(settings);
    },
    baseNoun: function(personalNoun) {
        var baseNoun = [
            { name: '技师', value: 'worker' },
            { name: '疗程卡', value: 'treatmentCard' },
            { name: '项目', value: 'project' }
        ];
        return fomartPersonalNoun(personalNoun);

        function fomartPersonalNoun(backData) {
            var baseData = [];
            var result = {};
            baseNoun.map(function(item, index) {
                baseData.push(item);
            });
            if (!backData.length) {
                baseData.map(function(item, index) {
                    result[item.value] = item.name;
                });
                return result;
            }
            backData.map(function(item, index) {
                baseData.map(function(item1, index1) {
                    if (item.nounCode == item1.value) {
                        if (item.targetNoun) {
                            result[item.nounCode] = item.targetNoun;
                        } else {
                            result[item1.value] = item1.name;
                        }
                    }
                });
            });
            return result;
        }
    },

    personalNoun: function(settings) {
        app.api.ajax({
            url: '/nounConfig/list/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    }
};
// employee项目多次使用，所以前提
var employee = null;
try {
    if (localStorage.employee && JSON.parse(localStorage.employee)) {
        employee = JSON.parse(localStorage.employee);
        if (typeof employee != 'object') {
            window.localStorage.clear();
            window.location.href = '/userinfo.html' + window.location.search + '#/user_login';
        }
    }
} catch (e) {
    window.localStorage.clear();
    window.location.href = '/userinfo.html' + window.location.search + '#/user_login';
    console.info(e);
}
