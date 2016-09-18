$(function () {

    var routerUser = new Router({
        container: '#container',    
        enterTimeout: 250,
        leaveTimeout: 250
    });

    //个人信息
    var userinfo = {
        url: '/',
        className: 'user_home',
        render: function () {
            return $('#tpl_user_home').html();
        },
        bind: function(){
            app.userinfo.find();
        }
    };

    //修改密码
    var updatepwd={
        url:'/update_pwd',
        className:'update_pwd',
        render: function () {
            return $('#tpl_update_pwd').html();
        },
        bind: function(){
            app.userinfo.updatepwd_init();
        }
    }

    //登陆
    var login={
        url:'/user_login',
        className:'user_login',
        render: function () {
            return $('#tpl_user_login').html();
        },
        bind: function(){
            //缓存及cookie清理
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    routerUser.push(userinfo)
    .push(updatepwd)
    .push(login)
    .setDefault('/').init();


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
