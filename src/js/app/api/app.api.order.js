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
    comment: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/orderComment',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    }
}
