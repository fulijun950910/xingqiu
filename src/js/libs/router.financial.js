$(function() {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    var tpl_financial = {
        url: '/financial',
        render: function() {
            return $('#tpl_financial').html();
        },
        bind: function() {
            app.financial.init();
        }
    };
    var tpl_financial_info= {
        url: '/financial-info?:promotionInstanceId',
        render: function() {
            return $('#tpl_financial_info').html();
        },
        bind: function() {
            app.financial.info();
        }
    };


    router.push(tpl_financial).push(tpl_financial_info).init();


    // .init();

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
