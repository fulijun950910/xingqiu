/**
 * Created by wzc on 16/7/14.
 */
app.api.appointment = {
    list: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/appointmentList',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    find: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/appointmentInfo/' + settings.data.appointmentId,
            type: 'GET',
            success: settings.success,
            error: settings.error
        })
    }
}
