/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const rechargeMessage = resolve => require(['./pages/recharge/recharge-message'], resolve);
const rechargeDoudou = resolve => require(['./pages/recharge/recharge-doudou'], resolve);
const activityList = resolve => require(['./pages/list/activity-list'], resolve);
const productList = resolve => require(['./pages/list/product-list'], resolve);
const productDetail = resolve => require(['./pages/detail/product-detail'], resolve);
const orderList = resolve => require(['./pages/list/order-list'], resolve);
const b2bOrderList = resolve => require(['./pages/list/b2b-order-list'], resolve);
const logisticsList = resolve => require(['./pages/list/logistics-list'], resolve);
const voucherList = resolve => require(['./pages/list/voucher-list'], resolve);
const personal = resolve => require(['./pages/personal/index'], resolve);
const ruleEntry = resolve => require(['./pages/ruleEntry/index'], resolve);
const applicationForm = resolve => require(['./pages/application-form'], resolve);
const addressList = resolve => require(['./pages/list/address-list'], resolve);
const editeAddress = resolve => require(['./pages/edite-address'], resolve);
const changePSW = resolve => require(['./pages/personal/changePwd'], resolve);
const supplierForm = resolve => require(['./pages/supplier-form'], resolve);
const supplierList = resolve => require(['./pages/list/supplier-list'], resolve);
const promotionAtTp = resolve => require(['./pages/promotions/at_tp/index'], resolve);
const promotionAtTpList = resolve => require(['./pages/promotions/at_tp/list'], resolve);
const promotionAtTpDetail = resolve => require(['./pages/promotions/at_tp/detail'], resolve);
const promotionAtTpRecording = resolve => require(['./pages/promotions/at_tp/recording'], resolve);
const promotionAtTpRule = resolve => require(['./pages/promotions/at_tp/rule'], resolve);
const bigWheel = resolve => require(['./pages/big-wheel/index'], resolve);
const payDetail = resolve => require(['./pages/pay/pay-detail'], resolve);

export default [{
    path: '/sign-in',
    name: 'sign-in',
    component: signIn
}, {
    path: '/recharge-message',
    name: 'recharge-message',
    component: rechargeMessage
}, {
    path: '/recharge-doudou',
    name: 'recharge-doudou',
    component: rechargeDoudou
}, {
    path: '/activity-list',
    name: 'activity-list',
    component: activityList
}, {
    path: '/product-list',
    name: 'product-list',
    component: productList
}, {
    path: '/product-detail/:type/:id/:addressId?',
    name: 'product-detail',
    component: productDetail
}, {
    path: '/order-list',
    name: 'order-list',
    component: orderList
}, {
    path: '/b2b-order-list',
    name: 'b2b-order-list',
    component: b2bOrderList
}, {
    path: '/logistics-list/:orderId',
    props: true,
    name: 'logistics-list',
    component: logisticsList
}, {
    path: '/voucher-list',
    name: 'voucher-list',
    component: voucherList
}, {
    path: '/personal',
    name: 'personal',
    component: personal
}, {
    path: '/rule-entry',
    name: 'rule-entry',
    component: ruleEntry
}, {
    path: '/application-form/:id',
    name: 'application-form',
    component: applicationForm
}, {
    path: '/address-list/:type/:productId?', // type: view 查看 | choose 选择
    name: 'address-list',
    component: addressList
}, {
    path: '/edite-address/:id?',
    name: 'edite-address',
    component: editeAddress
}, {
    path: '/change-pwd',
    name: 'change-pwd',
    component: changePSW
}, {
    path: '/supplier-form',
    name: 'supplier-form',
    component: supplierForm
}, {
    path: '/supplier-list',
    name: 'supplier-list',
    component: supplierList
}, {
    path: '/promotion-at-tp/:promotionId/:openid',
    name: 'promotion-at-tp',
    props: true,
    component: promotionAtTp
}, {
    path: '/promotion-at-tp-list',
    name: 'promotion-at-tp-list',
    component: promotionAtTpList
}, {
    path: '/promotion-at-tp-detail/:promotionId/:openid/:groupJoinId',
    props: true,
    name: 'promotion-at-tp-detail',
    component: promotionAtTpDetail
}, {
    path: '/promotion-at-tp-recording',
    name: 'promotion-at-tp-recording',
    component: promotionAtTpRecording
}, {
    path: '/promotion-at-tp-rule',
    name: 'promotion-at-tp-rule',
    component: promotionAtTpRule
}, {
    path: '/big-wheel',
    name: 'big-wheel',
    component: bigWheel
}, {
    path: '/pay-detail',
    name: 'pay-detail',
    component: payDetail
}];
