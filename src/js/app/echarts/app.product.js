function initSwiper() {
    var mySwiper = new Swiper('.swiper-container', {
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
}

app.productEcharts = {
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
            app.productEcharts.reportShow();
        }, function(error) {
            app.alert(error);
        });
    },
    //初始数据
    reportShow: function(data, type, dateType) {
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



        var date = $('.nowDate').text();
        if (date) {
            query.startDate = moment(date).format('YYYY-MM-DD hh:mm:ss');
            query.endDate = moment(date).subtract(0, "month").endOf("month").format('YYYY-MM-DD hh:mm:ss');
        } else {
            query.startDate = moment().startOf("month").format('YYYY-MM-DD hh:mm:ss');
            query.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
        }
        query.queryData = {
            itemSalesDetail: true
        }
        var storeId = $('.storeId').text();
        if (storeId) {
            query.storeIds = parseInt($('.storeId').text());;
        } else {
            if (employee.storeList.length > 0) {
                query.storeIds = employee.storeList[0].id;
            }
        }
        switch (type) {
            case 'startDate':
                query.startDate = moment(date).subtract(data, "month").startOf("month").format('YYYY-MM-DD hh:mm:ss')
                query.endDate = moment(date).subtract(data, "month").endOf("month").format('YYYY-MM-DD hh:mm:ss')
                break;
            case 'storeId':
                query.storeIds = data;
                break;
        }
        results.nowDate = moment(query.startDate).format('YYYY-MM');
        //获取门店
        for (var i = employee.storeList.length - 1; i >= 0; i--) {
            if (employee.storeList[i].id == query.storeIds) {
                results.storeName = employee.storeList[i].name;
                break;
            }
        }
        results.storeId = query.storeIds;
        results.storeList = employee.storeList;
        //普通员工
        if (employee.role == "wechat_business_normal") {
            var tmplhtml = $('#tmpl-product-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-product').html(resultTmpl);
            $('.errorMessage').text('亲~您当前的权限还不能看数据哦~');
            initSwiper();
            if (results.storeList && results.storeList.length > 1) {
                app.productEcharts.initStore();
            }
            return;
        }
        app.productEcharts.show(query).then(function(result) {
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
            var tmplhtml = $('#tmpl-product-model').html();
            var resultTmpl = tmpl(tmplhtml, results);
            $('#tmpl-product').html(resultTmpl);
            initSwiper();
            if (results.storeList && results.storeList.length > 1) {
                app.productEcharts.initStore();
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
            app.productEcharts.reportShow(storeid, "storeId");
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
