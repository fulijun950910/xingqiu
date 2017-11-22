/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const couponVerify = resolve => require(['./pages/coupon-verify'], resolve);
const booking = resolve => require(['./pages/booking'], resolve);

export default [{
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
}];
