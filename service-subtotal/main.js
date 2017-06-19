import Vue from 'vue';
import App from './app';
require('babel-polyfill');
require('vendor/polyfill');
import { Toast, Indicator, MessageBox } from 'mint-ui';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from 'config/routes';
import FastClick from 'fastclick';
import touch from 'directives/touch';
import store from './store';
import 'styles/_style.less';
import 'filter/filter';
import 'directives/directive';
import 'styles/fonts/iconfont';
import knife from 'vendor/knife';
Vue.prototype.$knife = knife;

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.use(touch);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes
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
    store,
    render: h => h(App)
}).$mount('#app');
