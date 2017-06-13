// 懒加载
const staffActivity = resolve => require(['pages/staff-activity'], resolve);

export default [{
    path: '/staff-activity',
    component: staffActivity,
    children: [{
        path: '',
        component: null
    }, {
        path: 'accountReplenish/:type/:orderId',
        component: accountReplenish,
        children: [{
            path: '',
            component: null
        }, {
            path: 'itemEdit/:itemId',
            component: itemEdit
        }]
    }]
}, {
    path: '*',
    component: staffActivity
}];
