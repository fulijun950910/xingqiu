/**
 * Created by jiosn on 16/8/3.
 */
app.api.index = {
    performanceReport: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/performanceReport',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    empPerformance: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/employeePerformance',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
}
