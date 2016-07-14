$(function () {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    var tpl_sign = {
        url: '/sign',
        className: 'sign',
        render: function () {
            return $('#tpl_sign').html();
        },
        bind: function () {
            app.sign.init();
        }
    };

    router.push(tpl_sign).setDefault('/sign').init();

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
