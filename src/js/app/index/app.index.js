//初始化身份切换
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
        if($(this).attr('data-disabled')){
            return;
        }
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
    $('.index #employeeList .employee_item').attr('data-userId', '');
    $('.index #employeeList .employee_item').attr('data-employeeId', '');
    $('.index #employeeList .employee_item').attr('data-merchantId', '');
};

//初始化日期
app.index = {
    indexDate: {},
    indexIdName: "tepm-index",
    userdata: function() {
        //初始化用户信息
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
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.index  .mask').click();
            app.index.performance(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.index.indexIdName);
        //点击切换门店
        $('.index .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.index .storeLists .mask').click();
            app.index.performance($(this).attr('data-id'), 'storeIds');
        });
    },
    init: function() {
        window.localStorage.setItem("performanceInfo", "");
        window.sessionStorage.setItem('employeeList', "");
        initData();
        if (!localStorage.employee || !JSON.parse(localStorage.employee)) {
            location.href = "/userinfo.html#/user_login";
        }
        if (JSON.parse(localStorage.employee).merchant&&JSON.parse(localStorage.employee).merchant.functionVersion==4){
            location.href = "/lite/index.html";
        }
        app.index.userdata().then(function(userDate) {
            if (!sessionStorage.getItem("employeeList")) {
                var userInfo = {
                    userId: JSON.parse(localStorage.employee).userId
                };
                app.userinfo.getMerchanntList(userInfo).then(function(employeeList) {
                    window.sessionStorage.setItem('employeeList', JSON.stringify(employeeList.data));
                    app.index.performance();
                }, function() {
                    //失败重新登录
                    location.href = "/userinfo.html#/user_login";
                })
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
            app.tools.getDateType(memberData.dataType, data, app.index.indexDate);
        } else {
            memberData.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD ') + "23:59:59";
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
        //缓存筛选条件
        var performanceInfo = {
            startDate: data.startDate,
            endDate: data.endDate,
            performanceStoreIds: data.storeIds,
            dataType: memberData.dataType
        };
        window.localStorage.setItem("performanceInfo", JSON.stringify(performanceInfo));
        data.storeId = parseInt(data.storeIds);
        var tmplhtml;
        app.index.performanceReport(data, employee.role).then(function(performanceInfoData) {
                memberData.performanceInfo = performanceInfoData;
                //计算业绩、提成、卡耗
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
                app.index.initStoreList();
                app.index.initDate(memberData.dataType);
                app.index.initCystomDate(memberData.dataType);
                app.index.showGroupTotal();// 显示干预团

                if (memberData.employeeList.length > 1) {
                    initEemployee();
                    $('.index .employeeRoleList').show();
                    for (i in memberData.employeeList) {
                        if (memberData.employeeList[i].id == employee.id) {
                            $('.index #employeeList .employee_item').eq(i).append('<span class="active"><i class="ic">&#xe659;</i></span>');
                            break;
                        }
                    }
                }
                //业绩、
                if ((memberData.performanceInfo.income + "").length > 6 || (memberData.performanceInfo.cardConsume + "").length > 6) {
                    $('.achievementTotalAmount  .price').css('font-size', '6vw');
                    $('.cardConsumeTotalAmount  .price').css('font-size', '6vw');
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
                    $('.index  .dateList').css({ 'left': '39vw', 'font-size': '.9rem' });
                }
                //日期名称
                $('.dateLists span').eq(parseInt(memberData.dataType) - 1).addClass('active');
                $('.index .dateList').find('.date_name').text(app.tools.getDateName(memberData.dataType, data));
                $('.index .storeList').find('.store_name').text(app.tools.sliceStr($('.index .storeList').find('.store_name').text(), 14));
            },
            function() {
                location.href = "/userinfo.html#/user_login";
            })
    },
    //产看可干预团数
    showGroupTotal: function(){
        app.api.index.queryGroupTotal({
            data: employee.merchantId,
            success: function(res) {
                if(res &&res.success){
                    $('#groupTotal').html(res.data);
                }
            },
            error: function(error) {
            }
        });
        app.api.index.promotionCustomerBuy({
            data: employee.merchantId,
            success: function(res) {
                if(res &&res.success && res.data){
                    var str='';
                    for(var i=0;i<res.data.length; i++){
                        str+='<img style="height:2rem;width: 2rem;border-radius: 50%;vertical-align:middle" src=\''+app.filePath+res.data[i].avatarFileId+'\' onerror="this.src=\'images/default_female.png\'"/>&nbsp;&nbsp;又一个客户'+res.data[i].nickName+'购买了你的服务,'+ res.data[i].price / 100+'元'+'&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'
                    }

                    $('#promotionCustomerBuy').html(str);
                }
            },
            error: function(error) {
            }
        });
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
                    //失败重新登录
                    location.href = "/userinfo.html#/user_login";
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
