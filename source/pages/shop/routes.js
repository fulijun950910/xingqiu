/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);

export default [{
    path: '/sign-in',
    name: 'sign-in',
    component: signIn
}];
