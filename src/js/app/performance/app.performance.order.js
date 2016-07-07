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
        location.href="#/order-detail";
    },
    comment: function (orderId) {
        
    }
}