//初始化日期
app.financial = {
    initSwiper: function() {
        var mySwiper = new Swiper('.swiper-container', {
            autoHeight: true,
            onSlideChangeEnd: function(swiper) {
                var j = mySwiper.activeIndex;
                $('.line-animation').css('left', j * 25 + 'vw');
                $('.line').addClass('line-animation');
                $('.tool-tab li').removeClass('active');
                $('.tool-tab li').eq(j).addClass('active');
                mySwiper.slideTo(i, 1000, false);
            }
        });
        $('.tool-tab').on('click', 'li', function(e) {
            //取消事件的默认动作。
            e.preventDefault();
            //得到当前索引
            var i = $(this).index();
            mySwiper.slideTo(i, 1000, false);
            $('.line-animation').css('left', i * 25 + 'vw');
            $('.line').addClass('line-animation');
            $('.tool-tab li').removeClass('active');
            $(this).addClass('active');
            mySwiper.slideTo(i, 1000, false);
        });
    },
    //初始化时间切换
    initDate: function() {
        $('.breadCrumbs').on('click', '.dateList ', function() {
            $('#dateList').fadeIn(200);
            $('#dateList .mask').addClass('mask_show');
            $('#dateList .date_menu').addClass('date_menu_active');
            $('#dateList .mask').height($('.bd').height());
            //判断是否有选中active
            if (!$('#dateList span').hasClass('active')) {
                $('#dateList span:first').addClass('active');
            }
        });
        //取消
        $('#dateList').on('click', '.mask', function() {
            $('.date_menu').removeClass('date_menu_active');
            $('.mask').removeClass('mask_show');
        });
        //点击切换
        $('#dateList').on('click', 'span', function(event) {
            $('#dateList span').removeClass('active');
            $('#dateList  .mask').click();
            $(this).addClass('active');
            app.financial.getfinancialSourceInfo($(this).attr('data-type'));
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
                    TICKET_STATUS: app.constant.TICKET_STATUS
                };
                var tmplhtml = $('#tmpl-financial-info-model').html();
                var resultTmpl = tmpl(tmplhtml, data);
                $('#tmpl-financial-info').html(resultTmpl);
               // app.financial.initDate();
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
                app.financial.initSwiper();
                app.financial.initDate();
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
