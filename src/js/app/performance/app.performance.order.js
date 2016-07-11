/**
 * Created by wzc on 16/7/7.
 */
app.performance.order = {
    orderId: null,
    list: function () {

    },
    detail: function () {

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
    }
}