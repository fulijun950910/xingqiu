app.api.echarts = {
    getMemberStatistics: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getMemberStatistics',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    orderEmployeePerformanceList: function(settings) {
        app.api.ajax({
            url: '/report/orderEmployeePerformanceList',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    reportShow: function(settings) {
        app.api.ajax({
            url: '/report/show',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    }
}
