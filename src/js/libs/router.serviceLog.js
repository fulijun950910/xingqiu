$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });
    //小计列表
    var tpl_serviceLog_list = {
        url: '/serviceLog_list',
        className: 'serviceLog_list',
        render: function () {
            return $('#tpl_serviceLog_list').html();
        },
        bind: function () {
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.serviceLog.initList();
        }
    };
    //小计详情
    var tpl_serviceLog_detail = {
        url: '/serviceLog_detail',
        className: 'serviceLog_detail',
        render: function () {
            return $('#tpl_serviceLog_detail').html();
        },
        bind: function () {
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.serviceLog.initDetail();
        }
    };
    //搜索
    var tpl_serviceLog_search = {
        url: '/serviceLog_search',
        className: 'serviceLog_search',
        render: function () {
            return $('#tpl_serviceLog_search').html();
        },
        bind: function () {
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.serviceLog.initSearchQuery();
        }
    };
    //搜索
    var tpl_member_detail = {
        url: '/member_detail',
        className: 'member_detail',
        render: function () {
            return $('#tpl_member_detail').html();
        },
        bind: function () {
            //修复页面置顶效果
            window.scrollTo(0,0);
            app.serviceLog.initmemberDetail();

            document.title = "客户详情";
            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
            $iframe.on('load', function() {
                setTimeout(function() {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo($("body"));
        }
    };

    router.push(tpl_serviceLog_list)
        .push(tpl_serviceLog_detail)
        .push(tpl_serviceLog_search)
        .push(tpl_member_detail)
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
