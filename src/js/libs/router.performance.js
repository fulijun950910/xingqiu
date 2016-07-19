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
            app.performance.appointment.list();
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
            app.performance.appointment.detail();
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
            app.performance.manageReport_init();
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
            app.performance.rank.init();
        }
    }
    //订单评价  
    var tpl_performance_order_comment = {
        url: '/order-comment',
        className: 'order-comment',
        render: function () {
            return $('#tpl_order_comment').html();
        },
        bind: function () {
            app.performance.order.orderComment();
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
