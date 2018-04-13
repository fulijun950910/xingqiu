app.productEcharts = {
    echartsDate: {},
    productEchartsIdName: 'tmpl-product',
    initDate: function(type) {
        app.tools.initDate(type, app.productEcharts.productEchartsIdName);
        $('.product_echarts .dateLists .date_info').on('click', 'span', function(event) {
            $('.product_echarts .dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.product_echarts  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.productEcharts.echartsDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.productEcharts.reportShow(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.productEcharts.productEchartsIdName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.product_echarts  .mask').click();
            app.productEcharts.reportShow(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.productEcharts.productEchartsIdName);
        //点击切换门店
        $('.product_echarts .storeLists .stores').on('click', 'span', function(event) {
            $('.product_echarts .storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.product_echarts .storeLists .mask').click();
            app.productEcharts.reportShow($(this).attr('data-id'), 'storeIds');
        });
    },
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        app.productEcharts.userdata().then(function(userDate) {
            app.productEcharts.reportShow("", "init");
        }, function(error) {
            app.alert(error);
        });
    },
    //初始数据
    reportShow: function(data, type) {
        var employee = null;
        if (JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var results = {
            serviceItem: [],
            product: [],
            servicePackage: [],
            card: []
        };
        var query = {
            'merchantId': employee.merchantId
        };
        query.queryData = {
            itemSalesDetail: true
        }
        var storeIds = $('.storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            query.storeIds = $('.storeList .store_name').attr('data-storeId');
        } else {
            query.storeIds = employee.storeIds;
        }
        var dataType = $('.dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            query.dataType = $('.dateList .date_name').attr('data-type');
            app.tools.getDateType(query.dataType, data, app.productEcharts.echartsDate)
        } else {
            query.dataType = 1;
            query.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            query.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                query.storeIds = data;
                break;
            case 'date':
                app.tools.getDateType(data, query, app.productEcharts.echartsDate)
                query.dataType = data;
                break;
                //初始第一次页面
            case 'init':
                var employeeInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    employeeInfo = JSON.parse(localStorage.performanceInfo);
                    query.dataType = employeeInfo.dataType;
                }
                query.storeIds = employeeInfo.performanceStoreIds;
                //自定义
                if (employeeInfo.dataType == 4) {
                    query.startDate = employeeInfo.startDate;
                    query.endDate = employeeInfo.endDate;
                    app.productEcharts.echartsDate = {
                        startDate: query.startDate,
                        endDate: query.endDate
                    };
                } else {
                    app.tools.getDateType(employeeInfo.dataType, query, app.productEcharts.echartsDate)
                }
                break;
        }
        results.storeList = employee.storeList;
        results.storeIds = employee.storeIds;
        results.storeId = query.storeIds;
        //普通员工
        if (employee.role == "wechat_business_normal") {
            var tmplhtml = $('#tmpl-product-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-product').html(resultTmpl);
            $('.errorMessage').text('亲~您当前的权限还不能看数据哦~');
            app.tools.initSwiper(25);
            if (results.storeList && results.storeList.length > 1) {
                app.productEcharts.initStore();
            }
            return;
        }
        app.productEcharts.show(query).then(function(result) {
            for (var i = 0; i < result.data.itemSalesDetail.length; i++) {
                for (var j = i + 1; j < result.data.itemSalesDetail.length; j++) {
                    if (result.data.itemSalesDetail[i][2] + result.data.itemSalesDetail[i][3] > result.data.itemSalesDetail[j][2] + result.data.itemSalesDetail[j][3]) {
                        var itemA = result.data.itemSalesDetail.splice(i, 1)[0]
                        result.data.itemSalesDetail.splice(j, 0, itemA)
                        var itemB = result.data.itemSalesDetail.splice(j - 1, 1)[0]
                        result.data.itemSalesDetail.splice(i, 0, itemB)
                    }
                }
            }
            for (var i = result.data.itemSalesDetail.length - 1; i >= 0; i--) {
                switch (result.data.itemSalesDetail[i][0]) {
                    case 'SERVICE_ITEM':
                        results.serviceItem.push(result.data.itemSalesDetail[i]);
                        break;
                    case 'PRODUCT':
                        results.product.push(result.data.itemSalesDetail[i]);
                        break;
                    case 'SERVICE_PACKAGE':
                        results.servicePackage.push(result.data.itemSalesDetail[i]);
                        break;
                    default:
                        results.card.push(result.data.itemSalesDetail[i]);
                        break;
                }
            }
            var tooBarIndex = $('.tool-tab ul li.active').index(); //还原选中tab
            app.tools.changeTitle('品项数据分析');
            var tmplhtml = $('#tmpl-product-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-product').html(resultTmpl);
            app.tools.initSwiper(25);
            app.productEcharts.initDate(query.dataType); //初始化时间
            app.productEcharts.initStoreList(); //初始化门店
            app.productEcharts.initCystomDate(query.dataType); //初始化自定义时间
              $('.dateLists span').eq(parseInt(query.dataType) - 1).addClass('active');
            if (query.storeIds == results.storeIds) {
                $('.storeLists span:first').addClass('active').append('<i></i>');   //日期名称
            } else {
                for (var i = 0; i <= results.storeList.length - 1; i++) {
                    var storeId = results.storeList[i].id;
                    if (storeId == query.storeIds || storeId == parseInt(query.storeIds)) {
                        $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                        return;
                    }
                }
            }
            $('.tool-tab ul li').eq(tooBarIndex).click(); //还原选中tab
        }, function(error) {
            app.alert(error);
        });
    },
    show: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.echarts.reportShow({
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
