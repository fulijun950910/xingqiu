// 懒加载
const staffActivity = resolve => require(['pages/activity'], resolve);

export default [{
    path: '/staff-activity',
    component: staffActivity,
    children: [{
        path: '',
        component: null
    }, {
        path: 'accountReplenish/:type/:orderId',
        component: staffActivity,
        children: [{
            path: '',
            component: null
        }, {
            path: 'itemEdit/:itemId',
            component: staffActivity
        }]
    }]
}, {
    path: '*',
    component: staffActivity
}];
