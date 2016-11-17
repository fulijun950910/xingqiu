app.employeeEcharts = {
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        app.employeeEcharts.userdata().then(function(userDate) {
            app.employeeEcharts.orderEmployeePerformanceList();
        }, function() {})
    },
    //初始数据
    orderEmployeePerformanceList: function(data, type, dateType) {
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
        var date = $('.nowDate').text();
        if (date) {
            orderPerformanceList.startDate = moment(date).subtract(0, "month").startOf("month").format('YYYY-MM-DD hh:mm:ss')
            orderPerformanceList.endDate = moment(date).subtract(0, "month").endOf("month").format('YYYY-MM-DD hh:mm:ss')
        } else {
            orderPerformanceList.startDate = moment().startOf("month").format('YYYY-MM-DD hh:mm:ss');
            orderPerformanceList.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
        }
        var storeId = $('.storeId').text();
        if (storeId) {
            orderPerformanceList.storeId = parseInt($('.storeId').text());;
        } else {
            if (employee.storeList.length > 0) {
                orderPerformanceList.storeId = employee.storeList[0].id;
            }
        }
        switch (type) {
            case 'orderBy':
                if ($('.orderBy-' + data).find('.asc').is(':hidden')) {　　 //如果node是隐藏的则显示node元素，否则隐藏
                    orderPerformanceList.orderByType = 'desc';
                } else {　　
                    orderPerformanceList.orderByType = 'asc';
                }
                orderPerformanceList.orderBy = data;
                break;
            case 'startDate':

                orderPerformanceList.startDate = moment(date).subtract(data, "month").startOf("month").format('YYYY-MM-DD hh:mm:ss')
                orderPerformanceList.endDate = moment(date).subtract(data, "month").endOf("month").format('YYYY-MM-DD hh:mm:ss')
                break;
            case 'storeId':
                orderPerformanceList.storeId = data;
                break;
        }
        //获取门店
        for (var i = employee.storeList.length - 1; i >= 0; i--) {
            if (employee.storeList[i].id == orderPerformanceList.storeId) {
                results.storeName = employee.storeList[i].name;
                break;
            }
        }
        results.storeId = orderPerformanceList.storeId;
        results.storeList = employee.storeList;
        results.nowDate = moment(orderPerformanceList.startDate).format('YYYY-MM');
        //普通员工
        if (employee.role == "wechat_business_normal") {
            var tmplhtml = $('#tmpl-employee-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-employee').html(resultTmpl);
            if (results.storeList && results.storeList.length > 1) {
                app.employeeEcharts.initStore();
            }
            $('.errorMessage').text('亲~您当前的权限还不能看数据哦~');
            initSwiper();
            return;
        }
        app.employeeEcharts.orderEmployeePerformance(orderPerformanceList).then(function(result) {
            results.orderEmployeePerformanceList = result.rows;
            var tmplhtml = $('#tmpl-employee-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-employee').html(resultTmpl);
            if (orderPerformanceList.orderByType == 'asc') {
                $('.orderBy-' + data).find('.asc').hide();
                $('.orderBy-' + data).find('.desc').show();
            } else {　　
                $('.orderBy-' + data).find('.asc').show();
                $('.orderBy-' + data).find('.desc').hide();
            }
            if (results.storeList && results.storeList.length > 1) {
                app.employeeEcharts.initStore();
            }
        }, function(error) {
            app.alert(error);
        });
    },
    initStore: function() {
        //处理门店选择
        $('#storeRankSheet').on('click', '.weui_actionsheet_cell', function() {
            //获取门店ID;
            var storeid = parseInt($(this).attr('name'));
            $('#actionsheet_cancel_rank').click();
            //获取数据
            app.employeeEcharts.orderEmployeePerformanceList(storeid, "storeId");
            $('#showActionSheet_rank').show();
        });
        //初始化页面选择门店事件
        $('#container').on('click', '#showActionSheet_rank', function() {
            var mask = $('#mask_rank');
            var weuiActionsheet = $('#weui_actionsheet_rank');
            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show()
                .addClass('weui_fade_toggle').one('click', function() {
                    hideActionSheet(weuiActionsheet, mask);
                });
            $('#actionsheet_cancel_rank').one('click', function() {
                hideActionSheet(weuiActionsheet, mask);
            });
            mask.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                mask.on('transitionend', function() {
                    mask.hide();
                }).on('webkitTransitionEnd', function() {
                    mask.hide();
                })
            }
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
