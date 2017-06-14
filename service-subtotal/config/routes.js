/**
 * 路由配置
 */
const staffActivity = resolve => require(['pages/activity'], resolve);

export default [{
    path: '/activity',
    name: 'activity',
    component: staffActivity
}, {
    path: '/record',
    name: 'record',
    component: resolve => require(['pages/record-view'], resolve)
}, {
    path: '/record/c',
    name: 'record-c',
    component: resolve => require(['pages/record-c'], resolve)
}, {
    path: '/record-c/:recordId/edit',
    name: 'record-c-edit',
    component: resolve => require(['pages/record-c-edit'], resolve)
}, {
    path: '/record/s',
    name: 'record-s',
    component: resolve => require(['pages/record-s'], resolve)
}, {
    path: '/record-s/:recordId/edit',
    name: 'record-s-edit',
    component: resolve => require(['pages/record-s-edit'], resolve)
}, {
    path: '/data',
    name: 'data',
    component: resolve => require(['pages/data-view'], resolve)
}, {
    path: '/data/c',
    name: 'data-c',
    component: resolve => require(['pages/data-c'], resolve)
}, {
    path: '/data/s',
    name: 'data-s',
    component: resolve => require(['pages/data-s'], resolve)
}, {
    path: '/record-edit-success',
    name: 'record-edit-success',
    component: resolve => require(['pages/record-edit-success'], resolve)
}, {
    path: '*',
    component: staffActivity
}];
