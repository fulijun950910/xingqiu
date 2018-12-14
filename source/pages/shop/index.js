import Vue from 'vue';
import App from './app';
require('vendor/polyfill');
import { Toast, Indicator, MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$signLocation = process.env.NODE_ENV === 'development' ? '#/sign-in' : '/userinfo.html#/user_login';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routes';
import FastClick from 'fastclick';
import touch from 'directives/touch';
import store from './store';
import 'styles/_style.less';
import 'filter/filter';
import 'filter/moment-filter';
import 'directives/directive';
// iconfont项目 wechat-shop
import './iconfont';
import knife from 'vendor/knife';
import mIcon from 'components/m-icon';

// 常用函数
Vue.prototype.$knife = knife;

// 图标组件
Vue.component('m-icon', mIcon);

// 关闭启动信息
Vue.config.productionTip = false;

// iOS 300ms延迟解决方案
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 更新登录人信息至Vuex
store.commit('UPDATE_LOCAL');

Vue.use(touch);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes
});

// let routerCheckPath = path => {
//     let reg = /(^\/sign-in)|(^\/main)|(^\/bbsPage)|(^\/alliance)|(^\/booking)/;
//     return reg.test(path);
// };
router.beforeEach(({ meta, path }, from, next) => {
    // if (routerCheckPath(path) || store.getters.isLogin) {
    //      // 百度统计
    try {
        window._hmt.push(['_trackPageview', '/service/shop.html' + location.hash]);
    } catch (e) {
    };
    //     next();
    // } else {
    //     if (process.env.NODE_ENV === 'development') {
    //         next({ name: 'sign-in' });
    //     } else {
    //         window.location.href = '/userinfo.html#/user_login';
    //     }

    // }
    if (path) {
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
