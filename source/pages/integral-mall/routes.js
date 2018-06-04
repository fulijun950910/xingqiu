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
const voucherList = resolve => require(['./pages/list/voucher-list'], resolve);
const personal = resolve => require(['./pages/personal'], resolve);

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
    path: '/product-detail/:id',
    name: 'product-detail',
    component: productDetail
}, {
    path: '/order-list',
    name: 'order-list',
    component: orderList
}, {
    path: '/voucher-list',
    name: 'voucher-list',
    component: voucherList
}, {
    path: '/personal',
    name: 'personal',
    component: personal
}];
