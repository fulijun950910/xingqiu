//初始化门店切换
function initStoreList() {
    //展开门店选择
    $('.index').on('click', '.storeList', function(event) {
        $('.storeLists').fadeIn(200);
        $('.storeLists .mask').addClass('mask_show');
        $('.stores').addClass('stores-active');
        $('.mask').height($('.bd').height());
    });
    //关闭门店选择
    $('.index .storeLists').on('click', '.mask', function(event) {
        $('.stores').removeClass('stores-active');
        $('.storeLists .mask').removeClass('mask_show');
    });
    //点击切换门店
    $('.index .storeLists .stores').on('click', 'span', function(event) {
        $('.storeLists span').removeClass('active').find('i').remove();
        $(this).addClass('active').append('<i></i>');
        $('.index .storeLists .mask').click();
        app.index.performance($(this).attr('data-id'), 'storeIds');
    });
};

//初始化时间切换
function initDate(memberData) {
    $('.index').on('click', '.dateList', function() {
        $('#dateList').fadeIn(200);
        $('#dateList .mask').addClass('mask_show');
        $('.date_menu').addClass('date_menu_active');
        $('.mask').height($('.bd').height());
        //判断是否有选中active
        if (!$('#dateList span').hasClass('active')) {
            $('#dateList span:first').addClass('active');
        }
    });
    $('.index').on('click', '.mask', function() {
        $('.date_menu').removeClass('date_menu_active');
        $('.mask').removeClass('mask_show');
        $('.cystomDate .date_menu').removeClass('date_menu_active');
        $('.cystomDate .mask').removeClass('mask_show');
        $('#dateList span').removeClass('active').find('i').remove();
        $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
    });
    //点击切换日期
    $('.index #dateList .date_info').on('click', 'span', function(event) {
        $('#dateList span').removeClass('active').find('i').remove();
        $(this).addClass('active');
        $('.index  .mask').click();
        if ($(this).attr('data-type') == 4) {
            setIndexDate();
            $('.cystomDate').fadeIn(200);
            $('.cystomDate .mask').addClass('mask_show');
            $('.cystomDate .date_menu').addClass('date_menu_active');
            $('.cystomDate .mask').height($('.bd').height());
        } else {
            app.index.performance(parseInt($(this).attr('data-type')), 'date');
        }
        //   app.index.performance(parseInt($(this).attr('data-type')), 'date');
    });
};

function initIndexCystomDate(memberData) {
    //取消自定义事件选择
    $('.cystomDate').on('click', '.cancelDate', function() {
        $('.cystomDate .date_menu').removeClass('date_menu_active');
        $('.cystomDate .mask').removeClass('mask_show');
        $('#dateList span').removeClass('active').find('i').remove();
        $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
    });
    //确定自定义时间选择
    $('.cystomDate').on('click', '.saveDate', function() {
        $('.income  .mask').click();
        app.index.performance(4, 'date');
    });
};

function setIndexDate() {
    var startDate = moment().format('YYYY-MM-DD') + "T" + "00:00";
    var endDate = moment().format('YYYY-MM-DD') + "T" + "23:59";
    if (indexDate && indexDate.startDate) {
        startDate = moment(indexDate.startDate).format('YYYY-MM-DD') + "T" + moment(indexDate.startDate).format('HH:mm:ss');
        endDate = moment(indexDate.endDate).format('YYYY-MM-DD') + "T" + moment(indexDate.startDate).format('HH:mm:ss');
    }
    $(".index .startDate").val(startDate);
    $('.index .endDate').val(endDate);
};

//初始化身份切换
function initEemployee() {
    $('.index').on('click', '.employeeRoleList ', function() {
        $('#employeeList').fadeIn(200);
        $('#employeeList .mask').addClass('mask_show');
        $('.employeeList_menu').addClass('employee_menu_active');
        $('.mask').height($('.bd').height());
    });
    $('.index #employeeList').on('click', '.mask', function() {
        $('.employeeList_menu').removeClass('employee_menu_active');
        $('#employeeList .mask').removeClass('mask_show');
    });
    $('.index #employeeList ').on('click', '.employee_item', function(event) {
        $('#employeeList .employee_item').find('.active').remove();
        $(this).append('<span class="active"><i class="ic">&#xe659;</i></span>');
        $('.index #employeeList .mask').click();
        var data = {
            userId: parseInt($(this).attr('data-userId')),
            employeeId: parseInt($(this).attr('data-employeeId'))
        }
        var merchantId = parseInt($(this).attr('data-merchantId'));
        app.index.bind(data).then(function(result) {
                var listEmployeeStoreListData = {
                        employeeId: data.employeeId,
                        merchantId: merchantId
                    }
                    //  var openId = result.data;
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
                                //员工登录
                                app.api.userinfo.emplogin({
                                    data: {
                                        empid: data.employeeId
                                    },
                                    success: function(results) {
                                        if (results && results.success) {
                                            window.localStorage.employee = JSON.stringify(employee);
                                            initData();
                                            app.index.init();
                                        } else {
                                            app.alert('切换失败');
                                        }
                                    },
                                    error: function() { app.alert('切换失败'); }
                                });
                            },
                            function() { app.alert('切换失败'); });
                    },
                    function() { app.alert('切换失败'); });
            },
            function() { app.alert('切换失败'); })
    });
};

function initData() {
    $('.index .storeList .store_name').attr('data-storeId', "");
    //  $('.index .dateList .date_name').attr('data-type', "");
    $('.index #employeeList .employee_item').attr('data-userId', '');
    $('.index #employeeList .employee_item').attr('data-employeeId', '');
    $('.index #employeeList .employee_item').attr('data-merchantId', '');
};

function getDateName(code, data) {
    var result = [];
    if (!code) {
        return "今日";
    }
    if (data) {
        result[4] = moment(data.startDate).format('YYYY-MM-DD') + "~" + moment(data.endDate).format('YYYY-MM-DD');
    }

    result[1] = "今日";
    result[2] = "昨天";
    result[3] = "本月";
    return result[code];
};

//创建订单信息
var orderInfo = {}
    //业绩来源
var performanceInfo = {};

//自定义时间
var indexDate = {};

function createOrderInfo() {
    var order = {
        startDate: orderInfo.startDate,
        endDate: orderInfo.endDate,
        storeIds: orderInfo.orderStoreIds
    }
    var order_info = JSON.stringify(order);
    window.localStorage.setItem("orderInfo", order_info);
    window.location.href = "/performance-index.html#/order-list";
};

//获取时间
function getIndexDateType(type, data) {
    switch (parseInt(type)) {
        //今日
        case 1:
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
            break;
            //昨天
        case 2:
            data.startDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "23:59:59";
            break;
            //本月
        case 3:
            data.startDate = moment().subtract(0, "month").startOf("month").format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().subtract(0, "month").endOf('month').format('YYYY-MM-DD ') + "23:59:59";
            break;
        case 4:
            if ($('.index .startDate').val()) {
                data.startDate = moment($('.index .startDate').val()).format('YYYY-MM-DD HH:mm:') + "00";
                indexDate.startDate = data.startDate;
            } else {
                data.startDate = indexDate.startDate;
            }
            if ($('.index .endDate').val()) {
                data.endDate = moment($('.index .endDate').val()).format('YYYY-MM-DD HH:mm:') + "59";
                indexDate.endDate = data.endDate;
            } else {
                data.endDate = indexDate.endDate;
            }
            // if (indexDate && indexDate.startDate) {
            //     data.startDate = indexDate.startDate;
            //     data.endDate = indexDate.endDate;
            // } else {
            //     data.startDate = moment($('.index .startDate').val()).format('YYYY-MM-DD HH:mm:') + "00";
            //     data.endDate = moment($('.index .endDate').val()).format('YYYY-MM-DD HH:mm:') + "59";
            //     indexDate.startDate = data.startDate;
            //     indexDate.endDate = data.endDate;
            // }
            break;
    }
};

//计算员工。管理员业绩与卡耗
function changePerformance(role, memberData) {
    if (role == "wechat_business_normal") {
        memberData.performanceInfo.performance = app.tools.toThousands(memberData.performanceInfo.performance).split('.');
        memberData.performanceInfo.performanceY = memberData.performanceInfo.performance[0];
        memberData.performanceInfo.performanceF = memberData.performanceInfo.performance[1];
        //卡耗 cardConsume
        memberData.performanceInfo.cardConsume = app.tools.toThousands(memberData.performanceInfo.cardConsumeTotalAmount).split('.');
        memberData.performanceInfo.cardConsumeY = memberData.performanceInfo.cardConsume[0];
        memberData.performanceInfo.cardConsumeF = memberData.performanceInfo.cardConsume[1];
    } else {
        memberData.performanceInfo.performance = app.tools.toThousands(memberData.performanceInfo.income).split('.');
        memberData.performanceInfo.performanceY = memberData.performanceInfo.performance[0];
        memberData.performanceInfo.performanceF = memberData.performanceInfo.performance[1];
        //卡耗 cardConsume
        memberData.performanceInfo.cardConsume = app.tools.toThousands(memberData.performanceInfo.cardConsume).split('.');
        memberData.performanceInfo.cardConsumeY = memberData.performanceInfo.cardConsume[0];
        memberData.performanceInfo.cardConsumeF = memberData.performanceInfo.cardConsume[1];
    }
    //提成 
    memberData.performanceInfo.currentMonthCommission = app.tools.toThousands(memberData.performanceInfo.currentMonthCommission).split('.');
    memberData.performanceInfo.currentMonthCommissionY = memberData.performanceInfo.currentMonthCommission[0];
    memberData.performanceInfo.currentMonthCommissionF = memberData.performanceInfo.currentMonthCommission[1];
};

function initHtml(memberData, employee) {};

//初始化日期
app.index = {
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        window.localStorage.setItem("orderInfo", "");
        window.localStorage.setItem("performanceInfo", "");
        window.sessionStorage.setItem('employeeList', "");
        initData();
        //  $('#tmpl-index').html('');
        app.index.userdata().then(function(userDate) {
            if (!sessionStorage.getItem("employeeList")) {
                app.index.getEmployee(JSON.parse(localStorage.employee).userId).then(function(employeeList) {
                    window.sessionStorage.setItem('employeeList', JSON.stringify(employeeList));
                    app.index.performance();
                }, function() {})
            } else {
                app.index.performance();
            }
        }, function() {})
    },
    performance: function(result, type) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var data = {
            'merchantId': employee.merchantId,
            'employeeId': employee.id,
        }
        var memberData = {
            //门店列表
            storeList: employee.storeList,
            storeIds: employee.storeIds
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
            getIndexDateType(memberData.dataType, data);
        } else {
            memberData.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                memberData.storeId = result;
                break;
            case 'date':
                getIndexDateType(result, data);
                memberData.dataType = result;
        }
        //订单信息
        orderInfo = {
            startDate: data.startDate,
            endDate: data.endDate,
            orderStoreIds: data.storeIds
        };
        //业绩来源信息
        performanceInfo = {
            startDate: data.startDate,
            endDate: data.endDate,
            performanceStoreIds: data.storeIds,
            dataType: memberData.dataType
        };
        data.storeId = parseInt(data.storeIds);
        //普通员工(暂查本月的)
        if (employee.role == "wechat_business_normal") {
            data.startDate = moment().subtract(0, "month").startOf("month").format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().subtract(0, "month").endOf('month').format('YYYY-MM-DD ') + "23:59:59";
        }
        var tmplhtml;
        app.index.performanceReport(data, employee.role).then(function(performanceInfoData) {
                memberData.performanceInfo = performanceInfoData;
                //计算业绩、提成、卡耗
                changePerformance(employee.role, memberData);
                memberData.employeeList = JSON.parse(sessionStorage.employeeList);
                if (employee.role == "wechat_business_normal") {
                    tmplhtml = $('#tmpl-index-normal-model').html();
                } else {
                    app.index.getOperatorStore(data);
                    tmplhtml = $('#tmpl-index-admin-model').html();
                }
                //修改html 的title
                app.changeTitle('业绩看板');
                resultTmpl = tmpl(tmplhtml, memberData);
                $('#tmpl-index').html(resultTmpl);
                initStoreList();
                initDate(memberData);
                initIndexCystomDate(memberData);
                if (memberData.employeeList.length > 1) {
                    initEemployee();
                    $('.index .employeeRoleList').show();
                    for (i in memberData.employeeList) {
                        if (memberData.employeeList[i].id == employee.id) {
                            $('.index #employeeList .employee_item').eq(i).append('<span class="active"><i class="ic">&#xe659;</i></span>');
                        }
                    }
                }
                if (memberData.performanceInfo.performanceY.length > 6) {
                    $('.achievementTotalAmount  .price').css('font-size', '12pt');
                }
                if (memberData.performanceInfo.currentMonthCommissionY.length > 6) {
                    $('.cardConsumeTotalAmount  .price').css('font-size', '12pt');
                }
                if (employee.storeList.length == 1) {
                    if (employee.role != "wechat_business_normal") {
                        $('.storeLists span:first').remove();
                    }
                    $('.index .storeList').find('.store_name').text(memberData.storeList[0].name);
                } else {
                    $('.allStore').show();
                }
                if (data.storeIds == employee.storeIds) {
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
                if (memberData.dataType == 4) {
                    $('.index  .dateList').css({ 'left': '39vw', 'font-size': '10pt' });
                }
                //日期名称
                $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
                $('.index .dateList').find('.date_name').text(getDateName(memberData.dataType, data));
                $('.index .storeList').find('.store_name').text(app.tools.sliceStr($('.index .storeList').find('.store_name').text(), 14));
            },
            function() {})
    },

    //业绩来源
    performanceSource: function() {
        var performance = {
            startDate: performanceInfo.startDate,
            endDate: performanceInfo.endDate,
            storeIds: performanceInfo.performanceStoreIds,
            dataType: performanceInfo.dataType,
        }
        window.localStorage.setItem("performanceInfo", JSON.stringify(performance));
        window.location.href = "/income.html#/income";
    },
    //获取业绩看板数据
    performanceReport: function(data, type) {
        if (type != "wechat_business_normal") {
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
    //获取员工信息
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
                    console.info(error);
                    reject(error);
                }
            });
        });
    },
    //绑定信息
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
    //获取员工门店列表
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
    //获取事件数量
    getOperatorStore: function(query) {
        app.api.operationLog.getOperatorStore({
            data: {
                "query": [{
                    "field": "merchantId",
                    "value": query.merchantId
                }, {
                    "field": "startTime",
                    "value": query.startDate
                }, {
                    "field": "endTime",
                    "value": query.endDate
                }, {
                    "field": "storeId",
                    "value": query.storeIds
                }],
                "sort": [{
                    "field": "operatorTime",
                    "sort": "desc"
                }],
                "page": 1,
                "size": 10000
            },
            success: function(results) {
                var recordCount = 0;
                if (results.code == "000000") {
                    if (results.data.length == 1) {
                        recordCount = results.data[0].recordCount;
                    } else {
                        for (var i = results.data.length - 1; i >= 0; i--) {
                            recordCount += results.data[i].recordCount;
                        }
                    }
                    $('.recordCount').text(recordCount);
                }
            },
            error: function() {}
        });
    }
}
