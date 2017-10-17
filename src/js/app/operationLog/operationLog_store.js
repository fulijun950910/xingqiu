app.operationLog = {
    operationLogStoreIdName: "temp-operationLogStore",
    operationLogDetailName: "temp-operationLogDetail",
    operationLogDate: {},
    initDate: function(dateType, idName) {
        app.tools.initDate(dateType, idName);
        $('.operaLog .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            // $(this).addClass('active');
            $('.operaLog  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.operationLog.operationLogDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.operationLog.querystore(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(dateType, idName) {
        app.tools.initCystomDate(dateType, idName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.operaLog  .mask').click();
            app.operationLog.querystore(4, 'date');
        });
    },
    initStoreList: function(idName) {
        app.tools.initStoreList(idName);
        //点击切换门店
        $('.operaLog .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.operaLog .storeLists .mask').click();
            app.operationLog.querystore($(this).attr('data-id'), 'storeIds');
        });
    },
    querystore: function(result, type) {
        var newoperaLog = {
            storeIds: employee.storeIds,
            storeList: employee.storeList
        };
        var query = {};
        var storeIds = $('.operaLog .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            newoperaLog.storeId = $('.operaLog .storeList .store_name').attr('data-storeId');
            query.storeIds = $('.operaLog .storeList .store_name').attr('data-storeId');
        } else {
            newoperaLog.storeId = employee.storeIds;
            query.storeIds = employee.storeIds;
        }
        var dateType = $('.operaLog .dateList .date_name').attr('data-type');
        if (dateType && dateType.trim()) {
            newoperaLog.dateType = $('.operaLog .dateList .date_name').attr('data-type');
            app.tools.getDateType(parseInt(newoperaLog.dateType), query, app.operationLog.operationLogDate);
        } else {
            newoperaLog.dateType = 1;
            query.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            query.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                query.storeIds = result;
                newoperaLog.storeId = result;
                break;
            case 'date':
                app.tools.getDateType(parseInt(result), query, app.operationLog.operationLogDate)
                newoperaLog.dateType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                    newoperaLog.dateType = performanceInfo.dataType;
                }
                query.storeIds = performanceInfo.performanceStoreIds.split(',').length == 1 ? performanceInfo.performanceStoreIds : '-1';
                //自定义
                if (performanceInfo.dataType == 4) {
                    query.startDate = performanceInfo.startDate;
                    query.endDate = performanceInfo.endDate;
                    app.operationLog.operationLogDate = {
                        startDate: query.startDate,
                        endDate: query.endDate
                    };
                } else {
                    app.tools.getDateType(performanceInfo.dataType, query, app.operationLog.operationLogDate);
                }
                break;
        }
        var queryData = [{
            "field": "merchantId",
            "value": app.operationLog.employee.merchant.id
        }, {
            "field": "startTime",
            // "value": app.operationLog.date + " 00:00:00"
            "value": query.startDate
        }, {
            "field": "endTime",
            //"value": app.operationLog.date + " 23:59:59"
            "value": query.endDate
        }]
        if (query.storeIds>0) {
            queryData.push({
                "field": "storeId",
                "value": query.storeIds
                //  "value": app.operationLog.employee.storeIds
            })
        }

        app.startLoading();
        app.api.operationLog.getOperatorDetail({
            data: {
                "query": queryData,
                "sort": [{
                    "field": "operatorTime",
                    "sort": "desc"
                }],
                "page": 1,
                "size": 10000
            },
            success: function(res) {
                newoperaLog.operationInfo = res.data;
                app.endLoading();

                var html = $('#tmpl-operationLogDetail').html();
                var template = tmpl(html, newoperaLog);
                $('#tpl-operationLogDetail').html(template);

                app.operationLog.initStoreList(app.operationLog.operationLogStoreIdName);
                app.operationLog.initDate(newoperaLog.dateType, app.operationLog.operationLogStoreIdName);
                app.operationLog.initCystomDate(newoperaLog.dateType, app.operationLog.operationLogStoreIdName);
                if (query.storeIds <=0) {
                    $('.storeLists span:first').addClass('active').append('<i></i>');
                } else {
                    for (var i = 0; i <= newoperaLog.storeList.length - 1; i++) {
                        var storeIds = newoperaLog.storeList[i].id;
                        if (storeIds == query.storeIds || storeIds == parseInt(query.storeIds)) {
                            $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                            break;
                        }
                    }
                }
                $('.dateLists span').eq(parseInt(newoperaLog.dateType) - 1).addClass('active');
            },
            error: function(err) {
                console.log(err);
                app.endLoading();
            }
        })
    },
    queryDetail: function(type) {
        var query = {};
        if (type == "init") {
            if (localStorage.queryInfo && JSON.parse(localStorage.queryInfo)) {
                queryInfo = JSON.parse(localStorage.queryInfo);
                query.dateType = queryInfo.dateType;
            }
            query.dateType = queryInfo.dateType;
            if (queryInfo.dateType == 4) {
                query.startDate = queryInfo.startTime;
                query.endDate = queryInfo.endTime;
                app.operationLog.operationLogDate = {
                    startDate: query.startDate,
                    endDate: query.endDate
                };
            } else {
                app.tools.getDateType(query.dateType, query, app.operationLog.operationLogDate)
            }
        } else {
            query.dateType = type ? type : 1;
            app.tools.getDateType(query.dateType, query, app.operationLog.operationLogDate)
        }
        app.startLoading();
        app.api.operationLog.getOperatorDetail({
            data: {
                "query": [{
                    "field": "merchantId",
                    "value": app.operationLog.employee.merchant.id
                }, {
                    "field": "startTime",
                    "value": query.startDate
                        // "value": queryInfo.date + " 00:00:00"
                }, {
                    "field": "endTime",
                    "value": query.endDate
                        //"value": queryInfo.date + " 23:59:59"
                }, {
                    "field": "storeId",
                    "value": app.operationLog.storeId
                }],
                "sort": [{
                    "field": "operatorTime",
                    "sort": "desc"
                }],
                "page": 1,
                "size": 10000
            },
            success: function(res) {
                app.endLoading();
                app.tools.changeTitle('系统事件记录详情');
                var html = $('#tmpl-operationLogDetail').html();
                var template = tmpl(html, res.data);
                $('#tpl-operationLogDetail').html(template);
                app.tools.initSwiper(25);
                app.operationLog.initDate(query.dateType, app.operationLog.operationLogDetailName);
                app.operationLog.initCystomDate(query.dateType, app.operationLog.operationLogDetailName);
                $('.dateLists span').eq(parseInt(query.dateType) - 1).addClass('active');
            },
            error: function() {}
        })
    },
    goUser: function() {
        localStorage.clear();
        location.href = "/userinfo.html#/user_login";
        return;
    },
    goReport: function() {
        location.href = "/main.html#/index";
    },
    goDetail: function(storeid) {
        app.operationLog.storeId = storeid;
        location.hash = "/operationLog_detail";
        return;
    },
    init: function() {
        app.operationLog.employee = localStorage.getItem("employee");
        if (app.operationLog.employee) {
            app.operationLog.employee = JSON.parse(app.operationLog.employee);
            var employee = app.operationLog.employee;
            if (!app.operationLog.employee.merchant) {
                app.operationLog.goUser();
                return;
            }
            if (employee.role != app.constant.WECHAT_BUSINESS[0].code && employee.role != app.constant.WECHAT_BUSINESS[1].code) {
                app.operationLog.goReport();
                return;
            }
            //start
            app.operationLog.querystore("", 'init');
        } else {
            app.operationLog.goUser();
        }
    }
}

app.changeDetail = {
    getIncomeInfo: function() {
        app.startLoading();
        app.api.operationLog.getIncomeInfo({
            data: {
                merchantId: keyGetValue("merchantId"),
                employeeId: keyGetValue("employeeId"),
                exchangeWorkId: keyGetValue("exchangeWorkId"),
                storeId: keyGetValue("storeId")
            },
            success: function(res) {
                app.endLoading();
                if (res.success) {
                    var data = {};
                    data.tmpl = app.changeDetail.businessDataFormat(res.data);
                    data.currentRemainCash = app.tools.toThousands(res.data.currentRemainCash);
                    data.lastRemainDate = res.data.lastRemainDate;
                    data.merchantName = res.data.merchantName;
                    data.employeeName = res.data.employeeName;
                    data.storeName = res.data.storeName;
                    var html = $('#tmpl-changeDetail').html();
                    var template = tmpl(html, data);
                    $('#tpl-changeDetail').html(template);
                }
            },
            error: function() {
                app.operationLog.goReport();
            }
        })
    },
    businessDataFormat: function(data) {
        var self = [];

        self = [{
            name: "收入金额统计",
            rows: [
                { name: "现金收入", value: '￥' + app.tools.toThousands(data.cash) },
                { name: "POS收入", value: '￥' + app.tools.toThousands(data.pos) },
                { name: "团购收入", value: '￥' + app.tools.toThousands(data.groupPurchase) },
                { name: "微信收入", value: '￥' + app.tools.toThousands(data.weixin) },
                { name: "支付宝收入", value: '￥' + app.tools.toThousands(data.alipay) },
                { name: "赠送", value: '￥' + app.tools.toThousands(data.allPresent) },
                { name: "会员卡耗", value: '￥' + app.tools.toThousands(data.allCardMoney) },
                { name: "退款", value: '￥' + app.tools.toThousands(data.allReturnMoney) },
                { name: "减免金额", value: '￥' + app.tools.toThousands(data.reduceMoney) },
                { name: "欠款金额", value: '￥' + app.tools.toThousands(data.unPayMoney) },
            ]
        }, {
            name: "收入来源统计",
            rows: [
                { name: "项目收入", value: '￥' + app.tools.toThousands(data.itemIncome) },
                { name: "开卡收入", value: '￥' + app.tools.toThousands(data.cardIncome) },
                { name: "套餐收入", value: '￥' + app.tools.toThousands(data.itemPackageIncome) },
                { name: "产品收入", value: '￥' + app.tools.toThousands(data.productIncome) },
                { name: "充值收入", value: '￥' + app.tools.toThousands(data.rechargeIncome) },
                { name: "附加费", value: '￥' + app.tools.toThousands(data.otherIncome) },
            ]
        }, {
            name: "客次客数统计",
            rows: [
                { name: "客次", value: data.allCustomer + '人' },
                { name: "客数", value: data.personCount + '人' },
                { name: "会员客次", value: data.allMemberCustomer + '人' },
                { name: "散客客次", value: data.allCustomer - data.allMemberCustomer + '人' },
                { name: "新增会员持卡", value: data.newMemberHasCard + '张' },
                { name: "新增会员无卡", value: data.newMemberNoCard + '张' },
            ]
        }, {
            name: "收入来源分析",
            rows: [
                { name: "项目数量", value: data.itemCounts + '个' },
                { name: "开卡张数", value: data.cardCounts + '张' },
                { name: "商品卖量", value: data.productCounts + '例' },
                { name: "套餐卖量", value: data.itemPackageCounts + '个' },
                { name: "待付款单数", value: data.waitPayOrderCounts + '单' },
                { name: "已付款单数", value: data.paidOrderCounts + '单' },
                { name: "欠款单数", value: data.unPayOrderCounts + '单' },
                // { name: "总客数", value: data.allConsumerCounts + '人' },
            ]
        }];
        // 自定义支付方式
        var tempRepairCousomPayMethodList = [];
        if ($.isArray(data.exchangeWorkExtList)) {
            for (var i = 0; i < data.exchangeWorkExtList.length; i++) {
                var tempPayMethod = data.exchangeWorkExtList[i];
                if (tempPayMethod.repair && tempPayMethod.payMoney) {
                    tempRepairCousomPayMethodList.push({
                        name: tempPayMethod.payMethodName,
                        value: '￥' + app.tools.toThousands(tempPayMethod.payMoney)
                    })
                } else {
                    self[0].rows.push({
                        name: tempPayMethod.payMethodName,
                        value: '￥' + app.tools.toThousands(tempPayMethod.payMoney)
                    })
                }

            }
        }


        var tempRepairData = {
            name: "历史变更数据",
            rows: []
        };
        // 动态历史变更数据
        var list = [
            { key: 'repairCash', name: '现金' },
            { key: 'repairPos', name: 'POS' },
            { key: 'repairGroupPurchase', name: '团购' },
            { key: 'repairWeixin', name: '微信' },
            { key: 'repairAlipay', name: '支付宝' },
            { key: 'repairAllPresent', name: '赠送' },
            { key: 'repairAllCardMoney', name: '卡耗' },
            { key: 'repairAllReturnMoney', name: '退款' },
            { key: 'repairReduceMoney', name: '减免' },
            { key: 'repairUnPayMoney', name: '欠款' }
        ];

        for (var i = 0; i < list.length; i++) {
            var value = list[i];
            if (data[value.key]) {
                tempRepairData.rows.push({
                    name: value.name,
                    value: '￥' + app.tools.toThousands(data[value.key])
                })
            }
        }

        if (tempRepairCousomPayMethodList.length) {
            tempRepairData.rows = tempRepairData.rows.concat(tempRepairCousomPayMethodList);
        }
        self.push(tempRepairData);
        return self;
    }

}
