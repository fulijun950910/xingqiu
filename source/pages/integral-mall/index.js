import Vue from 'vue';
import App from './app';
require('vendor/polyfill');
import 'mint-ui/lib/style.css';
import { Toast, Indicator, MessageBox } from 'mint-ui';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$signLocation = process.env.NODE_ENV === 'development' ? '#/sign-in' : '/userinfo.html#/user_login';
Vue.prototype.$isDev = process.env.NODE_ENV === 'development';
Vue.prototype.$wxc_url = process.env.NODE_ENV === 'production' ? 'https://wechat.mei1.com' : 'https://wechat.mei1.info';
Vue.prototype.$rootPath = process.env.NODE_ENV === 'development' ? '/' : '/service/';

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
store.commit('UPDATE_PROMOTION');
if (store.state && store.state.party && store.state.party.ucsynlogin) {
    let hm = document.createElement('script');
    hm.src = store.state.party.ucsynlogin;
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
}

Vue.use(touch);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    routes
});

let routerCheckPath = path => {
    let reg = /(^\/sign-in)|(^\/main)|(^\/bbsPage)|(^\/alliance)|(^\/booking)|(^\/promotion-at-tp)/;
    return reg.test(path);
};

router.beforeEach(({ meta, path }, from, next) => {
    if (routerCheckPath(path) || store.getters.isLogin || store.state.party) {
         // 百度统计
        try {
            window._hmt.push(['_trackPageview', '/#' + path]);
        } catch (e) {
        }
        next();
    } else {
        if (process.env.NODE_ENV === 'development') {
            next({ name: 'sign-in' });
        } else {
            window.location.href = '/userinfo.html#/user_login';
        }

    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
