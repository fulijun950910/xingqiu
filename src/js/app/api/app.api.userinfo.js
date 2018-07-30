/**
 * Created by wzc on 16/7/11.
 */
app.api.userinfo = {
    auth: function(settings) {
        app.api.ajax({
            url: '/auth/form',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    authUser: function(settings) {
        app.api.ajax({
            url: '/authUser/exist/' + settings.data.username,
            type: 'GET',
            success: settings.success,
            error: settings.error
        });
    },
    captcha: function(settings) {
        var url = '';
        if (settings.data.type) {
            url = '/auth/captcha/' + settings.data.username + '/' + settings.data.type;
        } else {
            url = '/auth/captcha/' + settings.data.username;
        }
        app.api.ajax({
            url: url,
            type: 'GET',
            success: settings.success,
            error: settings.error
        });
    },
    authUserValidate: function(settings) {
        app.api.ajax({
            url: '/authUser/validate/' + settings.data.authUserId,
            type: 'GET',
            success: settings.success,
            error: settings.error
        });
    },
    authUserPersonValidate: function(settings) {
        app.api.ajax({
            url: '/verifications/generate',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    loginByOpenId: function(settings) {
        app.api.ajax({
            url: '/party/loginByOpenId/' + settings.data.openId,
            type: 'put',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    bindMobileToOpenId: function(settings) {
        app.api.ajax({
            url: '/party/bindMobileToOpenId/' + settings.data.openId + '/' + settings.data.mobile + '/' + settings.data.code,
            type: 'put',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    b2bUserLogin: function(settings) {
        app.api.ajax({
            url: '/b2bUser/login',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    generate: function(settings) {
        app.api.ajax({
            url: '/verifications/generate',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    updatePassword: function(settings) {
        app.api.ajax({
            url: '/authUser/password',
            type: 'PUT',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    personLogin: function(settings) {
        app.api.ajax({
            url: '/auth/form',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    listEmployee: function(settings) {
        app.api.ajax({
            url: '/employee/list/account/' + settings.data.userId,
            type: 'GET',
            async: settings.async,
            success: settings.success,
            error: settings.error
        });
    },
    login: function(settings) {
        app.api.ajax({
            url: '/employee/login/' + settings.data.employeeId,
            type: 'PUT',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    bind: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/bind',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    unbind: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/unbind',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    find: function(settings) {
        app.api.ajax({
            url: '/employee/' + settings.data.employeeId,
            type: 'GET',
            success: settings.success,
            error: settings.error
        });
    },
    updateEmployee: function(settings) {
        app.api.ajax({
            url: '/employee/simple',
            type: 'PUT',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    uploadFile: function(settings) {
        app.api.ajax({
            url: '/file',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    listEmployeeStoreList: function(settings) {
        app.api.ajax({
            url: '/store/list/' + settings.data.merchantId + '/employee/' + settings.data.employeeId,
            type: 'GET',
            async: settings.async,
            success: settings.success,
            error: settings.error
        });
    },
    findByOpenId: function(settings) {
        app.api.ajax({
            url: '/wechat/find',
            type: 'GET',
            async: settings.async,
            success: settings.success,
            error: settings.error
        });
    },
    emplogin: function(settings) {
        app.api.ajax({
            url: '/employee/login/' + settings.data.empid,
            type: 'PUT',
            success: settings.success,
            error: settings.error
        });
    },
    newPassword: function(settings) {
        app.api.ajax({
            url: '/authUser/newPassword',
            type: 'PUT',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    // 美问星球登陆
    loginBySaasEmployee: function(settings) {
        app.api.ajax({
            url: '/party/loginBySaasEmployee/' + settings.data.employeeId,
            type: 'PUT',
            success: settings.success,
            error: settings.error
        });
    },
    // 在前端localstorage内丢失当前登录员工的信息情况下，获取当前会话内的员工信息
    getEmployeeInfo: function(settings) {
        app.api.ajax({
            url: '/employeeInfo',
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    // 根据userId查询openId
    getOpenIdByUserId: function(settings) {
        app.api.ajax({
            url: 'api/employeeInfo/userid/' + settings.data.userId,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    }
};
