$(function() {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    //会员信息统计
    var tpl_member = {
        url: '/echartsMember',
        render: function() {
            return $('#tpl_member').html();
        },
        bind: function() {
            app.memberEcharts.init();
        }
    };
    //员工信息统计
    var tpl_employee = {
        url: '/echartsEmployee',
        render: function() {
            return $('#tpl_employee').html();
        },
        bind: function() {
            app.employeeEcharts.init();
        }
    };
    //品项信息统计
    var tpl_product = {
        url: '/echartsProduct',
        render: function() {
            return $('#tpl_product').html();
        },
        bind: function() {
            app.productEcharts.init();
        }
    };
    router.push(tpl_member)
        .push(tpl_employee)
        .push(tpl_product)
        .init();

    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function() {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function() {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});
