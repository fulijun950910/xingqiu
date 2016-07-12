app.userinfo = {
    getEmployee: function () {
        if (localStorage.employee)
            return JSON.parse(localStorage.employee);
    },
    selRoleBox: function (cb) {
        //弹出选择角色门店信息列表
        $('#select_shade').hide();
    },
    updatepwdInit: function () {

    },
    login: function () {
        var error_login = false, msg = '';
        if (!$('input[name="username"]').val()) {
            error_login = true;
            msg = '用户名不可为空';
        }
        if (!$('input[name="password"]').val()) {
            error_login = true;
            msg = '密码不可为空';
        }
        if (error_login) {
            $('#error_msg').html(msg);
            $('#login_error').show();
            setTimeout(function () {
                $('#login_error').hide();
            }, 3000);
            return;
        }
        var param = {
            username: $('input[name="username"]').val(),
            password: app.userinfo.base64Encode($('input[name="password"]').val()),
            rememberMe: true
        }

        //查询用户
        app.api.userinfo.auth({
            data: param,
            success: function (resultUser) {
                var accountParam = {
                    userId: resultUser.data
                }
                app.api.userinfo.listEmployee({
                    data: accountParam,
                    success: function (resultEmployeeList) {
                        for (var i in resultEmployeeList.data) {
                            resultEmployeeList.data[i].jsonData = JSON.stringify(resultEmployeeList.data[i]);
                        }
                        var data = {
                            datas: resultEmployeeList.data
                        };
                        var template = $('#tmpl-employee-list').html();
                        var result = tmpl(template, data);
                        $('#show_employe_list').html(result);
                        $('#select_shade').show();
                    },
                    error: function (a, b, c) {
                        debugger;
                    }
                })
            },
            error: function (a, b, c, d) {
                debugger;
            }
        })
    },
    base64Encode: function (str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },
    loginEmployee: function () {
        window.localStorage.employee = JSON.stringify($('input[name="emp_data"]:checked').data('employee'));
        $('#select_shade').hide();
        if (window.localStorage.employee)
            location.href="/performance-index.html#/performance_report";
    }
}