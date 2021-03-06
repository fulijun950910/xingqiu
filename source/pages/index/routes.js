/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const couponVerify = resolve => require(['./pages/coupon-verify'], resolve);
const booking = resolve => require(['./pages/booking'], resolve);
const transferTradeDetail = resolve => require(['./pages/transfer-trade-detail'], resolve);
const userinfo = resolve => require(['./pages/userinfo/index'], resolve);
const wallet = resolve => require(['./pages/wallet/index'], resolve);
const payNotes = resolve => require(['./pages/payNotes/index'], resolve);
const getRule = resolve => require(['./pages/getRule/index'], resolve);
const recharge = resolve => require(['./pages/recharge/index'], resolve);
const checkIn = resolve => require(['./pages/checkIn/index'], resolve);
const editUserInfo = resolve => require(['./pages/editUserInfo/index'], resolve);
const rechargeMessage = resolve => require(['./pages/rechargeMessage/index'], resolve);
const bbsPage = resolve => require(['./pages/bbsPage/index'], resolve);
const alliance = resolve => require(['./pages/allianceBeta/index'], resolve);
const bigWheelDes = resolve => require(['./pages/activity-des/bigWheel-des'], resolve);
const b2bActivityList = resolve => require(['./pages/activity-des/b2b-activity-list'], resolve);
const indexActivityDetail = resolve => require(['./pages/activity-des/detail'], resolve);
const main = resolve => require(['./pages/main/index'], resolve);
const bookingTable = resolve => require(['./pages/booking/table'], resolve);
const bookingEdit = resolve => require(['./pages/booking/edit'], resolve);
const employeeCharts = resolve => require(['./pages/employee/charts'], resolve);
const performanceList = resolve => require(['./pages/performance/order-list.vue'], resolve);
const orderDetail = resolve => require(['./pages/performance/order-detail.vue'], resolve);

const customers = resolve => require(['./pages/customers/index'], resolve);
const customerDetail = resolve => require(['./pages/customers/children/detail'], resolve);
const customerAssets = resolve => require(['./pages/customers/children/assets'], resolve);
const customerIntro = resolve => require(['./pages/customers/children/intro'], resolve);
const customerRecord = resolve => require(['./pages/customers/children/record'], resolve);
const customerService = resolve => require(['./pages/customers/children/service'], resolve);

const echartsProduct = resolve => require(['./pages/echarts/echartsProduct'], resolve);
const echartsEmployee = resolve => require(['./pages/echarts/echartsEmployee'], resolve);
const echartsMember = resolve => require(['./pages/echarts/echartsMember'], resolve);

const arrivalMember = resolve => require(['./pages/member/arrivalMember'], resolve);
const memberDetail = resolve => require(['./pages/member/member-detail'], resolve);

const Attendance = resolve => require(['./pages/attendance/Attendance'], resolve);
const Approval = resolve => require(['./pages/attendance/Approval'], resolve);
const newMember = resolve => require(['./pages/member/newMember'], resolve);
const statistics = resolve => require(['./pages/attendance/statistics/index'], resolve);
const statisticsAll = resolve => require(['./pages/attendance/statistics/children/all'], resolve);
const statisticsMy = resolve => require(['./pages/attendance/statistics/children/my'], resolve);
const statisticsLate = resolve => require(['./pages/attendance/statistics/late'], resolve);
const Latedetail = resolve => require(['./pages/attendance/statistics/detail'], resolve);
const qrconfirm = resolve => require(['./pages/qrconfirm/index'], resolve);

export default [
    {
        path: '*',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        meta: { auth: false, level: 1 }
    },
    {
        path: '/alliance',
        name: 'alliance',
        component: alliance,
        meta: { auth: false, level: 1 }
    },
    {
        path: '/bbsPage',
        name: 'bbsPage',
        component: bbsPage,
        meta: { auth: false, level: 1 }
    },
    {
        path: '/rechargeMessage',
        name: 'rechargeMessage',
        props: true,
        component: rechargeMessage,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/editUserInfo/:type?',
        name: 'editUserInfo',
        props: true,
        component: editUserInfo,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/checkIn',
        name: 'checkIn',
        component: checkIn,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: recharge,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/getRule',
        name: 'getRule',
        component: getRule,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/payNotes/:accountId?',
        name: 'payNotes',
        props: true,
        component: payNotes,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: wallet,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: userinfo,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/transferTradeDetail/:orderNo?', // 确认分期
        name: 'transferTradeDetail',
        component: transferTradeDetail,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/couponVerify/:couponNo?', // 验券
        name: 'couponVerify',
        component: couponVerify,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/booking/:id?', // 服务动态（首页）
        name: 'booking',
        component: booking,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: signIn,
        meta: { auth: false }
    },
    {
        path: '/bigWheel-des',
        name: 'bigWheel-des',
        component: bigWheelDes,
        meta: { auth: false }
    },
    {
        path: '/b2b-activity-list',
        name: 'b2b-activity-list',
        component: b2bActivityList,
        meta: { auth: false }
    },
    {
        path: '/index-activity-detail/:type?',
        name: 'index-activity-detail',
        component: indexActivityDetail,
        meta: { auth: false }
    },
    {
        path: '/booking-table',
        name: 'booking-table',
        component: bookingTable,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/booking-edit/:bookingId?',
        name: 'booking-edit',
        component: bookingEdit,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/employeeCharts/:employeeId?',
        name: 'employeeCharts',
        component: employeeCharts,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/customers',
        name: 'customers',
        component: customers,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/order-list',
        name: 'order-list',
        component: performanceList,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/order-detail/:orderId?',
        name: 'order-detail',
        component: orderDetail,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/customers/:customerId',
        name: 'customer-detail',
        component: customerDetail,
        meta: { auth: true, level: 2 },
        children: [
            {
                path: 'assets',
                name: 'customer-assets',
                meta: { auth: true, level: 3, title: '账户资产' },
                component: customerAssets
            },
            {
                path: 'record',
                name: 'customer-record',
                meta: { auth: true, level: 3, title: '护理记录' },
                component: customerRecord
            },
            {
                path: 'service',
                name: 'customer-service',
                meta: { auth: true, level: 3, title: '回访/关怀' },
                component: customerService
            },
            {
                path: 'intro',
                name: 'customer-intro',
                meta: { auth: true, level: 3, title: '档案信息' },
                component: customerIntro
            }
        ]
    },
    {
        path: '/echartsProduct',
        name: 'echartsProduct',
        component: echartsProduct,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/echartsEmployee',
        name: 'echartsEmployee',
        component: echartsEmployee,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/echartsMember',
        name: 'echartsMember',
        component: echartsMember,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/arrivalMember',
        name: 'arrivalMember',
        component: arrivalMember,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/memberDetail/:memberId?',
        name: 'memberDetail',
        component: memberDetail,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/Attendance',
        name: 'Attendance',
        component: Attendance,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/Approval',
        name: 'Approval',
        component: Approval,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/newMember',
        name: 'newMember',
        component: newMember,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/statistics',
        component: statistics,
        meta: { auth: true },
        children: [
            {
                path: '/',
                redirect: 'all'
            },
            {
                path: 'all',
                name: 'statistics-all',
                component: statisticsAll,
                meta: { auth: true }
            },
            {
                path: 'my',
                name: 'statistics-my',
                component: statisticsMy,
                meta: { auth: true }
            }
        ]
    },
    {
        path: '/late',
        name: 'late',
        component: statisticsLate,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/Latedetail',
        name: 'Latedetail',
        component: Latedetail,
        meta: { auth: true, level: 1 }
    },
    {
        path: '/qrconfirm',
        component: qrconfirm,
        meta: { auth: false }
    }
];
