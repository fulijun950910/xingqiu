/**
 * 路由配置
 */
// 服务小计
const dataView = resolve => require(['./pages/data-view'], resolve);
const returnVisitEdit = resolve =>
    require(['./pages/return-visit-edit'], resolve);
const memberList = resolve => require(['./pages/member-list'], resolve);
const returnVisitRankingList = resolve =>
    require(['./pages/return-visit-ranking-list'], resolve);
const memberMaintain = resolve => require(['./pages/member-maintain'], resolve);
const serviceRecordEdit = resolve =>
    require(['./pages/service-record-edit'], resolve);
const serviceRecordList = resolve =>
    require(['./pages/service-record-list'], resolve);
const recordFinish = resolve => require(['./pages/record-finish'], resolve);
const unrecordedServiceList = resolve =>
    require(['./pages/unrecorded-service-list'], resolve);
const serviceDynamics = resolve =>
    require(['./pages/service-dynamics'], resolve);
const signIn = resolve => require(['./pages/sign-in'], resolve);
const remitDetail = resolve => require(['./pages/remit-detail/index'], resolve);

// 客户档案
const customersDetail = resolve => require(['./pages/customers/detail'], resolve);
const customers = resolve => require(['./pages/customers'], resolve);
const customersManage = resolve => require(['./pages/customers/manage/index'], resolve);
const customersTag = resolve => require(['./pages/customers/manage/tag'], resolve);
const customersGroup = resolve => require(['./pages/customers/manage/group'], resolve);
const customersMessage = resolve => require(['./pages/customers/manage/message'], resolve);
const customersTicket = resolve => require(['./pages/customers/manage/ticket'], resolve);

export default [
    // 服务小计
    {
        path: '/data-view', // 数据查看页面
        name: 'data-view',
        component: dataView,
        meta: { auth: true, level: 2 }
    },
    {
        path: '/return-visit/:memberId/create', // 客户关怀 新增
        name: 'return-visit-create',
        component: returnVisitEdit,
        meta: { auth: true, level: 4 }
    },
    {
        path: '/member-list', // 会员列表
        name: 'member-list',
        component: memberList,
        meta: { auth: true, level: 3 }
    },
    {
        path: '/return-visit-ranking-list', // 查看客户关怀
        name: 'return-visit-ranking-list',
        component: returnVisitRankingList,
        meta: { auth: true, level: 3 }
    },
    {
        path: '/member-maintain', // 客户维护
        name: 'member-maintain',
        component: memberMaintain,
        meta: { auth: true, level: 2 }
    },
    {
        path: '/service-record/:serviceId/create', // 服务小计 新增
        name: 'service-record-create',
        component: serviceRecordEdit,
        meta: { auth: true, level: 4 }
    },
    {
        path: '/service-record/:serviceId/edit', // 服务小计 编辑
        name: 'service-record-edit',
        component: serviceRecordEdit,
        meta: { auth: true, level: 4 }
    },
    {
        path: '/service-record-list', // 服务小计 列表
        name: 'service-record-list',
        component: serviceRecordList,
        meta: { auth: true, level: 3 }
    },
    {
        path: '/record-finish', // 记录完成
        name: 'record-finish',
        component: recordFinish,
        meta: { auth: true, level: 5 }
    },
    {
        path: '/unrecorded-service-list', // 未记录服务
        name: 'unrecorded-service-list',
        component: unrecordedServiceList,
        meta: { auth: true, level: 3 }
    },
    {
        path: '/service-dynamics', // 服务动态（首页）
        name: 'service-dynamics',
        component: serviceDynamics,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: signIn
    },
    {
        path: '/remit-detail/:merchantId/:drawMoneyId',
        name: 'remit-detail',
        component: remitDetail,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/customers',
        name: 'customers',
        component: customers,
        meta: { auth: true, level: 2 }
    },
    // 客户档案
    {
        path: '/customers/detail/:customerId',
        name: 'customers-detail',
        props: true,
        component: customersDetail,
        meta: { auth: true, level: 2 }
    },
    {
        path: '/customers/manage',
        name: 'customers-manage',
        component: customersManage,
        meta: { auth: true, level: 3 },
        children: [
            {
                path: 'tag',
                name: 'customers-manage-tag',
                component: customersTag,
                meta: { auth: true, level: 4 }
            },
            {
                path: 'group',
                name: 'customers-manage-group',
                component: customersGroup,
                meta: { auth: true, level: 4 }
            },
            {
                path: 'message',
                name: 'customers-manage-message',
                component: customersMessage,
                meta: { auth: true, level: 4 }
            },
            {
                path: 'ticket',
                name: 'customers-manage-ticket',
                component: customersTicket,
                meta: { auth: true, level: 4 }
            }
        ]
    },
    {
        path: '*', // 服务动态（默认）
        redirect: '/service-dynamics'
    }
];
