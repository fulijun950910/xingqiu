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
    queryGroupTotal: function(settings) {
        app.api.ajax({
            url: '/wechatBusinessMarketing/interveneGroupTotal/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        })
    },
    promotionCustomerBuy: function(settings) {
        app.api.ajax({
            url: '/wechatBusinessMarketing/promotionCustomerBuy/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        })
    },
    getIncomeSource: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getIncomeSource',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    showPayNotes: function(settings) {
        app.api.ajax({
            url: '/subscription/list',
            type: 'get',
            success: settings.success,
            error: settings.error
        })
    }
}
