import Vue from 'vue';
import App from './app';
require('vendor/polyfill');
import 'mint-ui/lib/style.css';
import { Toast, Indicator, MessageBox } from 'mint-ui';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$signLocation = process.env.NODE_ENV === 'development' ? '#/sign-in' : '/userinfo.html#/user_login';
Vue.prototype.$wxc_url = process.env.NODE_ENV === 'production' ? 'https://wechat.mei1.com' : 'https://wechat.mei1.info';

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
import './iconfont';
import knife from 'vendor/knife';
import mIcon from 'components/m-icon';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

// 常用函数
Vue.prototype.$knife = knife;

// 图标组件
Vue.component('m-icon', mIcon);

// 关闭启动信息
Vue.config.productionTip = false;

// 错误日志收集
Raven
    .config('https://4159bc2d37704ea9af9f2b0450c5ebe6@sentry.io/185441')
    .addPlugin(RavenVue, Vue)
    .install();

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

router.beforeEach(({ meta, path }, from, next) => {
    if (path == '/sign-in' || path == '/main' || store.getters.isLogin) {
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
