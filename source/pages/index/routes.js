/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const couponVerify = resolve => require(['./pages/coupon-verify'], resolve);
const booking = resolve => require(['./pages/booking'], resolve);
const transferTradeDetail = resolve => require(['./pages/transfer-trade-detail'], resolve);
const main = resolve => require(['./pages/main/index-new'], resolve);
const userinfo = resolve => require(['./pages/userinfo/index'], resolve);
const wallet = resolve => require(['./pages/wallet/index'], resolve);
const payNotes = resolve => require(['./pages/payNotes/index'], resolve);
const getRule = resolve => require(['./pages/getRule/index'], resolve);
const recharge = resolve => require(['./pages/recharge/index'], resolve);
const checkIn = resolve => require(['./pages/checkIn/index'], resolve);
const editUserInfo = resolve => require(['./pages/editUserInfo/index'], resolve);
const rechargeMessage = resolve => require(['./pages/rechargeMessage/index'], resolve);
const bbsPage = resolve => require(['./pages/bbsPage/index'], resolve);
const alliance = resolve => require(['./pages/allianceBeta/index'], resolve);
const bigWheelDes = resolve => require(['./pages/activity-des/bigWheel-des'], resolve);
const b2bActivityList = resolve => require(['./pages/activity-des/b2b-activity-list'], resolve);
const indexActivityDetail = resolve => require(['./pages/activity-des/detail'], resolve);
const indexNew = resolve => require(['./pages/main/index'], resolve);

export default [{
    path: '/alliance',
    name: 'alliance',
    component: alliance,
    meta: { auth: true, level: 1 }
}, {
    path: '/bbsPage',
    name: 'bbsPage',
    component: bbsPage,
    meta: { auth: true, level: 1 }
}, {
    path: '/rechargeMessage',
    name: 'rechargeMessage',
    props: true,
    component: rechargeMessage,
    meta: { auth: true, level: 1 }
}, {
    path: '/editUserInfo/:type?',
    name: 'editUserInfo',
    props: true,
    component: editUserInfo,
    meta: { auth: true, level: 1 }
}, {
    path: '/checkIn',
    name: 'checkIn',
    component: checkIn,
    meta: { auth: true, level: 1 }
}, {
    path: '/recharge',
    name: 'recharge',
    component: recharge,
    meta: { auth: true, level: 1 }
}, {
    path: '/getRule',
    name: 'getRule',
    component: getRule,
    meta: { auth: true, level: 1 }
}, {
    path: '/payNotes/:accountId?',
    name: 'payNotes',
    props: true,
    component: payNotes,
    meta: { auth: true, level: 1 }
}, {
    path: '/wallet',
    name: 'wallet',
    component: wallet,
    meta: { auth: true, level: 1 }
}, {
    path: '/userinfo',
    name: 'userinfo',
    component: userinfo,
    meta: { auth: true, level: 1 }
}, {
    path: '/main',
    name: 'main',
    component: main,
    meta: { auth: true, level: 1 }
}, {
    path: '/transferTradeDetail/:orderNo?', // 确认分期
    name: 'transferTradeDetail',
    component: transferTradeDetail,
    meta: { auth: true, level: 1 }
}, {
    path: '/couponVerify/:couponNo?', // 验券
    name: 'couponVerify',
    component: couponVerify,
    meta: { auth: true, level: 1 }
}, {
    path: '/booking/:id?', // 服务动态（首页）
    name: 'booking',
    component: booking,
    meta: { auth: true, level: 1 }
}, {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn
}, {
    path: '/bigWheel-des',
    name: 'bigWheel-des',
    component: bigWheelDes
}, {
    path: '/b2b-activity-list',
    name: 'b2b-activity-list',
    component: b2bActivityList
}, {
    path: '/index-activity-detail/:type?',
    name: 'index-activity-detail',
    component: indexActivityDetail
}, {
    path: '/index-new',
    name: 'index-new',
    component: indexNew
}];
