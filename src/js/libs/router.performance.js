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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.performance.order.list("","init");
            //app.performance.order.scrollInit()
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
            //修复页面置顶效果
            window.scrollTo(0,0);
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
