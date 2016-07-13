app.userinfo = {
    init: function () {
        if (app.userinfo.getEmployee()) {
            if (app.userinfo.getEmployee().organization.level == 1)
                location.href = "/performance-index.html#/performance_report";
            else
                location.href = "/performance-index.html#/performance_emp";
        }
    },
    getEmployee: function () {
        if (localStorage.employee)
            return JSON.parse(localStorage.employee);
        else
            location.href = "/userinfo.html#/user_login";
    },
    selRoleBox: function (cb) {
        //弹出选择角色门店信息列表
        $('#select_shade').hide();
    },
    updatepwdInit: function () {

    },

    updatepwd_init: function () {

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
        if (app.userinfo.getEmployee()) {
            var data = {
                userId: app.userinfo.getEmployee().userId,
                employeeId: app.userinfo.getEmployee().id
            }
            app.api.userinfo.bind({
                data: data,
                success: function (result) {
                    if (result.success) {
                        if (app.userinfo.getEmployee().organization.level == 1)
                            location.href = "/performance-index.html#/performance_report";
                        else
                            location.href = "/performance-index.html#/performance_emp";
                    }
                },
                error: function (a, b, c) {
                }
            })
        }
    },
    logout: function () {
        var data = {
            userId: app.userinfo.getEmployee().userId,
            employeeId: app.userinfo.getEmployee().id
        }
        app.api.userinfo.unbind({
            data: data,
            success: function () {
                localStorage.clear();
                location.href = "/userinfo.html#/user_login";
            },
            error: function () {

            }
        })
    },
    find: function () {
        var data = {
            employeeId: app.userinfo.getEmployee().id
        }
        app.api.userinfo.find({
            data: data,
            success: function (result) {
                debugger;
                var template = $('#tmpl-userinfo').html();
                var resultHtml = tmpl(template, result.data);
                $('#userinfo-detail').html(resultHtml);
                $('select[name="gender"]').val(result.data.gender);
            },
            error: function (a, b, c) {

            }
        })
    },
    updateEmployee: function () {
        var employee = app.userinfo.getEmployee();
        employee.name = $('input[name="name"]').val();
        employee.gender = $('select[name="gender"]').val();
        employee.birthday = $('input[name="birthday"]').val();
        employee.address = $('input[name="address"]').val();
        employee.description = $('input[name="description"]').val();
        app.api.userinfo.authUser({
            data: {username: employee.phone},
            success: function (result) {
                if (result.success) {
                    //用户认证
                    employee.authUserId = result.data;
                    app.api.userinfo.updateEmployee({
                        data: employee,
                        success: function (result) {
                            if (result.success) {
                                app.alert('个人信息修改成功', '修改成功');
                            }
                        },
                        error: function (a, b, c) {
                            debugger;
                        }
                    })
                }
            }
        })

    }
}