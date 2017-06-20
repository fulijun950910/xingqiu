/**
 * 路由配置
 */
const dataView = resolve => require(['pages/data-view'], resolve);
const returnVisitEdit = resolve => require(['pages/return-visit-edit'], resolve);
const memberList = resolve => require(['pages/member-list'], resolve);
const returnVisitRankingList = resolve => require(['pages/return-visit-ranking-list'], resolve);
const memberMaintain = resolve => require(['pages/member-maintain'], resolve);
const serviceRecordEdit = resolve => require(['pages/service-record-edit'], resolve);
const serviceRecordList = resolve => require(['pages/service-record-list'], resolve);
const recordFinish = resolve => require(['pages/record-finish'], resolve);
const unrecordedServiceList = resolve => require(['pages/unrecorded-service-list'], resolve);
const serviceDynamics = resolve => require(['pages/service-dynamics'], resolve);

export default [{
    path: '/data-view', // 数据查看页面
    name: 'data-view',
    component: dataView
}, {
    path: '/return-visit-edit/:recordId',   // 数据查看页面
    name: 'return-visit-edit',
    component: returnVisitEdit
}, {
    path: '/member-list',   // 会员列表
    name: 'member-list',
    component: memberList
}, {
    path: '/return-visit-ranking-list',     // 查看客户关怀（查看服务小计页面缺失）
    name: 'return-visit-ranking-list',
    component: returnVisitRankingList
}, {
    path: '/member-maintain',   // 客户维护
    name: 'member-maintain',
    component: memberMaintain
}, {
    path: '/service-record-edit/:recordId',     // 服务小计 编辑
    name: 'service-record-edit',
    component: serviceRecordEdit
}, {
    path: '/service-record-list',       // 服务小计 列表
    name: 'service-record-list',
    component: serviceRecordList
}, {
    path: '/record-finish',     // 记录完成
    name: 'record-finish',
    component: recordFinish
}, {
    path: '/unrecorded-service-list',   // 未记录服务
    name: 'unrecorded-service-list',
    component: unrecordedServiceList
}, {
    path: '/service-dynamics',      // 服务动态（首页）
    name: 'service-dynamics',
    component: serviceDynamics
}, {
    path: '*',      // 服务动态（默认）
    name: 'service-dynamics',
    component: serviceDynamics
}];
