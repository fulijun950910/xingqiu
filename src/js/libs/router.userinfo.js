function init() {
    $('.userInfo').on('touchstart', '.clearUserName', function(event) {
        event.preventDefault();
        $('.userInfo').find('.username').val("");
    });
    $('.userInfo').on('touchstart', '.getPwd', function(event) {
        event.preventDefault();
        if ($('.userInfo').find('.password').attr('type') == "text") {
            $('.userInfo').find('.password').attr('type', 'password');
            $('.userInfo .getPwd').find('i').replaceWith('<i class="ic font-secondary-color">&#xe695;</i>');
        } else {
            $('.userInfo').find('.password').attr('type', 'text');
            $('.userInfo .getPwd').find('i').replaceWith('<i class="ic font-secondary-color">&#xe69d;</i>');
        }
    });
    // $('.userInfo').on('touchend', '.getPwd', function(event) {
    //     event.preventDefault();
    //     $('.userInfo').find('.password').attr('type', 'password');
    // });
};
function showPersonLogin(){
    if (!keyGetValue('openid')) {
        $('#personLogin').hide();
    }
}
$(function() {

    var routerUser = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    //个人信息
    var userinfo = {
        url: '/',
        className: 'user_home',
        render: function() {
            return $('#tpl_user_home').html();
        },
        bind: function() {
            app.userinfo.find();
        }
    };

    //找回密码
    var updatepwd = {
        url: '/update_pwd',
        className: 'update_pwd',
        render: function() {
            return $('#tpl_update_pwd').html();
        },
        bind: function() {
            init();
            app.tools.changeTitle('找回密码');
            // app.userinfo.updatepwd_init();
        }
    };

    //散客登录
    var personLogin = {
        url: '/person_login',
        className: 'person_login',
        render: function() {
            return $('#tpl_person_login').html();
        },
        bind: function() {
            app.tools.changeTitle('散客登录');
            init();
        }
    };

    //商户登录
    var login = {
        url: '/user_login',
        className: 'user_login',
        render: function() {
            return $('#tpl_user_login').html();
        },
        bind: function() {
            app.tools.changeTitle('商户登录');
            showPersonLogin();
            init();
            app.userinfo.initEvent();
            //缓存及cookie清理
            //localStorage.clear();
            //sessionStorage.clear();
        }
    };
    //修改用户信息
    var editUserInfo = {
        url: '/editUserInfo?:type',
        className: 'editUserInfo',
        render: function() {
            return $('#tpl_edit-userInfo').html();
        },
        bind: function() {
            app.tools.changeTitle('修改个人信息');
            app.userinfo.editUserInfo();
        }
    }

    routerUser.push(userinfo)
        .push(updatepwd)
        .push(personLogin)
        .push(login)
        .push(editUserInfo)
        .setDefault('/').init();


    // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
    // 相关 issue: https://github.com/weui/weui/issues/15
    // 解决方法:
    // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
    // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
    //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
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
