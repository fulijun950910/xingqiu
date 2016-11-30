//初始化日期
app.financial = {
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    //初始化活动数据
    init: function() {
        app.financial.userdata().then(function() {
            app.financial.getfinancialSourceInfo();
        }, function() {})
    },
    //初始化活动营销数据
    info: function() {
        app.financial.userdata().then(function() {
            app.financial.getWxPromotionStatisticsInfo();
        }, function() {})
    },
    //微信详情
    financialInfo: function(promotionInstanceId) {
        window.location.href = "/wechat-financial.html#/financial-info?promotionInstanceId=" + promotionInstanceId;
    },
    //活动营销数据
    getWxPromotionStatisticsInfo: function(status) {
        var promotionInstanceId = window.location.hash.substr(window.location.hash.indexOf('=') + 1);
        var data = {
            'merchantId': employee.merchantId,
            'status': status ? status : undefined,
            promotionInstanceId: promotionInstanceId ? parseInt(promotionInstanceId) : undefined
        }
        app.financial.getWxPromotionDetails(data).then(function(financialInfoDetails) {
                var data = {
                    financialInfoDetails: financialInfoDetails,
                    ticketStatus: app.constant.TICKET_STATUS
                };
                var tmplhtml = $('#tmpl-financial-info-model').html();
                var resultTmpl = tmpl(tmplhtml, data);
                $('#tmpl-financial-info').html(resultTmpl);
            },
            function() {})
    },
    //活动详情
    getfinancialSourceInfo: function(status) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var data = {
            'merchantId': employee.merchantId,
            'status': status ? status : undefined,
            'page': 1,
            'size': 1000
        }
        app.financial.getWxPromotionStatistics(data).then(function(financialInfoData) {
                var data = {
                    financialInfoData: financialInfoData.list,
                    tgList: [], //团拼
                    fxList: [], //分享
                    dzpList: [], //大转盘
                    promotionStatus: app.constant.PROMOTION_TYPE
                };
                for (var i = financialInfoData.list.length - 1; i >= 0; i--) {
                    switch (financialInfoData.list[i].type) {
                        //团拼
                        case 'at_tg':
                            data.tgList.push(financialInfoData.list[i]);
                            break;
                            //分享
                        case 'at_fx':
                            data.fxList.push(financialInfoData.list[i]);
                            break;
                            //大转盘
                        case 'at_dzp':
                            data.dzpList.push(financialInfoData.list[i]);
                            break;
                    }
                }
                var tmplhtml = $('#tmpl-financial-model').html();
                var resultTmpl = tmpl(tmplhtml, data);
                $('#tmpl-financial').html(resultTmpl);
                app.tools.initSwiper();
                app.tools.initDate();
                $('#dateList').on('click', 'span', function(event) {
                    $('#dateList span').removeClass('active');
                    $('#dateList  .mask').click();
                    $(this).addClass('active');
                    app.financial.getfinancialSourceInfo($(this).attr('data-type'));
                });
                for (var i = data.promotionStatus.length - 1; i >= 0; i--) {
                    if (data.promotionStatus[i].code == status) {
                        $('#dateList span').eq(i).addClass('active');
                        return;
                    }
                }

            },
            function() {})
    },
    //获取活动详情
    getWxPromotionStatistics: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.financial.getWxPromotionStatistics({
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
    },
    //获取活动营销数据
    getWxPromotionDetails: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.financial.getWxPromotionDetails({
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
    },
}
