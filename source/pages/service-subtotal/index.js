import Vue from 'vue';
import App from './app';
require('vendor/polyfill');
import 'mint-ui/lib/style.css';
import { Toast, Indicator, MessageBox } from 'mint-ui';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;

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

// 常用函数
Vue.prototype.$knife = knife;

// 图标组件
// iconfont库 saas-wechat-business
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

router.beforeEach(({ meta, path }, from, next) => {
    if (path == '/sign-in' || store.getters.isLogin) {
        next();
    } else {
        if (process.env.NODE_ENV === 'development') {
            next({ name: 'sign-in' });
        } else {
            window.location.href = '/userinfo.html#/user_login';
        }
    }
    // 百度统计
    try {
        let url = location.href.replace('https://assistant.mei1.info', '').replace('https://wxbus.mei1.com', '');
        if (url && url.indexOf('/') === 0) window._hmt.push(['_trackPageview', url]);
    } catch (e) {};
});
// 全局统计事件
Vue.mixin({
    methods: {
        _trackEvent(category, action, opt_label, opt_value) {
            try {
                window._hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
            } catch (error) {
                console.log(error);
            }
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
