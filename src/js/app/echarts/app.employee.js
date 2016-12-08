app.employeeEcharts = {
    employeeIdName: "temp-employee",
    employeeDate: {},
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    initDate: function(type) {
        app.tools.initDate(type, app.employeeEcharts.employeeIdName);
        $('.employee_echarts .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.employee_echarts  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.employeeEcharts.employeeDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.employeeEcharts.orderEmployeePerformanceList(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.employeeEcharts.employeeIdName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.employee_echarts  .mask').click();
            app.employeeEcharts.orderEmployeePerformanceList(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.employeeEcharts.employeeIdName);
        //点击切换门店
        $('.employee_echarts .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.employee_echarts .storeLists .mask').click();
            app.employeeEcharts.orderEmployeePerformanceList(parseInt($(this).attr('data-id')), 'storeIds');
        });
    },
    initOrderByList: function() {
        app.tools.initTempData('orderLists', app.employeeEcharts.employeeIdName);
        //点击排序
        $('.employee_echarts .tempLists .date_info').on('click', 'span', function(event) {
            $('.tempLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.employee_echarts  .mask').click();
            app.employeeEcharts.orderEmployeePerformanceList(parseInt($(this).attr('data-type')), 'orderBy', $(this).attr('data-orderBy'));
        });
    },
    init: function() {
        app.employeeEcharts.userdata().then(function(userDate) {
            app.employeeEcharts.orderEmployeePerformanceList("", 'init');
        }, function() {})
    },
    //初始数据
    orderEmployeePerformanceList: function(data, type, byType) {
        var employee = null;
        var results = {};
        if (JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var orderPerformanceList = {
            'merchantId': employee.merchantId,
            'orderBy': 1, //1：按照业绩排序 2：按卡耗排序 3：按提成排序
            'orderByType': 'desc'
        };

        var storeIds = $('.employee_echarts .storeList .store_name').attr('data-storeId');
        orderPerformanceList.storeId = storeIds ? parseInt(storeIds) : employee.storeList[0].id
            //dataType
        var dataType = $('.employee_echarts .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            results.dataType = $('.employee_echarts .dateList .date_name').attr('data-type');
            app.tools.getDateType(results.dataType, orderPerformanceList, app.employeeEcharts.employeeDate)
        } else {
            results.dataType = 1;
            orderPerformanceList.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            orderPerformanceList.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        var orderBy = $('.employee_echarts .orderLists .date_name').attr('data-orderby');
        orderPerformanceList.orderBy = orderBy ? orderBy : 1;
        var orderByType = $('.employee_echarts .orderLists .date_name').attr('data-orderbyType');
        orderPerformanceList.orderByType = orderByType ? orderByType : 'desc';
        switch (type) {
            case 'storeIds':
                orderPerformanceList.storeId = data;
                break;
            case 'date':
                app.tools.getDateType(data, orderPerformanceList, app.employeeEcharts.employeeDate)
                results.dataType = data;
                break;
            case 'orderBy':
                orderPerformanceList.orderBy = data;
                orderPerformanceList.orderByType = byType;
                break;
                //初始第一次页面
            case 'init':
                var employeeInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    employeeInfo = JSON.parse(localStorage.performanceInfo);
                    results.dataType = employeeInfo.dataType;
                }
                orderPerformanceList.storeId = employeeInfo.performanceStoreIds.split(',').length == 1 ? employeeInfo.performanceStoreIds : employee.storeList[0].id;
                //自定义
                if (employeeInfo.dataType == 4) {
                    orderPerformanceList.startDate = employeeInfo.startDate;
                    orderPerformanceList.endDate = employeeInfo.endDate;
                    app.employeeEcharts.employeeDate = {
                        startDate: orderPerformanceList.startDate,
                        endDate: orderPerformanceList.endDate
                    };
                } else {
                    app.tools.getDateType(employeeInfo.dataType, orderPerformanceList, app.employeeEcharts.employeeDate)
                }
                break;
        }
        results.storeId = orderPerformanceList.storeId;
        results.storeList = employee.storeList;
        results.orderbyType = orderPerformanceList.orderByType;
        results.orderBy = orderPerformanceList.orderBy;
        app.tools.changeTitle('员工业绩分析');
        //普通员工
        if (employee.role == "wechat_business_normal") {
            var tmplhtml = $('#tmpl-employee-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-employee').html(resultTmpl);
            if (results.storeList && results.storeList.length > 1) {
                app.employeeEcharts.initStore();
            }
            $('.errorMessage').text('亲~您当前的权限还不能看数据哦~');
            return;
        }
        app.employeeEcharts.orderEmployeePerformance(orderPerformanceList).then(function(result) {
            results.orderEmployeePerformanceList = result.rows;
            var tmplhtml = $('#tmpl-employee-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-employee').html(resultTmpl);
            app.employeeEcharts.initDate(results.dataType);
            app.employeeEcharts.initStoreList();
            app.employeeEcharts.initCystomDate(results.dataType);
            app.employeeEcharts.initOrderByList();
            $('.employee_echarts .dateLists span').eq(parseInt(results.dataType) - 1).addClass('active');
            //业绩
            if (results.orderBy == 1) {
                if (results.orderbyType == "desc") {
                    $('.employee_echarts .tempLists span').eq(0).addClass('active');
                } else {
                    $('.employee_echarts .tempLists span').eq(1).addClass('active');
                }
            } else { //卡耗
                if (results.orderbyType == "desc") {
                    $('.employee_echarts .tempLists span').eq(2).addClass('active');
                } else {
                    $('.employee_echarts .tempLists span').eq(3).addClass('active');
                }
            }
            for (var i = 0; i <= results.storeList.length - 1; i++) {
                var storeId = results.storeList[i].id;
                if (storeId == orderPerformanceList.storeId || storeId == parseInt(orderPerformanceList.storeId)) {
                    $('.employee_echarts .storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                    return;
                }
            }


        }, function(error) {
            app.alert(error);
        });
    },
    orderEmployeePerformance: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.echarts.orderEmployeePerformanceList({
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
}
