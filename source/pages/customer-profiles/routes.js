/**
 * 路由配置
 */
const index = resolve => require(['./pages/customer-list'], resolve);
const signIn = resolve => require(['./pages/sign-in'], resolve);

export default [{
    path: '/customer-list',
    name: 'customer-list',
    component: index,
    meta: { auth: true, level: 1 }
}, {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn,
    meta: { auth: true, level: 0 }
}, {
    path: '*', // 服务动态（默认）
    redirect: '/index'
}];
