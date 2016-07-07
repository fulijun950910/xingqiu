app.userbind={
	init:function(){
		
	}
}

//添加个人信息路由配置
$(function(){

	var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

	var user_home = {
        url: '/',
        className: 'user_home',
        render: function () {
            return $('#tpl_user_home').html();
        },
        bind:function(){
        	app.userbind.init();
        }
    };

    router.push(user_home) 
    //.push(button)
    .setDefault('/')
    .init();

});