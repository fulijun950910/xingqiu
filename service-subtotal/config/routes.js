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

export default [{
    path: '/data-view',
    name: 'data-view',
    component: dataView
}, {
    path: '/return-visit-edit',
    name: 'return-visit-edit',
    component: returnVisitEdit
}, {
    path: '/member-list',
    name: 'member-list',
    component: memberList
}, {
    path: '/return-visit-ranking-list',
    name: 'return-visit-ranking-list',
    component: returnVisitRankingList
}, {
    path: '/member-maintain',
    name: 'member-maintain',
    component: memberMaintain
}, {
    path: '/service-record-edit',
    name: 'service-record-edit',
    component: serviceRecordEdit
}, {
    path: '/service-record-list',
    name: 'service-record-list',
    component: serviceRecordList
}, {
    path: '/record-finish',
    name: 'record-finish',
    component: recordFinish
}, {
    path: '/unrecorded-service-list',
    name: 'unrecorded-service-list',
    component: unrecordedServiceList
}];
