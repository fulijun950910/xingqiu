import Vue from 'vue';
import App from './app';
require('vendor/polyfill');
import mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(mint);
Vue.prototype.$toast = message => mint.Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = mint.Indicator;
Vue.prototype.$messageBox = mint.MessageBox;

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
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';

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
window.$Router = router;
router.beforeEach(({ meta, path }, from, next) => {
    window.scrollTo(0, 0);
    if (path == '/sign-in' || store.getters.isLogin) {
        try {
            window._hmt.push(['_trackPageview', '/service/customer-profiles.html#' + path]);
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
