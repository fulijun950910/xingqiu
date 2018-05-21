/**
 * 路由配置
 */
const signIn = resolve => require(['./pages/sign-in'], resolve);
const index = resolve => require(['./pages/index'], resolve);
const mall = resolve => require(['./pages/mall'], resolve);
const news = resolve => require(['./pages/news'], resolve);
const personal = resolve => require(['./pages/personal'], resolve);
const leader = resolve => require(['./pages/leader'], resolve);
const newsDetail = resolve => require(['./pages/news/news-detail'], resolve);
const goodsDetail = resolve => require(['./pages/goods/goods-detail'], resolve);

export default [{
    path: '/sign-in',
    name: 'sign-in',
    component: signIn
}, {
    path: '/index',
    name: 'index',
    component: index
}, {
    path: '/mall',
    name: 'mall',
    component: mall
}, {
    path: '/news',
    name: 'news',
    component: news
}, {
    path: '/personal',
    name: 'personal',
    component: personal
}, {
    path: '/leader',
    name: 'leader',
    component: leader
}, {
    path: '/news-detail',
    name: 'news-detail',
    component: newsDetail
},
{
    path: '/goods-detail',
    name: 'goods-detail',
    component: goodsDetail
}];
