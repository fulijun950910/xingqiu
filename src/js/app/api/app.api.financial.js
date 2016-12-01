app.api.financial = {
    getWxPromotionStatistics: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getWxPromotionStatistics',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getWxPromotionDetails: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getWxPromotionDetails',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
}
