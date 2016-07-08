$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

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
