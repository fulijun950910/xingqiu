/**
 * 路由配置
 */
const customerList = resolve => require(['./pages/customer-list'], resolve);
const customerDetail = resolve => require(['./pages/customer-detail'], resolve);
const signIn = resolve => require(['./pages/sign-in'], resolve);

const customerAssets = resolve => require(['./pages/customer-detail-assets'], resolve);
const customerIntro = resolve => require(['./pages/customer-detail-intro'], resolve);
const customerRecord = resolve => require(['./pages/customer-detail-record'], resolve);
const customerService = resolve => require(['./pages/customer-detail-service'], resolve);

export default [{
    path: '/list', // （默认）客户档案列表
    name: 'list',
    component: customerList,
    meta: { auth: true, level: 1, title: '顾客档案' }
}, {
    path: '/detail/:customerId', // 客户档案详情
    name: 'detail',
    component: customerDetail,
    meta: { auth: true, level: 2, title: '顾客详情' },
    children: [{
        path: 'assets',
        name: 'assets',
        meta: { auth: true, level: 4, title: '账户资产' },
        component: customerAssets
    }, {
        path: 'record',
        name: 'record',
        meta: { auth: true, level: 3, title: '护理记录' },
        component: customerRecord
    }, {
        path: 'service',
        name: 'service',
        meta: { auth: true, level: 2, title: '回访/关怀' },
        component: customerService
    }, {
        path: 'intro',
        name: 'intro',
        meta: { auth: true, level: 1, title: '档案信息' },
        component: customerIntro
    }]
}, {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn,
    meta: { auth: false, level: 0 }
}, {
    path: '*',
    redirect: '/list'
}];
