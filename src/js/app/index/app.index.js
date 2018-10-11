// 初始化身份切换
function initEemployee() {
    $('.index').on('click', '.employeeRoleList ', function() {
        $('.bd').css('height', '100vh');
        $('#employeeList').fadeIn(200);
        $('#employeeList .mask').addClass('mask_show');
        $('.employeeList_menu').addClass('employee_menu_active');
        $('.mask').height($('.bd').height());
    });
    $('.index #employeeList').on('click', '.mask', function() {
        $('.employeeList_menu').removeClass('employee_menu_active');
        $('#employeeList .mask').removeClass('mask_show');
        $('.bd').css('min-height', '100vh');
    });
    $('.index #employeeList ').on('click', '.employee_item', function(event) {
        if ($(this).attr('data-disabled')) {
            return;
        }
        $('#employeeList .employee_item').find('.active').remove();
        $(this).append('<span class="active"><i class="ic">&#xe659;</i></span>');
        $('.index #employeeList .mask').click();
        var data = {
            userId: parseInt($(this).attr('data-userId')),
            employeeId: parseInt($(this).attr('data-employeeId'))
        };
        var merchantId = parseInt($(this).attr('data-merchantId'));
        var functionVersion = parseInt($(this).attr('data-functionVersion'));
        app.index.bind(data).then(function(result) {
            var listEmployeeStoreListData = {
                employeeId: data.employeeId,
                merchantId: merchantId
            };
                //  var openId = result.data;
            app.api.index.checkMerchant({
                data: merchantId,
                success: function(res) {
                    if (res.data === false && functionVersion != 4) {
                        if (res.code == '000002') {
                                alert('亲~您的账户还没开通，请等待。系统激活日期：' + app.tools.toDate(res.message, 'yyyy年MM月dd日'));
                            } else if (res.code == '000003') {
                                alert('您的账号已经到期，如需继续使用请致电400-006-2020');
                            } else {
                                alert('合同异常');
                            }
                        app.endLoading();
                        return;
                    }
                    app.index.listEmployeeStoreList(listEmployeeStoreListData).then(function(result) {
                        app.index.getEmployee(data.userId).then(function(employeeInfo) {
                                var employee = employeeInfo;
                                //       employee.openId = openId;
                                for (var j in employee) {
                                    if (employee[j].id == data.employeeId) {
                                        employee = employee[j];
                                        employee.storeList = result;
                                        break;
                                    }
                                }
                                var storeIds = [];
                                for (var o in result) {
                                    storeIds.push(result[o].id);
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
                                if (employee.role == app.constant.WECHAT_BUSINESS[1].code || employee.role == app.constant.WECHAT_BUSINESS[2].code) {
                                    // 员工登录
                                    app.api.userinfo.emplogin({
                                        data: {
                                            empid: data.employeeId
                                        },
                                        success: function(results) {
                                            if (results && results.success) {
                                                window.localStorage.employee = JSON.stringify(employee);
                                                app.api.userinfo.loginBySaasEmployee({
                                                    data: {
                                                        employeeId: employee.id
                                                    },
                                                    success: function(res) {
                                                        var employeeData = window.localStorage.employee;
                                                        if (employeeData) {
                                                            employeeData = JSON.parse(employeeData);
                                                            employeeData.party = res.data;
                                                            window.localStorage.employee = JSON.stringify(employeeData);
                                                            initData();
                                                            app.index.init();
                                                        } else {
                                                            app.userinfo.alertError('服务器开小差，请稍后再试');
                                                        }

                                                    },
                                                    error: function() {
                                                    }
                                                });
                                            } else {
                                                app.alert('切换失败');
                                            }
                                        },
                                        error: function() {
                                            app.alert('切换失败');
                                        }
                                    });
                                } else {
                                    document.cookie = 'rememberMe=';
                                    document.cookie = 'remeberMeRunAsRole=';
                                    localStorage.clear();
                                    app.alert('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                    app.endLoading();
                                    return;
                                }
                            }, function() {
                                app.alert('切换失败');
                            });
                    }, function() {
                        app.alert('切换失败');
                    });
                },
                error: function(a, b, c) {

                }
            });

        },
            function() { app.alert('切换失败'); });
    });
};

function initData() {
    $('.index .storeList .store_name').attr('data-storeId', '');
    $('.index #employeeList .employee_item').attr('data-userId', '');
    $('.index #employeeList .employee_item').attr('data-employeeId', '');
    $('.index #employeeList .employee_item').attr('data-merchantId', '');
};

// 查看员工绩效详情
function goDetail() {
    var employee = JSON.parse(localStorage.employee);
    var perInfo = JSON.parse(localStorage.performanceInfo);
    if (perInfo && employee && employee.id) {
        window.sessionStorage.employeeId = employee.id;
        window.sessionStorage.employeeParam = JSON.stringify({
            startDate: perInfo.startDate,
            endDate: perInfo.endDate,
            merchantId: employee.merchant.id,
            storeId: employee.storeId
        });
        location.href = '/echarts-index.html#/echartsEmployeeDetail';
    } else {
        app.alert('请重新登陆');
        // 失败重新登录
        location.href = '/userinfo.html#/user_login';
    }
}

// 初始化日期
app.index = {
    indexDate: {},
    indexIdName: 'tepm-index',
    userdata: function() {
        // 初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    initDate: function(type) {
        app.tools.initDate(type, app.index.indexIdName);
        $('.index .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.index  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.index.indexDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.index.performance(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.index.indexIdName);
        // 确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.index  .mask').click();
            app.index.performance(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.index.indexIdName);
        // 点击切换门店
        $('.index .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.index .storeLists .mask').click();
            app.index.performance($(this).attr('data-id'), 'storeIds');
        });
    },
    init: function() {
        window.localStorage.setItem('performanceInfo', '');
        window.sessionStorage.setItem('employeeList', '');
        initData();
        var employeeJson = localStorage.employee;
        if (!employeeJson || !JSON.parse(employeeJson) || typeof JSON.parse(employeeJson) != 'object') {
            // location.href = "/userinfo.html?type=1#/user_login";
            this.resetLogin();
            return;
        }
        if (JSON.parse(employeeJson).merchant && (JSON.parse(employeeJson).merchant.functionVersion == 4 || JSON.parse(employeeJson).merchant.functionVersion == 5)) {
            location.href = '/lite/index.html';
            return;
        }
        if (!JSON.parse(employeeJson).storeList) {
            var employee = JSON.parse(employeeJson);
            employee.storeList = [];
            localStorage.setItem('employee', JSON.stringify(employee));
        }
        app.index.userdata().then(function(userDate) {
            if (!sessionStorage.getItem('employeeList')) {
                var userInfo = {
                    userId: JSON.parse(localStorage.employee).userId
                };
                app.userinfo.getMerchanntList(userInfo).then(function(employeeList) {
                    window.sessionStorage.setItem('employeeList', JSON.stringify(employeeList.data));
                    // 权限更新
                    try {
                        var employee = JSON.parse(localStorage.employee);
                        var emp = employeeList.data.filter(function(val) {
                            return val.id === employee.id
                        })[0];
                        employee.merchantRole = emp.merchantRole;
                        localStorage.setItem('employee', JSON.stringify(employee));
                    } catch (error) {}
                    app.index.performance();
                }, function() {
                    // 失败重新登录
                    location.href = '/userinfo.html#/user_login';
                });
            } else {
                app.index.performance();
            }
        }, function() {});
    },
    resetLogin: function() {
        app.api.userinfo.getEmployeeInfo({
            success: function(res) {
                if (res.success && res.data) {
                    app.userinfo.loginEmployee(res.data, 1);
                } else {
                    location.href = '/userinfo.html?type=1#/user_login';
                }
            },
            error: function() {
                location.href = '/userinfo.html?type=1#/user_login';
            }
        });
    },
    pageReloadEvent: function(memberData, data, employee) {
        // 修改html 的title
        app.changeTitle('业绩看板');
        var tmplhtml;
        if (employee.role == 'wechat_business_normal') {
            tmplhtml = $('#tmpl-index-normal-model').html();
        } else {
            app.index.getOperatorStore(data);
            tmplhtml = $('#tmpl-index-admin-model').html();
        }
        try {
            memberData.permissions = employee.merchantRole.permissionPackage.permissions;
        } catch (error) {
            memberData.permissions = [];
        }
        var resultTmpl = tmpl(tmplhtml, memberData);
        $('#tmpl-index').html(resultTmpl);

        app.index.initStoreList(); // 门店绑定事件
        app.index.initDate(memberData.dataType); // 日期绑定事件
        app.index.initCystomDate(memberData.dataType); // 自定义日期绑定事件
        app.index.showGroupTotal(); // 显示干预团
        app.index.showPayNotes(); // 显示收账记录模块

        if (memberData.employeeList.length > 1) { // 换员工判断
            initEemployee();
            $('.index .employeeRoleList').show();
            for (i in memberData.employeeList) {
                if (memberData.employeeList[i].id == employee.id) {
                    $('.index #employeeList .employee_item').eq(i).append('<span class="active"><i class="ic">&#xe659;</i></span>');
                    break;
                }
            }
        }
        if (employee.storeList.length == 1) { // 门店权限判断
            if (employee.role != 'wechat_business_normal') {
                $('.storeLists span:first').remove();
            }
            $('.index .storeList').find('.store_name').text(memberData.storeList[0].name);
        } else {
            $('.allStore').show();
        }
        if (data.storeIds == employee.storeIds) { // 门店默认选中
            $('.storeLists span:first').addClass('active').append('<i></i>');
        } else {
            $('.allStore').show();
            var sum = 0;
            for (var i = 0; i <= memberData.storeList.length - 1; i++) {
                var storeId = memberData.storeList[i].id;
                if (storeId == data.storeIds || storeId == parseInt(data.storeIds)) {
                    $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                    $('.index .storeList').find('.store_name').text(memberData.storeList[i].name);
                    sum++;
                }
            }
            if (sum == memberData.storeList.length) {
                $('.storeLists .stores-info span').eq(0).addClass('active').append('<i></i>');
            }
        }

        if (memberData.dataType == 4) { // 日期类型判断
            $('.index  .dateList').css({ 'left': '39vw', 'font-size': '.9rem' });
        }
        // 日期名称  初次加载放入名称
        $('.dateLists span').eq(parseInt(memberData.dataType) - 1).addClass('active');
        $('.index .dateList').find('.date_name').text(app.tools.getDateName(memberData.dataType, data));
        $('.index .storeList').find('.store_name').text(app.tools.sliceStr($('.index .storeList').find('.store_name').text(), 14));

    },
    performance: function(result, type) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        

        var data = {
            'merchantId': employee.merchantId,
            'employeeId': employee.id,
            'orderStatus': '20'
        };
        var memberData = {
            // 门店列表
            storeList: employee.storeList,
            storeIds: employee.storeIds,
            performanceInfo: {},
            employeeList: JSON.parse(sessionStorage.employeeList)
        };

        var storeIds = $('.index .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            memberData.storeId = $('.index .storeList .store_name').attr('data-storeId');
            data.storeIds = $('.index .storeList .store_name').attr('data-storeId');
        } else {
            memberData.storeId = employee.storeIds;
            data.storeIds = employee.storeIds;
        }
        var dataType = $('.index .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            memberData.dataType = $('.index .dateList .date_name').attr('data-type');
            app.tools.getDateType(memberData.dataType, data, app.index.indexDate);
        } else {
            memberData.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + '00:00:00';
            data.endDate = moment().format('YYYY-MM-DD ') + '23:59:59';
        }
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                memberData.storeId = result;
                break;
            case 'date':
                app.tools.getDateType(result, data, app.index.indexDate);
                memberData.dataType = result;
        }
        // 缓存筛选条件
        var performanceInfo = {
            startDate: data.startDate,
            endDate: data.endDate,
            performanceStoreIds: data.storeIds,
            dataType: memberData.dataType
        };
        window.localStorage.setItem('performanceInfo', JSON.stringify(performanceInfo));
        data.storeId = parseInt(data.storeIds);
        var searchAll = employee.merchantRole.permissionPackage.permissions.indexOf('wechat_business_booking_guest') != -1 ||  employee.merchantRole.permissionPackage.permissions.indexOf('wechat_business_booking_manage') != -1;

        app.index.performanceReport(data, searchAll).then(function(performanceInfoData) {
            memberData.performanceInfo = performanceInfoData;
                // 计算业绩、提成、卡耗

            app.index.pageReloadEvent(memberData, data, employee); // 页面刷新事件

                // 业绩、
            if ((memberData.performanceInfo.income + '').length > 6 || (memberData.performanceInfo.cardConsume + '').length > 6) {
                $('.achievementTotalAmount  .price').css('font-size', '6vw');
                $('.cardConsumeTotalAmount  .price').css('font-size', '6vw');
            }
        },
            function() {
                app.index.pageReloadEvent(memberData, data, employee); // 页面刷新事件
            });
    },
    // 产看可干预团数
    showGroupTotal: function() {
        app.api.index.queryGroupTotal({
            data: employee.merchantId,
            success: function(res) {
                if (res && res.success) {
                    $('#groupTotal').html(res.data);
                }
            },
            error: function(error) {}
        });
        app.api.index.promotionCustomerBuy({
            data: employee.merchantId,
            success: function(res) {
                if (res && res.success && res.data) {
                    var str = '';
                    for (var i = 0; i < res.data.length; i++) {
                        str += '<img style="height:2rem;width: 2rem;border-radius: 50%;vertical-align:middle" src=\'' + app.filePath + res.data[i].avatarFileId + '\' onerror="this.src=\'images/default_female.png\'"/>&nbsp;&nbsp;又一个客户' + res.data[i].nickName + '购买了你的服务,' + res.data[i].price / 100 + '元' + '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;';
                    }

                    $('#promotionCustomerBuy').html(str);
                }
            },
            error: function(error) {}
        });
    },
    // 收账记录模块
    showPayNotes: function() {
        app.api.index.showPayNotes({
            success: function(res) {
                if (res && res.success && res.data) {
                    var employee = JSON.parse(localStorage.employee);
                    $.each(res.data, function(i, v) {
                        if (v.messageType == 1) { // 微信打款推送
                            $.each(v.merchantNoticeList, function(i2, v2) {
                                if (v2.employeeId == employee.id) {
                                    $('#showPayNotes').show();
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                }
            },
            error: function(error) {}
        });
    },
    // 获取业绩看板数据
    performanceReport: function(data, searchAll) {
        if (searchAll) {
            return new Promise(function(resolve, reject) {
                app.startLoading();
                app.api.index.performanceReport({
                    data: data,
                    success: function(results) {
                        app.endLoading();
                        if (results.success) {
                            resolve(results.data);
                        } else {
                            reject(results.message);
                        }
                    },
                    error: function(error) {
                        app.endLoading();
                        console.info(error);
                        reject(error);
                    }
                });
            });
        } else {
            return new Promise(function(resolve, reject) {
                app.startLoading();
                app.api.index.empPerformance({
                    data: data,
                    success: function(results) {
                        app.endLoading();
                        if (results.success) {
                            resolve(results.data);
                        } else {
                            reject(results.message);
                        }
                    },
                    error: function(error) {
                        app.endLoading();
                        console.info(error);
                        reject(error);
                    }
                });
            });
        }
    },
    // 获取员工信息
    getEmployee: function(data) {
        var userInfo = {
            userId: data
        };
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.userinfo.listEmployee({
                data: userInfo,
                success: function(results) {
                    // app.endLoading();
                    if (results.success) {
                        resolve(results.data);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    //   app.endLoading();
                    // 失败重新登录
                    location.href = '/userinfo.html#/user_login';
                    console.info(error);
                    reject(error);
                }
            });
        });
    },
    // 绑定信息
    bind: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.userinfo.bind({
                data: data,
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
    },
    // 获取员工门店列表
    listEmployeeStoreList: function(data) {
        return new Promise(function(resolve, reject) {
            // app.startLoading();
            app.api.userinfo.listEmployeeStoreList({
                data: data,
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
    },
    // 获取事件数量
    getOperatorStore: function(query) {
        var queryData = [{
            'field': 'merchantId',
            'value': query.merchantId
        }, {
            'field': 'startTime',
            'value': query.startDate
        }, {
            'field': 'endTime',
            'value': query.endDate
        }];
        if (query.storeIds && query.storeIds.split(',').length == 1) {
            queryData.push({
                'field': 'storeId',
                'value': query.storeIds
            });
        }
        app.api.operationLog.getOperatorStore({
            data: {
                'query': queryData,
                'page': 1,
                'size': 10000
            },
            success: function(results) {
                if (results.code == '000000') {
                    $('.recordCount').text(results.data);
                }
            },
            error: function() {}
        });
    }
};
