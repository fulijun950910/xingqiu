$(function() {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    //新增会员
    var tpl_newMember = {
        url: '/newMember',
        render: function() {
            return $('#tpl_newMember').html();
        },
        bind: function() {
         //   app.memberEcharts.init();
        }
    };
    //到店会员
    var tpl_arrivalMember = {
        url: '/arrivalMember',
        render: function() {
            return $('#tpl_arrivalMember').html();
        },
        bind: function() {
           // app.employeeEcharts.init();
        }
    };

    router.push(tpl_newMember)
        .push(tpl_arrivalMember)
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
