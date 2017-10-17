$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    //预约列表
    var tpl_operationLog_detail = {
        url: '/operationLog_detail',
        className: 'operationLog_detail',
        render: function () {
            return $('#tpl_operationLog_detail').html();
        },
        bind: function () {
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.operationLog.init();
        }
    }

    router.push(tpl_operationLog_detail)
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
