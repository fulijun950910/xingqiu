app.userinfo = {
    init: function() {
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
                    location.href = "/performance-index.html#/performance_report";
                } else if (employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                    location.href = "/performance-index.html#/performance_emp";
                } else {
                    location.href = "/userinfo.html#/user_login";
                    app.alert('δ�鵽�������,���¼����saasƽ̨��������Ա�����!!', '����ʧ��');
                }
            }
        }, function() {});
        //if (app.userinfo.getEmployee())
    },
    getEmployee: function() {
        return new Promise(function(resolve, reject) {
            if (localStorage.employee && localStorage.employee != 'null') {
                var jsession = localStorage.getItem('JSESSIONID');
                var rememberMe = localStorage.getItem('rememberMe');
                var role = localStorage.getItem('remeberMeRunAsRole');
                if(jsession && role){
                    if(rememberMe){
                        //����cookie
                        app.tools.setAllCookie();
                    }else{
                        if(!rememberMe || rememberMe==null || rememberMe=='null' || rememberMe==undefined){
                            app.alert('��½�ѳ�ʱ�������µ�½');
                            location.href = "/userinfo.html#/user_login";
                            return;
                        }
                    }
                }
                resolve(JSON.parse(localStorage.employee));
            } else {
                app.api.userinfo.findByOpenId({
                    success: function(result) {
                        if (!result.success || !result.data) {
                            location.href = "/userinfo.html#/user_login";
                            throw new Error();
                        }
                        var accountParam = {
                            userId: result.data.userId
                        }
                        app.api.userinfo.listEmployee({
                            data: accountParam,
                            success: function(resultEmployeeList) {
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
                                    app.alert('δ�鵽�������,���¼����saasƽ̨��������Ա�����!!', '����ʧ��');
                                    throw new Error();
                                }
                                if (!employee.role) {
                                    location.href = "/userinfo.html#/user_login";
                                    app.alert('��û�з��ʵ�������Ȩ��,���¼����saasƽ̨���õ�������Ȩ��!!', '����ʧ��');
                                    throw new Error();
                                }

                                if (employee.positionStatus && employee.positionStatus != '1') {
                                    app.alert('��ǰԱ������ְ,���ɵ�¼', '��¼ʧ��');
                                    throw new Error();
                                }

                                var listEmployeeStoreListData = {
                                    employeeId: employee.id,
                                    merchantId: employee.merchantId
                                }
                                app.api.userinfo.listEmployeeStoreList({
                                    data: listEmployeeStoreListData,
                                    success: function(result) {
                                        employee.storeList = result.data;
                                        var storeIds = [];
                                        for (var o in employee.storeList) {
                                            storeIds.push(employee.storeList[o].id);
                                        }
                                        employee.storeIds = storeIds.join(',');
                                        window.localStorage.employee = JSON.stringify(employee);
                                        //return JSON.parse(localStorage.employee);
                                        resolve(JSON.parse(localStorage.employee));
                                    },
                                    error: function(a, b, c) {
                                        location.href = "/userinfo.html#/user_login";
                                    }
                                })
                            },
                            error: function(a, b, c) {
                                location.href = "/userinfo.html#/user_login";
                            }
                        })
                    },
                    error: function() {
                        location.href = "/userinfo.html#/user_login";
                    }
                })
            }
        });
    },
    selRoleBox: function(cb) {
        //����ѡ���ɫ�ŵ���Ϣ�б�
        $('#select_shade').hide();
    },
    updatepwd_init: function() {

    },
    login: function() {
        //���漰cookie����
        localStorage.clear();
        sessionStorage.clear();
        var error_login = false,
            msg = '';
        if (!$('input[name="username"]').val()) {
            error_login = true;
            msg = '�û�������Ϊ��';
        }
        if (!$('input[name="password"]').val()) {
            error_login = true;
            msg = '���벻��Ϊ��';
        }
        if (error_login) {
            $('#error_msg').html(msg);
            $('#login_error').show();
            setTimeout(function() {
                $('#login_error').hide();
            }, 3000);
            return;
        }
        //�¼�ͳ��
        baiduStatistical.add({
            category: '��½',
            label: '�û���½',
            val: '',
            action: 'click'
        });
        var param = {
            username: $('input[name="username"]').val(),
            password: app.userinfo.base64Encode($('input[name="password"]').val()),
            rememberMe: true
        }
        //��ѯ�û�
        app.api.userinfo.auth({
            data: param,
            success: function(resultUser) {
                var accountParam = {
                    userId: resultUser.data
                }
                if (!accountParam.userId) {
                    app.alert('�û������������', '��¼�쳣');
                    return;
                }
                app.api.userinfo.listEmployee({
                    data: accountParam,
                    success: function(resultEmployeeList) {
                        if (!resultEmployeeList || !resultEmployeeList.success || !resultEmployeeList.data || resultEmployeeList.data.length <= 0) {
                            app.alert('δ�鵽���Ŀ�����ݻ�������ְ,�����̻�����Ա��ϵ���������������Ϣ��', '��¼�쳣');
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
                    error: function(a, b, c) {

                    }
                })
            },
            error: function(a, b, c, d) {

            }
        })

    },
    base64Encode: function(str) {
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
    loginEmployee: function() {
        //�¼�ͳ��
        baiduStatistical.add({
            category: 'ѡ�����',
            label: 'ѡ����ݵ�½�ŵ�',
            val: '',
            action: 'click'
        });
        window.localStorage.employee = JSON.stringify($('input[name="emp_data"]:checked').data('employee'));

        $('#select_shade').hide();
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                var data = {
                    userId: employee.userId,
                    employeeId: employee.id
                }
                app.api.userinfo.bind({
                    data: data,
                    success: function(result) {
                        if (result.success) {
                            var listEmployeeStoreListData = {
                                employeeId: employee.id,
                                merchantId: employee.merchantId
                            }
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

                                        //Ա����½
                                        app.api.userinfo.emplogin({
                                            data: {
                                                empid: employee.id
                                            },
                                            success: function(results) {
                                                if (results && results.success) {
                                                    //cookie����
                                                    localStorage.setItem('JSESSIONID', app.tools.getCookie('JSESSIONID'));
                                                    localStorage.setItem('rememberMe', app.tools.getCookie('rememberMe'));
                                                    localStorage.setItem('remeberMeRunAsRole', app.tools.getCookie('JSESSIONID'));
                                                }
                                                //
                                                app.userinfo.getEmployee().then(function(employee) {
                                                    if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
                                                        location.href = "/performance-index.html#/performance_report";
                                                    } else if (employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                                                        location.href = "/performance-index.html#/performance_emp";
                                                    } else {
                                                        localStorage.clear();
                                                        location.href = "/userinfo.html#/user_login";
                                                        app.alert('��û�з��ʵ�������Ȩ��,���¼����saasƽ̨���õ�������Ȩ��!!', '����ʧ��');
                                                        return;
                                                    }
                                                });
                                            },
                                            error: function() {

                                            }
                                        });
                                    });
                                },
                                error: function(a, b, c) {

                                }
                            })
                        }
                    },
                    error: function(a, b, c) {

                    }
                })
            }
        }, function() {});
    },
    logout: function() {
        app.userinfo.getEmployee().then(function(employee){
            //�¼�ͳ��
            baiduStatistical.add({
                category: '�˳���½',
                label: '�˳���½',
                val: '',
                action: 'click'
            });
            var data = {
                userId: employee.userId,
                employeeId: employee.id,
                openId: employee.openId,
            }
            app.api.userinfo.unbind({
                data: data,
                success: function() {
                    window.localStorage.clear();
                    location.href = "/userinfo.html#/user_login";
                },
                error: function(a, b, c) {
                    window.localStorage.clear();
                    location.href = "/userinfo.html#/user_login";
                }
            })

        },function(){});
    },
    find: function() {
        app.userinfo.getEmployee().then(function(employee){
            var data = {
                employeeId: employee.id
            }
            app.api.userinfo.find({
                data: data,
                success: function(result) {
                    var template = $('#tmpl-userinfo').html();
                    var resultHtml = tmpl(template, result.data);
                    $('#userinfo-detail').html(resultHtml);
                    $('select[name="gender"]').val(result.data.gender);
                    if (result.data.avatarFileId)
                        $('#headarticle').prop('src', app.filePath + result.data.avatarFileId);
                    $('#headarticle').on('click', function() {
                        $('#headerfile').click();
                        $('#headerfile').change(function(dom) {
                            app.userinfo.changeImg(dom);
                        })
                    })
                },
                error: function(a, b, c) {

                }
            })
        },function(){})
    },
    updateEmployee: function() {
         app.userinfo.getEmployee().then(function(employee){
            //�¼�ͳ��
            baiduStatistical.add({
                category: '������Ϣ�޸�',
                label: '������Ϣ�޸�',
                val: '',
                action: 'click'
            });

            var employee = {
                id: employee.id,
                name: $('input[name="name"]').val(),
                gender: $('select[name="gender"]').val(),
                birthday: $('input[name="birthday"]').val() + ' 00:00:00',
                address: $('input[name="address"]').val(),
                description: $('input[name="description"]').val(),
                avatarFileId: app.userinfo.fileId
            };
            app.api.userinfo.updateEmployee({
                data: employee,
                success: function(result) {
                    if (result.success)
                        app.alert('������Ϣ�޸ĳɹ�', '�޸ĳɹ�');
                    //��ձ���Session
                    app.userinfo.getEmployee().then(function(employee){
                        var e1 = employee;
                        e1.name = employee.name;
                        e1.gender = employee.gender;
                        e1.birthday = employee.birthday;
                        e1.address = employee.address;
                        e1.description = employee.description;
                        e1.avatarFileId = employee.avatarFileId;
                        localStorage.employee = JSON.stringify(e1);
                    },function(){})
                },
                error: function(a, b, c) {
                    app.alert('������Ϣ�޸��쳣,���Ժ���', '�޸��쳣');
                }
            })
         },function(){})
    },
    authUserValidate: function(dom) {
        //�¼�ͳ��
        baiduStatistical.add({
            category: '��֤��',
            label: '��ȡ��֤��',
            val: '',
            action: 'click'
        });
        var $dom = $(dom);
        if ($dom.hasClass('disabled'))
            return;

        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.alert('�������ֻ���', '��ȡ��֤���쳣');
            return;
        }
        var param = {
            username: phone
        }
        app.api.userinfo.authUser({
            data: param,
            success: function(resultUser) {
                var accountParam = {
                    authUserId: resultUser.data
                }
                if (!accountParam.authUserId) {
                    app.alert('δ�ҵ���ǰ�û�', '��ȡ��֤���쳣');
                    return;
                }
                app.userinfo.authUserId = accountParam.authUserId;
                app.api.userinfo.authUserValidate({
                    data: accountParam,
                    success: function(resultValidate) {
                        if (resultValidate.success && resultValidate.data) {
                            $('#auth-user-validate').addClass('disabled');
                            $('#auth-user-validate').html('<span id="second">60</span>����ȡ');
                            var secondInterval = setInterval(function() {
                                var second = parseInt($('#second').html()) - 1
                                $('#second').text(second);
                                if (second == 0) {
                                    $('#auth-user-validate').removeClass('disabled');
                                    $('#auth-user-validate').html('��ȡ��֤��');
                                    clearInterval(secondInterval);
                                }
                            }, 1000)
                        }
                    },
                    error: function(a, b, c) {

                    }
                })
            },
            error: function(a, b, c) {

            }
        })
    },
    updatePassword: function() {
        var phone = $('input[name="phone"]').val();
        if (!phone) {
            app.alert('�������ֻ���', '��ȡ��֤���쳣');
            return;
        }
        var verifycode = $('input[name="verifycode"]').val();
        if (!verifycode) {
            app.alert('��������֤��', '�޸������쳣');
            return;
        }
        var password = $('input[name="password"]').val();
        if (!password) {
            app.alert('����������', '�޸������쳣');
            return;
        }

        if (!app.userinfo.authUserId) {
            app.alert('������ȡ��֤��', '�޸������쳣');
            return;
        }
        var data = {
            authUserId: app.userinfo.authUserId,
            password: password,
            validateCode: verifycode
        }
        //�¼�ͳ��
        baiduStatistical.add({
            category: '�޸�����',
            label: '�û��޸�����',
            val: '',
            action: 'click'
        });
        app.api.userinfo.updatePassword({
            data: data,
            success: function(result) {
                if (result.success && result.data) {
                    app.alert('�޸ĳɹ�', '�����޸ĳɹ�');
                    app.userinfo.init();
                }
            },
            error: function(a, b, c) {
                app.alert('��֤�����', '�޸������쳣');
            }
        })
    },
    changeImg: function(dom) {
        if (!dom || !dom.files || dom.files.length <= 0)
            return;

        var file = dom.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(evt) {
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
                success: function(result) {
                    if (result.success && result.data) {
                        app.userinfo.fileId = result.data;
                        var url = app.filePath + app.userinfo.fileId;
                        $('#headarticle').attr('src', url);
                    }
                },
                error: function(a, b, c) {}
            });
        };
    }
}