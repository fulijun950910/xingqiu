$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    //预约列表
    var tpl_performance_booking_order_list = {
        url: '/booking-order-list',
        className: 'booking-order-list',
        render: function () {
            return $('#tpl_booking_order_list').html();
        },
        bind: function () {
            app.performance.booking.list();
        }
    }
    //预约详情
    var tpl_performance_booking_order_detail = {
        url: '/booking-order-detail',
        className: 'booking-order-detail',
        render: function () {
            return $('#tpl_booking_order_detail').html();
        },
        bind: function () {
            app.performance.booking.detail();
        }
    }
    //订单列表
    var tpl_performance_order_list = {
        url: '/order-list',
        className: 'order-list',
        render: function () {
            return $('#tpl_order_list').html();
        },
        bind: function () {
            app.performance.order.list();
        }
    }
    //订单详情
    var tpl_performance_order_detail = {
        url: '/order-detail',
        className: 'order-detail',
        render: function () {
            return $('#tpl_order_detail').html();
        },
        bind: function () {
            app.performance.order.detail();
        }
    }

    //业绩报告
    var performance_report={
        url: '/performance_report',
        className: 'performance_report',
        render: function () {
            return $('#tpl_performance_report').html();
        },
        bind: function () {
            $('#container').on('click', '#showActionSheet_store', function () {
                var mask = $('#mask_store');
                var weuiActionsheet = $('#weui_actionsheet_store');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .addClass('weui_fade_toggle').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                $('#actionsheet_cancel_store').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');

                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                }
            });
        }
    }

    //员工业绩
    var performance_emp={
        url: '/performance_emp',
        className: 'performance_emp',
        render: function () {
            return $('#tpl_performance_emp').html();
        },
        bind: function () {
           app.performance.emp.init();
        }
    }

    //员工排名
    var performance_rank={
        url: '/performance_rank',
        className: 'performance_rank',
        render: function () {
            return $('#tpl_performance_rank').html();
        },
        bind: function () {
             $('#container').on('click', '#showActionSheet_rank', function () {
                var mask = $('#mask_rank');
                var weuiActionsheet = $('#weui_actionsheet_rank');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                });
                $('#actionsheet_cancel_rank').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');

                function hideActionSheet(weuiActionsheet, mask) {
                    console.info(weuiActionsheet);

                    console.info(mask);
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                }
            });
        }
    }
          
    var tpl_performance_order_comment = {
        url: '/order-comment',
        className: 'order-comment',
        render: function () {
            return $('#tpl_order_comment').html();
        },
        bind: function () {
            app.performance.order.searchOrderComment();
        }
    }

    router.push(tpl_performance_booking_order_list)
        .push(tpl_performance_booking_order_detail)
        .push(tpl_performance_order_list)
        .push(tpl_performance_order_detail)
        .push(performance_report)
        .push(performance_emp)
        .push(performance_rank)
        .push(tpl_performance_order_comment)
        .init();


    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});
