/**
 * Created by wzc on 16/7/7.
 */
app.performance.order = {
    page: {
        page: 1,
        size: 10
    },
    orderId: null,
    list: function () {
        var data = {
            type: 2,
            ids: app.userinfo.getEmployee().id,
            page: app.performance.order.page.page,
            size: app.performance.order.page.size
        }
        app.api.order.list({
            data: data,
            success: function (result) {
                if (result.success && !result.data) {
                    app.tools.show('order-list');
                    return;
                }
                var data = {
                    datas: result.data
                }
                var template = $('#tmpl-order-list').html();
                var result = tmpl(template, data);
                $('#order-list').html(result);
            }
        })
    },
    detail: function () {
        var data = {
            orderId: app.performance.order.orderId
        }
        app.api.order.detail({
            data: data,
            success: function (result) {

            }
        })
    },
    chooseOrderId: function (orderId) {
        app.performance.order.orderId = orderId;
        location.href = "#/order-detail";
    },
    comment: function (orderId) {
        app.performance.order.orderId = orderId;
        location.href = "#/order-comment";
        app.performance.order.stop();
    },
    searchOrderComment: function () {

    },
    stop: function () {
        var e = document;
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;
        if (e && e.stopPropagation)
            e.stopPropagation();
        else
            window.event.cancelBubble = true;
        return false;
    },
    fenToYuan: function (money) {
        if (!money)
            return '0.00';
        var m = parseFloat(money) / 100;
        return m;
    }
}