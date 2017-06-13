import Vue from 'vue';
import App from './app';
require('babel-polyfill');

import { Toast, Indicator, MessageBox } from 'mint-ui';

Vue.prototype.$toast = message => Toast({ message: message, duration: 1500 });
Vue.prototype.$indicator = Indicator;
Vue.prototype.$messageBox = MessageBox;

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Q from 'q';
import Big from 'big.js';
import routes from 'config/routes';
import Api from 'services/api';
import attachFastClick from 'fastclick';
import 'styles/_style.less';
import 'filter/filter';
import 'directives/directive';
import 'styles/fonts/iconfont';
import 'styles/fonts/iconfont-advertorial';
import touch from 'directives/touch';
import store from './store';

attachFastClick.attach(document.body);

var env = require('signPath');

Vue.use(touch);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.prototype.$q = Q;
Vue.prototype.$big = Big;
Vue.prototype.$api = Api;
Vue.prototype.$GlobalWidth = 750; // 全局宽度，暂用于生成二维码适应屏幕
Vue.prototype.$GlobalMaxScale = 540; // 全局最大缩放比
Vue.prototype.$signLocation = env.signPath;
Vue.prototype.$registerLocation = env.registerPath;

store.commit('UPDATE_LOCAL');

const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

router.beforeEach(({ meta, path }, from, next) => {
    // if 登录页 或者 注册页 || 已登录 并且 营销版
    // else 跳转登录页
    if ((path == '/sign' || path == '/register') || (store.getters.isLogin && store.state.merchant.functionVersion)) {
        next();
    } else {
        if (Vue.prototype.$signLocation == '#/sign') {
            next({ path: '/sign' });
        } else {
            window.location.href = Vue.prototype.$signLocation;
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
