/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const rechargeMessage = resolve => require(['./pages/recharge/recharge-message'], resolve);
const rechargeDoudou = resolve => require(['./pages/recharge/recharge-doudou'], resolve);
const activityList = resolve => require(['./pages/list/activity-list'], resolve);
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
}];
