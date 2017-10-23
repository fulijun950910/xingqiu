/**
 * 路由配置
 */
const customerList = resolve => require(['./pages/customer-list'], resolve);
const customerDetail = resolve => require(['./pages/customer-detail'], resolve);
const signIn = resolve => require(['./pages/sign-in'], resolve);

export default [{
    path: '/list',  // （默认）客户档案列表
    name: 'list',
    component: customerList,
    meta: { auth: true, level: 1, title: '顾客档案' }
}, {
    path: '/detail/:customerId',    // 客户档案详情
    name: 'detail',
    component: customerDetail,
    meta: { auth: true, level: 2, title: '顾客详情' }
}, {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn,
    meta: { auth: false, level: 0 }
}, {
    path: '*',
    redirect: '/list'
}];
