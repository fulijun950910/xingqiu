/**
 * Created by wzc on 16/7/14.
 */
app.api.order = {
    list: function (settings) {
        app.api.ajax({
            async: true,
            url: '/wechatbusinessassists/orderList',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    detail: function (settings) {
        app.api.ajax({
            url: '/order/'+settings.data.orderId,
            type: 'GET',
            success: settings.success,
            error: settings.error,
        })
    },
    cardBalance: function (settings) {
        app.api.ajax({
            url: '/cardInstance/getCardBalances',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    createTag: function (settings) {
        app.api.ajax({
            url: '/tag',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getTag: function (settings) {
        app.api.ajax({
            url: '/tag/getUniqueTags',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getMemberTag: function (settings) {
        app.api.ajax({
            url: '/tag/list/'+settings.data.merchantId+'/0/'+settings.data.memberId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getOrderServer: function (settings) {
        app.api.ajax({
            url: '/tag/getTagAndPhotoByOrderId/'+settings.data.orderId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    comment: function (settings) {
        app.api.ajax({
            url: '/tag/saveTagAndPhoto',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    }
}
