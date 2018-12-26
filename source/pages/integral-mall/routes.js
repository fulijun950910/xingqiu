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
const paySuccess = resolve => require(['./pages/pay/pay-success'], resolve);
const applicationMarketForm = resolve => require(['./pages/applicationMarket-form'], resolve);
const baiduMap = resolve => require(['./pages/baidu-map'], resolve);
const packageDetail = resolve => require(['./pages/detail/package-detail'], resolve);
const orderDetail = resolve => require(['./pages/detail/order-detail'], resolve);
const offlinePay = resolve => require(['./pages/pay/offline-pay'], resolve);
import b2bMallIndex from 'pages/integral-mall/pages/b2b-mall/index';
import b2bMallOrder from 'pages/integral-mall/pages/b2b-mall/order';
import b2bMallOrderDetail from 'pages/integral-mall/pages/b2b-mall/order-detail';
import b2bMallUser from 'pages/integral-mall/pages/b2b-mall/user';
import b2bMallOrderListIndex from 'pages/integral-mall/pages/b2b-mall/order-list/index';
import b2bMallOrderListPublish from 'pages/integral-mall/pages/b2b-mall/order-list/publish';
import b2bMallOrderListBuy from 'pages/integral-mall/pages/b2b-mall/order-list/buy';
import b2bMallOrderListSell from 'pages/integral-mall/pages/b2b-mall/order-list/sell';
import b2bMallOrderListSellDetil from 'pages/integral-mall/pages/b2b-mall/order-list/sell-detail';
import b2bMallInvoiceList from 'pages/integral-mall/pages/b2b-mall/invoice/list';
import b2bMallInvoiceEdit from 'pages/integral-mall/pages/b2b-mall/invoice/edit';
import b2bMallUserInfo from 'pages/integral-mall/pages/b2b-mall/userinfo';
import b2bMallEditUserInfo from 'pages/integral-mall/pages/b2b-mall/editUserInfo';
import b2bMallIncomeData from 'pages/integral-mall/pages/b2b-mall/income-data';
import b2bMallTicketIndex from 'pages/integral-mall/pages/b2b-mall/ticket-index';
import b2bMallSettingsAccount from 'pages/integral-mall/pages/b2b-mall/settings-account';

export default [{
    path: '/',
    name: 'personal',
    component: personal
}, {
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
    path: '/activity-list/:type', // 5 活动列表 9 应用市场
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
    path: '/logistics-list/:orderId/:campanyCode?',
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
}, {
    path: '/pay-success',
    name: 'pay-success',
    component: paySuccess
}, {
    path: '/applicationMarket-form/:id',
    name: 'applicationMarket-form',
    component: applicationMarketForm
},
{
    path: '/package-detail/:id',
    name: 'package-detail',
    component: packageDetail
},
{
    path: '/baidu-map/:id',
    name: 'baidu-map',
    component: baiduMap
},
{
    path: '/order-detail/:id',
    name: 'order-detail',
    component: orderDetail
},
{
    path: '/offline-pay',
    name: 'offline-pay',
    component: offlinePay
},
{
    path: '/b2b-mall-index',
    name: 'b2b-mall-index',
    props: true,
    component: b2bMallIndex
},
{
    path: '/b2b-mall-order/:id',
    name: 'b2b-mall-order',
    props: true,
    component: b2bMallOrder
},
{
    path: '/b2b-mall-order-detail/:id',
    name: 'b2b-mall-order-detail',
    props: true,
    component: b2bMallOrderDetail
},
{
    path: '/b2b-mall-order-list',
    name: 'b2b-mall-order-list',
    props: true,
    component: b2bMallOrderListIndex,
    children: [
        {
            path: 'publish',
            name: 'b2b-mall-order-list-publish',
            props: true,
            component: b2bMallOrderListPublish
        },
        {
            path: 'buy',
            name: 'b2b-mall-order-list-buy',
            props: true,
            component: b2bMallOrderListBuy
        },
        {
            path: 'sell',
            name: 'b2b-mall-order-list-sell',
            props: true,
            component: b2bMallOrderListSell
        },
        {
            path: 'sell-detail',
            name: 'b2b-mall-order-list-sell-detail',
            props: true,
            component: b2bMallOrderListSellDetil
        }
    ]
},
{
    path: '/b2b-mall-invoice-list',
    name: 'b2b-mall-invoice-list',
    props: true,
    component: b2bMallInvoiceList
},
{
    path: '/b2b-mall-invoice-edit/:id?',
    name: 'b2b-mall-invoice-edit',
    props: true,
    component: b2bMallInvoiceEdit
},
{
    path: '/b2b-mall-income-data',
    name: 'b2b-mall-income-data',
    props: true,
    component: b2bMallIncomeData
},
{
    path: '/b2b-mall-ticket-index',
    name: 'b2b-mall-ticket-index',
    props: true,
    component: b2bMallTicketIndex
},
{
    path: '/b2b-mall-settings-account',
    name: 'b2b-mall-settings-account',
    props: true,
    component: b2bMallSettingsAccount
},
{
    path: '/b2b-mall-user',
    name: 'b2b-mall-user',
    props: true,
    component: b2bMallUser
},
{
    // path: '/b2b-mall-userinfo/:userID?',
    path: '/b2b-mall-userinfo',
    name: 'b2b-mall-userinfo',
    props: true,
    component: b2bMallUserInfo
},
{
    // path: '/b2b-mall-editUserInfo/:type?',
    path: '/b2b-mall-editUserInfo',
    name: 'b2b-mall-editUserInfo',
    props: true,
    component: b2bMallEditUserInfo
}
];
