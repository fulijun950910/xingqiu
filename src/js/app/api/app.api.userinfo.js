/**
 * Created by wzc on 16/7/11.
 */
app.api.userinfo = {
    auth: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/validateusernamepassword',
            type: 'POST',
            success : settings.success,
            error : settings.error,
            data : settings.data
        })
    },
    listEmployee: function (settings) {
        app.api.ajax({
            url: '/employee/list/account/' + settings.data.userId,
            type: 'GET',
            success : settings.success,
            error : settings.error,
        })
    },
    login: function (settings) {
        app.api.ajax({
            url: '/employee/login/' + settings.data.employeeId,
            type: 'PUT',
            success : settings.success,
            error : settings.error,
            data : settings.data
        })
    },
    bind: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/bind',
            type: 'POST',
            success : settings.success,
            error : settings.error,
            data : settings.data
        })
    },
    unbind: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/unbind',
            type: 'POST',
            success : settings.success,
            error : settings.error,
            data : settings.data
        })
    }
}