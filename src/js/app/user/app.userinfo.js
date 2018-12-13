app.userinfo = {
    wait: 60,
    init: function() {
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                if (employee.role == app.constant.WECHAT_BUSINESS[1].code || employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                    if (employee.merchant && (employee.merchant.functionVersion == 4 || employee.merchant.functionVersion == 5)) { // 营销版
                        location.href = '/lite/index.html';
                    } else {
                        location.href = '/main.html#/index';
                    };
                } else {
                    location.href = '/userinfo.html#/user_login';
                    // app.alert('未查到您的身份,请登录美问saas平台设置您的员工身份!!', '操作失败');
                    app.userinfo.alertError('小主，未查到您的身份,请登录美问saas平台设置您的员工身份!!');
                }
            }
        }, function() {});
        // if (app.userinfo.getEmployee())
    },

    initEvent: function() {
        $('.userInfo').on('change', '.username', function(event) {
            if ($(this).val()) {
                app.userinfo.captcha({ username: $(this).val() });
            } else {
                $('#yzPwd').hide();
                $('#messagePwd').hide();
            }

        });
    },
    goRegistered: function() {
        location.href = app.urlC + '/activity/registered/index.html?applyType=4';
    },
    goMwxq: function() {
        localStorage.clear();
        document.cookie = 'rememberMe=';
        document.cookie = 'remeberMeRunAsRole=';
        var text = '';
        if (keyGetValue('openid')) {
            text = '?openid=' + keyGetValue('openid');
        }
        location.href = '/service/index.html' + text + '#/main';
    },
    messageTime: function(o, data) {
        if (this.wait == 60 && data) {
            app.userinfo.captcha(data, true);
        }
        if (this.wait == 0) {
            o.removeAttribute('disabled');
            // o.removeAttribute("style");
            o.innerHTML = '获取验证码';
            this.wait = 60;
        } else {
            o.setAttribute('disabled', true);
            // o.setAttribute("style", "background:#f5f5f5;");
            o.innerHTML = '重新发送(' + this.wait + ')';
            this.wait--;
            setTimeout(function() {
                app.userinfo.messageTime(o);
            }, 1000);
        }
    },
    captcha: function(data, type) {
        if (data.type && data.username.indexOf('@') != -1) {
            data.type = 'email';
        }
        app.api.userinfo.captcha({
            data: data,
            success: function(result) {
                if (!type) {
                    if (result && result.data && result.data.type == 'image') {
                        $('#yzPwd img').attr('src', result.data.value);
                        $('#yzPwd').show();
                        $('#yzPwd').addClass('show');
                    } else if (result && result.data && result.data.type == 'message') {
                        $('#messagePwd').show();
                        $('#messagePwd').addClass('show');
                    } else {
                        $('#yzPwd').hide();
                        $('#yzPwd').removeClass('show');
                        $('#messagePwd').hide();
                        $('#messagePwd').removeClass('show');
                    }
                }
            },
            error: function(err) {
                alert('服务器正在开小差。。。');
            }
        });

    },
    loginBySaasEmployee: function(id) {
        return new Promise(function(resolve, reject) {
            app.api.userinfo.loginBySaasEmployee({
                data: {
                    employeeId: id
                },
                success: function(res) {
                    resolve(res);
                },
                error: function() {
                }
            });
        });
    },
    getEmployee: function() {
        return new Promise(function(resolve, reject) {
            if (localStorage.employee && localStorage.employee != 'null' && JSON.parse(localStorage.employee).id) {
                resolve(JSON.parse(localStorage.employee));
            } else {
                app.api.userinfo.getEmployeeInfo({
                    success: function(resultEmployeeList) {
                        if (resultEmployeeList.success && resultEmployeeList.data) {
                            var employee = resultEmployeeList.data;
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
                            if (!employee) {
                                location.href = '/userinfo.html?type=1#/user_login';
                                app.userinfo.alertError('小主，未查到您的身份,请登录美问saas平台设置您的员工身份!!');
                                throw new Error();
                            }
                            if (!employee.role) {
                                location.href = '/userinfo.html?type=1#/user_login';
                                app.userinfo.alertError('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                throw new Error();
                            }

                            if (employee.positionStatus && employee.positionStatus != '1') {
                                app.userinfo.alertError('小主，当前员工已离职,不可登录');
                                throw new Error();
                            }

                            var listEmployeeStoreListData = {
                                employeeId: employee.id,
                                merchantId: employee.merchantId
                            };
                            app.api.userinfo.listEmployeeStoreList({
                                data: listEmployeeStoreListData,
                                success: function(result) {
                                    employee.storeList = result.data;
                                    var storeIds = [];
                                    for (var o in employee.storeList) {
                                        storeIds.push(employee.storeList[o].id);
                                    }
                                    employee.storeIds = storeIds.join(',');
                                    app.userinfo.loginBySaasEmployee(employee.id).then(function(res) {
                                        employee.party = res.data;
                                        window.localStorage.employee = JSON.stringify(employee);
                                        resolve(JSON.parse(localStorage.employee));

                                    });
                                },
                                error: function(a, b, c) {
                                    location.href = '/userinfo.html?type=1#/user_login';
                                }
                            });
                        } else {
                            location.href = '/userinfo.html?type=1#/user_login';
                        }
                    },
                    error: function() {
                        location.href = '/userinfo.html?type=1#/user_login';
                    }
                });
            }
        });
    },
    selRoleBox: function(cb) {
        // 弹出选择角色门店信息列表
        $('#select_shade').hide();
    },
    alertError: function(text, second) {
        var text = text || '小主，您当前的网络不给力,请稍后再试';
        var second = second || 2500;
        $('.userInfo').find('.error').addClass('active');
        $('.errorText').text(text);
        setTimeout(function() {
            $('.userInfo').find('.error').removeClass('active');
        }, second);
        var close = function() {
            $('.userInfo').find('.error').removeClass('active');
        };
        return {
            close: close
        };
    },
    login: function() {
        app.startLoading();
        // 缓存及cookie清理
        localStorage.clear();
        // sessionStorage.clear();
        var error_login = false,
            msg = '';
        if (!$('input[name="username"]').val()) {
            app.userinfo.alertError('小主，请输入您的手机号码');
            // error_login = true;
            // msg = '用户名不可为空';
            app.endLoading();
            return;
        }
        if (!$('input[name="password"]').val()) {
            app.userinfo.alertError('小主，请输入您的密码');
            // error_login = true;
            // msg = '密码不可为空';
            app.endLoading();
            return;
        }
        // if (error_login) {
        //     $('#error_msg').html(msg);
        //     $('#login_error').show();
        //     setTimeout(function() {
        //         $('#login_error').hide();
        //     }, 3000);
        //     return;
        // }
        // 事件统计
        baiduStatistical.add({
            category: '登录',
            label: '用户登录',
            val: '',
            action: 'click'
        });
        var param = {
            username: $('input[name="username"]').val(),
            password: app.userinfo.base64Encode($('input[name="password"]').val()),
            rememberMe: true
        };
        if ($('#yzPwd').hasClass('show') && $('.yzPwd').val()) {
            param.captcha = $('.yzPwd').val();
        } else if ($('#messagePwd').hasClass('show') && $('.messagePwd').val()) {
            param.captcha = $('.messagePwd').val();
        }
        // 查询用户
        app.api.userinfo.auth({
            data: param,
            success: function(resultUser) {
                if (resultUser.code == 120010) {
                    app.userinfo.alertError('小主，用户名或密码错误', 3000);
                    app.endLoading();
                    $('.userInfo .username').change();
                    return;
                } else if (resultUser.code == 120011) {
                    app.userinfo.alertError('您的账号已被锁定' + resultUser.message + '分钟，可通过找回密码登陆！', 3000);
                    app.endLoading();
                    $('.userInfo .username').change();
                    return;
                } else if (resultUser.code == 120012) {
                    app.userinfo.alertError('验证码输入错误！', 3000);
                    app.endLoading();
                    return;
                }
                var accountParam = {
                    userId: resultUser.data
                };
                if (!accountParam.userId) {
                    // app.alert('用户名或密码错误', '登录异常');
                    app.userinfo.alertError('小主，用户名或密码错误', 3000);
                    app.endLoading();
                    return;
                }
                app.userinfo.getMerchanntList(accountParam).then(function(resultEmployeeList) {
                    for (var i in resultEmployeeList.data) {
                        resultEmployeeList.data[i].jsonData = JSON.stringify(resultEmployeeList.data[i]);
                    }
                    var data = {
                        datas: resultEmployeeList.data
                    };
                    var template = $('#tmpl-employee-list').html();
                    var result = tmpl(template, data);
                    $('#show_employe_list').html(result);

                    // 如果只有一个员工，默认登录该员工并且绑定，否则显示员工列表让用户选择
                    if (resultEmployeeList.data.length == 1) {
                        $('#show_employe_list label:first').click();
                        app.userinfo.loginEmployee(resultEmployeeList.data[0]);
                    } else {
                        $('#select_shade').show();
                        $('#show_employe_list label:first').click();
                    }
                });
            },
            error: function(a, b, c, d) {

            }
        });

    },
    setPersonalNoun: function(merchantId) {
        app.api.index.personalNoun({
            data: merchantId,
            success: function(msg) {
                var temp = app.api.index.baseNoun(msg.data);
                window.localStorage.setItem('personNoun', JSON.stringify(temp));
            },
            error: function(msg) {
                console.log('会员自定义字段获取失败');
            }
        });

    },
    getMerchanntList: function(userObj) {
        return new Promise(function(resolve, reject) {
            app.api.userinfo.listEmployee({
                data: userObj,
                success: function(resultEmployeeList) {
                    if (!resultEmployeeList || !resultEmployeeList.success || !resultEmployeeList.data || resultEmployeeList.data.length <= 0) {
                        // app.alert('未查到您的可用身份或您已离职,请与商户管理员联系并设置您的身份信息。', '登录异常');
                        if (window.location.pathname != '/userinfo.html') {
                            location.href = '/userinfo.html?type=1#/user_login';
                        }
                        app.userinfo.alertError('未查到您的可用身份或您已离职,请与商户管理员联系并设置您的身份信息', 3000);
                        app.endLoading();
                        return;
                    }
                    // 判断账号状态
                    for (var i = 0; i < resultEmployeeList.data.length; i++) {
                        var tempStatus = app.userinfo.checkidentityStatus(resultEmployeeList.data[i]);
                        var storeOpenStatus = resultEmployeeList.data[i].store ? resultEmployeeList.data[i].store.status : '';
                        if (tempStatus.status != '正常') {
                            resultEmployeeList.data[i].loginStatus = '----' + tempStatus.status;
                        };
                        if (resultEmployeeList.data[i].store) {
                            if (!storeOpenStatus || storeOpenStatus == 3) {
                                resultEmployeeList.data[i].loginStatus = '----门店已关闭';
                            }
                        }
                    }
                    if (resultEmployeeList.data.length <= 0) {
                        app.userinfo.alertError('未查到您的可用身份或您已离职,请与商户管理员联系并设置您的身份信息', 3000);
                        return;
                    }
                    //
                    resolve(resultEmployeeList);
                    app.endLoading();
                },
                error: function(a, b, c) {
                    reject();
                }
            });
        });

    },
    base64Encode: function(str) {
        var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = '';
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += '==';
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += '=';
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
    loginEmployee: function(employee, type) {
        app.startLoading();
        // 事件统计
        baiduStatistical.add({
            category: '选择身份',
            label: '选择身份登录门店',
            val: '',
            action: 'click'
        });
        var selectEmp;
        // 为1时跳入店务中心
        if (type == 1) {
            var loginType = 1;
        }
        if (employee) {
            window.localStorage.employee = JSON.stringify(employee);
            selectEmp = employee;
        } else {
            window.localStorage.employee = JSON.stringify($('input[name="emp_data"]:checked').data('employee'));
            selectEmp = $('input[name="emp_data"]:checked').data('employee');
        };
        var translateStatus = app.userinfo.checkidentityStatus(selectEmp);
        if (translateStatus.status != '正常') {
            if (translateStatus.status == '未开通') {
                app.userinfo.alertError('客官稍候，系统将于' + translateStatus.time + '开通哦~');
            } else {
                app.userinfo.alertError(translateStatus.status);
            }
            document.cookie = 'rememberMe=';
            document.cookie = 'remeberMeRunAsRole=';
            window.localStorage.clear();
            app.endLoading();
            return;
        }
        $('#select_shade').hide();
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                var data = {
                    userId: employee.userId,
                    employeeId: employee.id
                };
                app.api.userinfo.bind({
                    data: data,
                    success: function(result) {
                        if (result.success) {
                            // app.api.index.checkMerchant({
                            //     data: employee.merchantId,
                            //     success: function(res) {
                                    // if (res.data === false && employee.merchant.functionVersion != 4) {
                                    //     if (res.code == '000002') {
                                    //         app.userinfo.alertError('亲~您的账户还没开通，请等待。系统激活日期：' + app.tools.toDate(res.message, 'yyyy年MM月dd日'));
                                    //     } else if (res.code == '000003') {
                                    //         app.userinfo.alertError('您的账号已经到期，如需继续使用请致电400-006-2020');
                                    //     } else {
                                    //         app.userinfo.alertError('合同异常');
                                    //     }
                                    //     document.cookie = 'rememberMe=';
                                    //     document.cookie = 'remeberMeRunAsRole=';
                                    //     window.localStorage.clear();
                                    //     app.endLoading();
                                    //     return;
                                    // }
                            var listEmployeeStoreListData = {
                                employeeId: employee.id,
                                merchantId: employee.merchantId
                            };
                            var openId = result.data;
                            app.api.userinfo.listEmployeeStoreList({
                                data: listEmployeeStoreListData,
                                success: function(result) {
                                    app.userinfo.getEmployee().then(function(employee) {
                                        var employee = employee;
                                        employee.storeList = result.data;
                                        employee.openId = openId;
                                        var storeIds = [];
                                        for (var o in employee.storeList) {
                                            storeIds.push(employee.storeList[o].id);
                                        }
                                        employee.storeIds = storeIds.join(',');
                                        if (!employee.merchantRole) {
                                            app.userinfo.alertError('抱歉，您当前的帐号异常（没有身份），请联系系统管理员！');
                                            document.cookie = 'rememberMe=';
                                            document.cookie = 'remeberMeRunAsRole=';
                                            window.localStorage.clear();
                                            app.endLoading();
                                            return;
                                        }
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
                                        app.userinfo.getOpenId(employee.userId).then(function(backOpenId) {
                                            var employee = JSON.parse(localStorage.getItem('employee'));
                                            employee.openId = backOpenId;
                                            window.localStorage.employee = JSON.stringify(employee);
                                        }, function(backOpenId) {
                                            console.log('获取openID失败');
                                        });

                                        app.userinfo.setPersonalNoun(employee.merchantId);
                                                // 员工登录
                                        app.api.userinfo.emplogin({
                                            data: {
                                                empid: employee.id
                                            },
                                            success: function(results) {
                                                if (results && results.success) {
                                                    app.userinfo.getEmployee().then(function(employee) {
                                                        if (employee.role == app.constant.WECHAT_BUSINESS[1].code || employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                                                            app.userinfo.loginBySaasEmployee(employee.id).then(function(res) {
                                                                var employeeData = window.localStorage.employee;
                                                                if (employeeData) {
                                                                    employeeData = JSON.parse(employeeData);
                                                                    employeeData.party = res.data;
                                                                    window.localStorage.employee = JSON.stringify(employeeData);
                                                                    var url = '/service/index.html#/main';
                                                                    if (keyGetValue('type') == 1 || loginType == 1) {
                                                                        url = '/main.html#/index';
                                                                        if (employee.merchant && (employee.merchant.functionVersion == 4 || employee.merchant.functionVersion == 5)) { // 营销版
                                                                            url = '/lite/index.html';
                                                                        }
                                                                    } else if (keyGetValue('type') == 2) {
                                                                        window.history.back();
                                                                        return;
                                                                    } else if (keyGetValue('type') == 3) {
                                                                        url = '/service/integral-mall.html#/personal';
                                                                    } else if (keyGetValue('type') == 4) {
                                                                        url = '/service/index.html#/checkIn';
                                                                    } else if (keyGetValue('type') == 5) {
                                                                        url = '/service/integral-mall.html#/rule-entry';
                                                                    } else if (keyGetValue('type') == 6) {
                                                                        url = '/service/index.html#/qrconfirm?token=' + keyGetValue('token');
                                                                    } else if (keyGetValue('type') == 7) {
                                                                        url = '/api/wechatbusinessassists/attendance?time=' + keyGetValue('time') + '&merchantId=' + keyGetValue('merchantId') + '&storeId=' + keyGetValue('storeId');
                                                                    } else if (keyGetValue('type') == 8) {
                                                                        url = '/service/integral-mall.html#/b2b-mall-index';
                                                                    } 
                                                                    
                                                                    if (location.pathname == '/main.html') {
                                                                        location.reload();
                                                                    } else {
                                                                        location.href = url;
                                                                    }
                                                                    // if (window.history.replaceState) {
                                                                    //     window.history.replaceState({}, "", window.location.origin + url);
                                                                    //     window.history.go(0);
                                                                    // } else {
                                                                    //     location.href = url;
                                                                    // }
                                                                } else {
                                                                    app.userinfo.alertError('服务器开小差，请稍后再试');
                                                                }
                                                            });
                                                        } else {
                                                            document.cookie = 'rememberMe=';
                                                            document.cookie = 'remeberMeRunAsRole=';
                                                            localStorage.clear();
                                                            location.href = '/userinfo.html#/user_login';
                                                            // app.alert('您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!', '操作失败');
                                                            app.userinfo.alertError('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                                            app.endLoading();
                                                            return;
                                                        }
                                                    });
                                                }
                                            },
                                            error: function() {
                                                app.endLoading();
                                            }
                                        });
                                    });
                                },
                                error: function(a, b, c) {
                                    app.endLoading();
                                }
                            });
                        }
                    },
                    error: function(a, b, c) {
                    }
                });
            }
        }, function() {});
    },
    logout: function() {
        app.userinfo.getEmployee().then(function(employee) {
            // 事件统计
            baiduStatistical.add({
                category: '退出登录',
                label: '退出登录',
                val: '',
                action: 'click'
            });
            var data = {
                userId: employee.userId,
                employeeId: employee.id,
                openId: employee.openId
            };
            app.api.userinfo.unbind({
                data: data,
                success: function() {
                    window.localStorage.clear();
                    document.cookie = 'rememberMe=';
                    document.cookie = 'remeberMeRunAsRole=';
                    location.href = '/userinfo.html#/user_login';
                },
                error: function(a, b, c) {
                    window.localStorage.clear();
                    location.href = '/userinfo.html#/user_login';
                }
            });

        }, function() {});
    },
    find: function() {
        app.startLoading();
        app.userinfo.getEmployee().then(function(employee) {
            var data = {
                employeeId: employee.id
            };
            app.api.userinfo.find({
                data: data,
                success: function(result) {
                    var userinfo = result.data;
                    var template = $('#tmpl-userinfo').html();
                    var resultHtml = tmpl(template, userinfo);
                    $('#userinfo-detail').html(resultHtml);
                    app.endLoading();
                    // 用户名
                    if (userinfo.name) {
                        $('.headPic').find('.employee-name').text(userinfo.name);
                        $('.headPic').find('.employee-name').show();
                    }
                    // 签名
                    if (userinfo.description) {
                        $('.headPic').find('.employee-description').text(app.tools.sliceStr(userinfo.description, 60));
                        $('.headPic').find('.employee-description').show();
                    }

                    window.sessionStorage.setItem('userInfo', JSON.stringify(userinfo));
                    // $('select[name="gender"]').val(userinfo.gender);
                    if (userinfo.avatarFileId) {$('#headarticle').prop('src', app.filePath + userinfo.avatarFileId);}
                    $('#headarticle').on('click', function() {
                        $('#headerfile').click();
                        $('#headerfile').change(function(dom) {
                            app.userinfo.changeImg(dom);
                        });
                    });
                },
                error: function(a, b, c) {

                }
            });
        }, function() {});
    },
    // 用户信息事件
    editUser: function(type) {
        window.location.href = '/userinfo.html#/editUserInfo?type=' + type;
    },
    updateEmployee: function(userinfo) {
        app.userinfo.getEmployee().then(function(employee) {
            // 事件统计
            baiduStatistical.add({
                category: '个人信息修改',
                label: '个人信息修改',
                val: '',
                action: 'click'
            });

            // var employee = {
            //     id: employee.id,
            //     name: $('input[name="name"]').val(),
            //     gender: $('select[name="gender"]').val(),
            //     birthday: $('input[name="birthday"]').val() ? $('input[name="birthday"]').val() + ' 00:00:00' : "",
            //     address: $('input[name="address"]').val(),
            //     description: $('input[name="description"]').val(),
            //     avatarFileId: app.userinfo.fileId
            // };
            // 转换格式
            userinfo.birthday = userinfo.birthday ? userinfo.birthday + ' 00:00:00' : '';
            userinfo.employmentDate = userinfo.employmentDate = userinfo.employmentDate ? userinfo.employmentDate + ' 00:00:00' : '';
            var avatarFileId = employee.avatarFileId;
            if (sessionStorage.userInfo) {
                avatarFileId = JSON.parse(sessionStorage.userInfo).avatarFileId;
            }
            app.api.userinfo.updateEmployee({
                data: userinfo,
                success: function(result) {
                    if (result.success)
                        // app.alert('个人信息修改成功', '修改成功');
                        // app.userinfo.alertError('小主，个人信息修改成功');
                        // 清空本地Session
                        {
                        app.userinfo.getEmployee().then(function(employee) {
                            var e1 = employee;
                            e1.name = employee.name;
                            e1.gender = employee.gender;
                            e1.birthday = employee.birthday;
                            e1.address = employee.address;
                            e1.description = employee.description;
                            e1.avatarFileId = avatarFileId;
                            localStorage.employee = JSON.stringify(e1);
                        }, function() {
                            app.userinfo.alertError('小主，个人信息修改异常,请稍后尝试');
                        });
                    };
                    location.href = '/userinfo.html#/';
                },
                error: function(a, b, c) {
                    //   app.alert('个人信息修改异常,请稍后尝试', '修改异常');
                    app.userinfo.alertError('小主，个人信息修改异常,请稍后尝试');
                }
            });
        }, function() {});
    },
    authUserValidate: function(dom) {
        // 事件统计
        baiduStatistical.add({
            category: '验证码',
            label: '获取验证码',
            val: '',
            action: 'click'
        });
        var $dom = $(dom);
        if ($dom.hasClass('disabled')) {return;}

        var phone = $('input[name="phone"]').val();
        if (!phone) {
            // app.alert('请输入手机号', '获取验证码异常');
            app.userinfo.alertError('小主，请输入手机号');
            return;
        }
        var param = {
            username: phone
        };
        app.api.userinfo.authUser({
            data: param,
            success: function(resultUser) {
                var accountParam = {
                    authUserId: resultUser.data
                };
                if (!accountParam.authUserId) {
                    // app.alert('未找到当前用户', '获取验证码异常');
                    app.userinfo.alertError('小主，未找到当前用户');
                    return;
                }
                app.userinfo.authUserId = accountParam.authUserId;
                app.api.userinfo.authUserValidate({
                    data: accountParam,
                    success: function(resultValidate) {
                        if (resultValidate.success && resultValidate.data) {
                            $('#auth-user-validate').addClass('disabled');
                            $('#auth-user-validate').html('<span id="second">60</span>秒后获取');
                            var secondInterval = setInterval(function() {
                                var second = parseInt($('#second').html()) - 1;
                                $('#second').text(second);
                                if (second == 0) {
                                    $('#auth-user-validate').removeClass('disabled');
                                    $('#auth-user-validate').html('获取验证码');
                                    clearInterval(secondInterval);
                                }
                            }, 1000);
                        }
                    },
                    error: function(a, b, c) {

                    }
                });
            },
            error: function(a, b, c) {

            }
        });
    },
    authUserPersonValidate: function(dom) {
        // 事件统计
        baiduStatistical.add({
            category: '验证码',
            label: '获取验证码',
            val: '',
            action: 'click'
        });
        var $dom = $(dom);
        if ($dom.hasClass('disabled')) {return;}

        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.userinfo.alertError('小主，请输入手机号');
            return;
        }
        var param = {
            identifier: phone,
            type: 1,
            purpose: 1
        };
        app.api.userinfo.authUserPersonValidate({
            data: param,
            success: function(resultValidate) {
                if (resultValidate.success && resultValidate.data) {
                    $('#auth-user-validate').addClass('disabled');
                    $('#auth-user-validate').html('<span id="second">60</span>秒后获取');
                    var secondInterval = setInterval(function() {
                        var second = parseInt($('#second').html()) - 1;
                        $('#second').text(second);
                        if (second == 0) {
                            $('#auth-user-validate').removeClass('disabled');
                            $('#auth-user-validate').html('获取验证码');
                            clearInterval(secondInterval);
                        }
                    }, 1000);
                }
            },
            error: function(a, b, c) {

            }
        });
    },
    generate: function(type) {
        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.userinfo.alertError('小主，请输入手机号');
            return;
        }
        var param = {
            username: phone
        };
        app.api.userinfo.authUser({
            data: param,
            success: function(resultUser) {
                app.userinfo.authUserId = resultUser.data;
                var accountParam = {
                    type: 1,  // 0用户名 1手机 2邮箱
                    purpose: 2, // 0 注册 1登陆 2找回密码 3.验证 4 卡扣验证
                    yzType: 1, // 0 文字短信 1语音验证
                    identifier: phone
                };
                if (type) {
                    accountParam.purpose = type;
                }
                app.api.userinfo.generate({
                    data: accountParam,
                    success: function(results) {
                        if (results.code = '000000' && results.data) {
                            app.alert('成功发送语音验证码请求,请稍等片刻');
                        } else {
                            app.alert('小主,' + results.message);
                        }
                    },
                    error: function() {
                        app.alert('小主,系统繁忙,请稍后再试!');
                    }
                });
            },
            error: function(a, b, c) {

            }
        });

    },
    updatePassword: function() {
        var phone = $('input[name="phone"]').val();
        if (!phone) {
            // app.alert('请输入手机号', '获取验证码异常');
            app.userinfo.alertError('小主，请输入手机号');
            return;
        }
        var verifycode = $('input[name="verifycode"]').val();
        if (!verifycode) {
            // app.alert('请输入验证码', '修改密码异常');
            app.userinfo.alertError('小主，请输入验证码');
            return;
        }
        var password = $('input[name="password"]').val();
        if (!password) {
            // app.alert('请输入密码', '修改密码异常');
            app.userinfo.alertError('小主，请输入密码');
            return;
        }

        if (!app.userinfo.authUserId) {
            // app.alert('请点击获取验证码', '修改密码异常');
            app.userinfo.alertError('小主，请点击获取验证码');
            return;
        }
        var data = {
            authUserId: app.userinfo.authUserId,
            password: password,
            validateCode: verifycode
        };
        // 事件统计
        baiduStatistical.add({
            category: '找回密码',
            label: '用户找回密码',
            val: '',
            action: 'click'
        });
        app.api.userinfo.updatePassword({
            data: data,
            success: function(result) {
                if (result.success && result.data) {
                    // app.alert('修改成功', '密码修改成功');
                    app.userinfo.alertError('小主，修改成功');
                    setTimeout(function() {
                        app.userinfo.init();
                    }, 800);
                }
            },
            error: function(a, b, c) {
                // app.alert('验证码错误', '修改密码异常');
                app.userinfo.alertError('小主，请输入正确的验证码');
            }
        });
    },
    personLogin: function() {
        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.userinfo.alertError('小主，请输入手机号');
            return;
        }
        var captcha = $('input[name="verifycode"]').val();
        if (!captcha) {
            app.userinfo.alertError('小主，请输入验证码');
            return;
        }
        var data = {
            phone: phone,
            captcha: captcha,
            rememberMe: true
        };
        // 事件统计
        baiduStatistical.add({
            category: '登录',
            label: '散客登录',
            val: '',
            action: 'click'
        });
        app.api.userinfo.personLogin({
            data: data,
            success: function(result) {
                if (result.success && result.data) {
                    // 绑定openid手机号
                    app.api.userinfo.bindMobileToOpenId({
                        data: {openId: keyGetValue('openid'), mobile: data.phone, code: data.captcha},
                        success: function() {
                        }
                    });
                    // 获取用户数据
                    app.api.userinfo.loginByOpenId({
                        data: {openId: keyGetValue('openid')},
                        success: function(res) {
                            if (res.success && res.data) {
                                var employeeData = {
                                    openId: keyGetValue('openid'),
                                    party: res.data
                                };
                                window.localStorage.employee = JSON.stringify(employeeData);
                                app.api.userinfo.b2bUserLogin({
                                    data: {
                                        openId: keyGetValue('openid'),
                                        phone: data.phone,
                                        userId: result.data,
                                        partyId: employeeData.party.partyId
                                    },
                                    success: function(res) {
                                        if (res.success) {
                                            if (keyGetValue('type') == 2) {
                                                window.history.go(-2);
                                            } else if (keyGetValue('type') == 3) {
                                                location.href = '/service/integral-mall.html#/personal';
                                            } else if (keyGetValue('type') == 4) {
                                                location.href = '/service/index.html#/checkIn';
                                            } else if (keyGetValue('type') == 5) {
                                                location.href = '/service/integral-mall.htm#/personal';
                                            } else if (keyGetValue('type') == 8) {
                                                location.href = '/service/integral-mall.html#/b2b-mall-index';
                                            } else {
                                                location.href = '/service/index.html#/main';
                                            }
                                        } else {
                                            app.userinfo.alertError(result.message);
                                            return;
                                        }
                                    }
                                });
                            } else {
                                app.userinfo.alertError(result.message);
                                return;
                            }
                        }
                    });
                } else {
                    app.userinfo.alertError(result.message);
                    return;
                }
            },
            error: function(a, b, c) {
            }
        });
    },
    changeImg: function(dom) {
        if (!dom || !dom.files || dom.files.length <= 0) {return;}

        var file = dom.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(evt) {
            var content = evt.target.result;
            var tempAry = content.split(',');
            var base64Str = (tempAry.length == 2) ? tempAry[1] : '';
            var myImage = {
                content: base64Str,
                contentType: file.type,
                originalName: file.name
            };
            app.api.userinfo.uploadFile({
                data: myImage,
                success: function(result) {
                    if (result.success && result.data) {
                        app.userinfo.fileId = result.data;
                        var url = app.filePath + app.userinfo.fileId;
                        $('#headarticle').attr('src', url);
                        var userinfo = JSON.parse(sessionStorage.userInfo);
                        userinfo.avatarFileId = result.data;
                        sessionStorage.setItem('userInfo', JSON.stringify(userinfo));
                        app.userinfo.updateEmployee(userinfo);
                    }
                },
                error: function(a, b, c) {}
            });
        };
    },
    // 修改用户信息
    editUserInfo: function() {
        if (sessionStorage.userInfo && JSON.parse(sessionStorage.userInfo)) {
            var userinfo = JSON.parse(sessionStorage.userInfo);
            userinfo.type = window.location.hash.substr(window.location.hash.indexOf('=') + 1);
            // userinfo.birthday = userinfo.birthday ? userinfo.birthday : moment().format('YYYY-MM-DD');
            var tmplhtml = $('#tmpl-edit-userInfo-model').html();
            var resultTmpl = tmpl(tmplhtml, userinfo);
            $('#tmpl-edit-userInfo').html(resultTmpl);
            if (userinfo.gender == 2) { // 女
                $('.female-info').addClass('female-active');
            } else if (userinfo.gender == 1) { // 男
                $('.male-info').addClass('male-active');
            }
            // 绑定清除文本框事件
            $('.edit-userInfo .form').on('touchstart', '.clearInfo', function(event) {
                event.preventDefault();
                $(this).prev().val('');
            });
            // 查看密码
            $('.edit-userInfo .form').on('touchstart', '.getPwd', function(event) {
                event.preventDefault();
                if ($(this).prev('input').attr('type') == 'text') {
                    $(this).prev('input').attr('type', 'password');
                    $(this).replaceWith('<i class="ic font-secondary-color getPwd">&#xe695;</i>');
                } else {
                    $(this).prev('input').attr('type', 'text');
                    $(this).replaceWith('<i class="ic font-secondary-color getPwd">&#xe69d;</i>');
                }
            });
            // 修改性别
            $('.edit-userInfo').on('click', '.gender-info', function(event) {
                event.preventDefault();
                if ($(this).hasClass('female-info')) {
                    $(this).addClass('female-active');
                    $(this).next().removeClass('male-active');
                } else {
                    $(this).addClass('male-active');
                    $(this).prev().removeClass('female-active');
                }
            });
            // 修改用户信息
            $('.edit-userInfo').on('click', '.save_btn', function(event) {
                event.preventDefault();
                switch (parseInt(userinfo.type)) {
                    case 1: // 用户名
                        if (!$('.edit-userInfo').find('.name').val()) {
                            app.userinfo.alertError('小主，取个闪亮的名字秀出美美的你吧~');
                            return;
                        }
                        userinfo.name = $('.edit-userInfo').find('.name').val();
                        break;
                    case 2: // 性别
                        userinfo.gender = $('.edit-userInfo').find('.gender-info').hasClass('female-active') ? 2 : 1;
                        break;
                    case 3: // 生日
                        userinfo.birthday = $('.edit-userInfo').find('.birthday').val() ? $('.edit-userInfo').find('.birthday').val() + ' 00:00:00' : '';
                        break;
                    case 4: // 地址
                        userinfo.address = $('.edit-userInfo').find('.address').val();
                        break;
                    case 5: // 签名
                        userinfo.description = $('.edit-userInfo').find('.description').val();
                        break;
                    case 6: // 修改密码
                        // 事件统计
                        baiduStatistical.add({
                            category: '修改密码',
                            label: '用户修改密码',
                            val: '',
                            action: 'click'
                        });
                        if (!$('.edit-userInfo').find('.oldPassword').val()) {
                            app.userinfo.alertError('小主，请输入原密码');
                            return;
                        }
                        if (!$('.edit-userInfo').find('.newPassword').val()) {
                            app.userinfo.alertError('小主，请输入新密码');
                            return;
                        }
                        if ($('.edit-userInfo').find('.newPassword').val().length < 6) {
                            app.userinfo.alertError('小主，密码安全性太弱啦~ ');
                            return;
                        }
                        if (!$('.edit-userInfo').find('.newPwd').val()) {
                            app.userinfo.alertError('小主，请确认密码');
                            return;
                        }

                        if ($('.edit-userInfo').find('.newPwd').val() !== $('.edit-userInfo').find('.newPassword').val()) {
                            app.userinfo.alertError('小主，两次密码输入不正确');
                            return;
                        }
                        var updatePassword = {
                            userId: userinfo.userId,
                            oldPassword: $('.edit-userInfo').find('.oldPassword').val(),
                            newPassword: $('.edit-userInfo').find('.newPassword').val()
                        };
                        app.api.userinfo.newPassword({
                            data: updatePassword,
                            success: function(result) {
                                if (result.success && result.data) {
                                    app.toast('密码修改成功');
                                    window.history.back();
                                } else {
                                    app.userinfo.alertError(result.message);
                                    return;
                                }
                            },
                            error: function(a, b, c) {
                                app.userinfo.alertError();
                                return;
                            }
                        });
                        return;
                }

                app.userinfo.updateEmployee(userinfo);
            });
        } else {
            location.href = '/userinfo.html#/';
        }
    },
    // check当前身份状态
    checkidentityStatus: function(item) {
        function formatStatus(type) {
            var status;
            switch (type) {
                case '0':
                    status = '正常';
                    break;
                case '1':
                    status = '合同到期';
                    break;
                case '2':
                    status = '未开通';
                    break;
                case '3':
                // 合同异常
                    status = '正常';
                    break;
            }
            return status;
        };
        var result = {};
        if (item.store) {
            if (item.store.storeContractStatus) {
                result.status = formatStatus(item.store.storeContractStatus);
            } else {
                result.status = formatStatus(item.serviceOpenstatus);
            }
        } else {
            result.status = formatStatus(item.serviceOpenstatus);
        }
        result.time = item.startDate;
        return result;
    },
    // 获取userId
    getOpenId: function(userId) {
        return new Promise(function(resolve, reject) {
            // app.startLoading();
            app.api.userinfo.getOpenIdByUserId({
                data: {userId: userId},
                success: function(results) {
                    //   app.endLoading();
                    if (results.success) {
                        resolve(results.data);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    //   app.endLoading();
                    console.info(error);
                    reject(error);
                }
            });
        });
    }
};
