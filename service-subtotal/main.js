import Vue from 'vue';
import App from './app';
require('babel-polyfill');

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import routes from 'config/routes';
import FastClick from 'fastclick';
import 'styles/_style.less';
import 'filter/filter';
import 'directives/directive';
import 'styles/fonts/iconfont';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes: routes
});

router.beforeEach(({ meta, path }, from, next) => {
    // if 登录页 或者 注册页 || 已登录 并且 营销版
    // else 跳转登录页
    next();
    // if ((path == '/sign' || path == '/register')) {
    //     next();
    // } else {
    //     if (Vue.prototype.$signLocation == '#/sign') {
    //         next({ path: '/sign' });
    //     } else {
    //         window.location.href = Vue.prototype.$signLocation;
    //     }
    // }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
