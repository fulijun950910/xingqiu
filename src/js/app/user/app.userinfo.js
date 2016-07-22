app.userinfo = {
    init: function () {
        if (app.userinfo.getEmployee()) {
            if (app.userinfo.getEmployee().role == app.constant.WECHAT_BUSINESS[1].code) {
                location.href = "/performance-index.html#/performance_report";
            } else if (app.userinfo.getEmployee().role == app.constant.WECHAT_BUSINESS[2].code) {
                location.href = "/performance-index.html#/performance_emp";
            } else {
                location.href = "/userinfo.html#/user_login";
                app.alert('未查到您的身份,请登录美问saas平台设置您的员工身份!!', '操作失败');
            }
        }
    },
    getEmployee: function () {
        if (localStorage.employee) {
            return JSON.parse(localStorage.employee);
        } else {
            app.api.userinfo.findByOpenId({
                success: function (result) {
                    if (!result.success || !result.data) {
                        location.href = "/userinfo.html#/user_login";
                        throw new Error();
                    }
                    var accountParam = {
                        userId: result.data.userId
                    }
                    app.api.userinfo.listEmployee({
                        data: accountParam,
                        success: function (resultEmployeeList) {
                            var employee = {};
                            for (var i in resultEmployeeList.data) {
                                resultEmployeeList.data[i].jsonData = JSON.stringify(resultEmployeeList.data[i]);
                                if (resultEmployeeList.data[i].id == result.data.employeeId) {
                                    employee = resultEmployeeList.data[i];
                                }
                                for (var j in resultEmployeeList.data[i].merchantRole.permissionPackage.permissions) {
                                    var permission = resultEmployeeList.data[i].merchantRole.permissionPackage.permissions[j];
                                    if (permission == app.constant.WECHAT_BUSINESS[1].code) {
                                        employee.role = app.constant.WECHAT_BUSINESS[1].code;
                                        break;
                                    } else if (permission == app.constant.WECHAT_BUSINESS[2].code) {
                                        employee.role = app.constant.WECHAT_BUSINESS[2].code;
                                        break;
                                    } else {
                                        employee.role = null;
                                    }
                                }
                            }
                            if (!employee) {
                                location.href = "/userinfo.html#/user_login";
                                app.alert('未查到您的身份,请登录美问saas平台设置您的员工身份!!', '操作失败');
                                throw new Error();
                            }
                            if (!employee.role) {
                                location.href = "/userinfo.html#/user_login";
                                app.alert('您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!', '操作失败');
                                throw new Error();
                            }

                            if (employee.positionStatus && employee.positionStatus != '1') {
                                app.alert('当前员工已离职,不可登录','登录失败');
                                throw new Error();
                            }

                            var listEmployeeStoreListData = {
                                employeeId: employee.id,
                                merchantId: employee.merchantId
                            }
                            app.api.userinfo.listEmployeeStoreList({
                                data: listEmployeeStoreListData,
                                success: function (result) {
                                    employee.storeList = result.data;
                                    var storeIds = [];
                                    for (var o in employee.storeList) {
                                        storeIds.push(employee.storeList[o].id);
                                    }
                                    employee.storeIds = storeIds.join(',');
                                    window.localStorage.employee = JSON.stringify(employee);
                                    return JSON.parse(localStorage.employee);
                                },
                                error: function (a, b, c) {
                                    location.href = "/userinfo.html#/user_login";
                                }
                            })
                        },
                        error: function (a, b, c) {
                            location.href = "/userinfo.html#/user_login";
                        }
                    })
                },
                error: function () {
                    location.href = "/userinfo.html#/user_login";
                }
            })
        }
    },
    selRoleBox: function (cb) {
        //弹出选择角色门店信息列表
        $('#select_shade').hide();
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
                if (!accountParam.userId) {
                    app.alert('用户名或密码错误', '登录异常');
                    return;
                }
                app.api.userinfo.listEmployee({
                    data: accountParam,
                    success: function (resultEmployeeList) {
                        if (!resultEmployeeList || !resultEmployeeList.success || !resultEmployeeList.data || resultEmployeeList.data.length <=0) {
                            app.alert('未查到您的可用身份或您已离职,请与商户管理员联系并设置您的身份信息。' ,'登录异常');
                            return;
                        }

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
                        $('#show_employe_list label:first').click();
                    },
                    error: function (a, b, c) {

                    }
                })
            },
            error: function (a, b, c, d) {

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
                        var listEmployeeStoreListData = {
                            employeeId: app.userinfo.getEmployee().id,
                            merchantId: app.userinfo.getEmployee().merchantId
                        }
                        app.api.userinfo.listEmployeeStoreList({
                            data: listEmployeeStoreListData,
                            success: function (result) {
                                var employee = app.userinfo.getEmployee();
                                employee.storeList = result.data;
                                var storeIds = [];
                                for (var o in employee.storeList) {
                                    storeIds.push(employee.storeList[o].id);
                                }
                                employee.storeIds = storeIds.join(',');
                                for (var j in employee.merchantRole.permissionPackage.permissions) {
                                    var permission = employee.merchantRole.permissionPackage.permissions[j];
                                    if (permission == app.constant.WECHAT_BUSINESS[1].code) {
                                        employee.role = app.constant.WECHAT_BUSINESS[1].code;
                                        break;
                                    } else if (permission == app.constant.WECHAT_BUSINESS[2].code) {
                                        employee.role = app.constant.WECHAT_BUSINESS[2].code;
                                        break;
                                    } else {
                                        employee.role = null;
                                    }
                                }
                                window.localStorage.employee = JSON.stringify(employee);

                                if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
                                    location.href = "/performance-index.html#/performance_report";
                                } else if (employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                                    location.href = "/performance-index.html#/performance_emp";
                                } else {
                                    localStorage.clear();
                                    location.href = "/userinfo.html#/user_login";
                                    app.alert('您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!', '操作失败');
                                    return;
                                }
                            },
                            error: function (a, b, c) {

                            }
                        })
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
                var template = $('#tmpl-userinfo').html();
                var resultHtml = tmpl(template, result.data);
                $('#userinfo-detail').html(resultHtml);
                $('select[name="gender"]').val(result.data.gender);
                if (result.data.avatarFileId)
                    $('#headarticle').prop('src', app.filePath + result.data.avatarFileId);
                $('#headarticle').on('click', function () {
                    $('#headerfile').click();
                    $('#headerfile').change(function (dom) {
                        app.userinfo.changeImg(dom);
                    })
                })
            },
            error: function (a, b, c) {

            }
        })
    },
    updateEmployee: function () {
        var employee = {
            id: app.userinfo.getEmployee().id,
            name: $('input[name="name"]').val(),
            gender: $('select[name="gender"]').val(),
            birthday: $('input[name="birthday"]').val() + ' 00:00:00',
            address: $('input[name="address"]').val(),
            description: $('input[name="description"]').val(),
            avatarFileId: app.userinfo.fileId
        };
        app.api.userinfo.updateEmployee({
            data: employee,
            success: function (result) {
                if (result.success)
                    app.alert('个人信息修改成功', '修改成功');
            },
            error: function (a, b, c) {
                app.alert('个人信息修改异常,请稍后尝试', '修改异常');
            }
        })
    },
    authUserValidate: function (dom) {
        var $dom = $(dom);
        if ($dom.hasClass('disabled'))
            return;

        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.alert('请输入手机号', '获取验证码异常');
            return;
        }
        var param = {
            username: phone
        }
        app.api.userinfo.authUser({
            data: param,
            success: function (resultUser) {
                var accountParam = {
                    authUserId: resultUser.data
                }
                if (!accountParam.authUserId) {
                    app.alert('未找到当前用户', '获取验证码异常');
                    return;
                }
                app.userinfo.authUserId = accountParam.authUserId;
                app.api.userinfo.authUserValidate({
                    data: accountParam,
                    success: function (resultValidate) {
                        if (resultValidate.success && resultValidate.data) {
                            $('#auth-user-validate').addClass('disabled');
                            $('#auth-user-validate').html('<span id="second">60</span>秒后获取');
                            var secondInterval = setInterval(function () {
                                var second = parseInt($('#second').html()) - 1
                                $('#second').text(second);
                                if (second == 0) {
                                    $('#auth-user-validate').removeClass('disabled');
                                    $('#auth-user-validate').html('获取验证码');
                                    clearInterval(secondInterval);
                                }
                            }, 1000)
                        }
                    },
                    error: function (a, b, c) {

                    }
                })
            },
            error: function (a, b, c) {

            }
        })
    },
    updatePassword: function () {
        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.alert('请输入手机号', '获取验证码异常');
            return;
        }
        var verifycode = $('input[name="verifycode"]').val();
        if (!verifycode) {
            app.alert('请输入验证码', '修改密码异常');
            return;
        }
        var password = $('input[name="password"]').val();
        if (!password) {
            app.alert('请输入密码', '修改密码异常');
            return;
        }

        if (!app.userinfo.authUserId) {
            app.alert('请点击获取验证码', '修改密码异常');
            return;
        }
        var data = {
            authUserId: app.userinfo.authUserId,
            password: password,
            validateCode: verifycode
        }
        app.api.userinfo.updatePassword({
            data: data,
            success: function (result) {
                if (result.success && result.data) {
                    app.alert('修改成功', '密码修改成功');
                    app.userinfo.init();
                }
            },
            error: function (a, b, c) {
                app.alert('验证码错误', '修改密码异常');
            }
        })
    },
    changeImg: function (dom) {
        if (!dom || !dom.files || dom.files.length <= 0)
            return;

        var file = dom.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (evt) {
            var content = evt.target.result;
            var tempAry = content.split(",");
            var base64Str = (tempAry.length == 2) ? tempAry[1] : "";
            var myImage = {
                content: base64Str,
                contentType: file.type,
                originalName: file.name
            };
            app.api.userinfo.uploadFile({
                data: myImage,
                success: function (result) {
                    if (result.success && result.data) {
                        app.userinfo.fileId = result.data;
                        var url = app.filePath + app.userinfo.fileId;
                        $('#headarticle').attr('src', url);
                    }
                },
                error: function (a, b, c) {
                }
            });
        };
    }
}