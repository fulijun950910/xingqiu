$(function() {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    var tpl_index = {
        url: '/index',
        render: function() {
            return $('#tpl_index').html();
        },
        bind: function() {
            app.index.init();
        }
    };

    router.push(tpl_index).setDefault('/index').init();
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
