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
Vue.prototype.$wxb_url = process.env.NODE_ENV === 'production' ? 'http://assistant.mei1.info' : 'http://wxbus.mei1.com';
Vue.prototype.$rootPath = process.env.NODE_ENV === 'development' ? '/' : '/service/';
Vue.prototype.$getSignLocation = search => {
    let ref = '';
    if (search) {
        ref = process.env.NODE_ENV === 'development' ? search + '#/sign-in' : '/userinfo.html' + search + '#/user_login';
    } else {
        ref = process.env.NODE_ENV === 'development' ? '#/sign-in' : '/userinfo.html#/user_login';
    }
    return ref;
};
Vue.prototype.$enviroment = process.env.NODE_ENV;

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
// iconfont项目 saas-wechat-business
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
    document.addEventListener(
        'DOMContentLoaded',
        function() {
            FastClick.attach(document.body);
        },
        false
    );
}

// 更新登录人信息至Vuex
store.commit('UPDATE_LOCAL');
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
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

// ................................................
import reLogin from './models/relogin';
import Q from 'q';
import api_signIn from 'services/api.signIn';

let checkUser = async () => {
    var deferred = Q.defer();
    let res = await api_signIn.getEmployeeInfo();
    if (res.success && res.data) {
        let a = await reLogin.select(JSON.stringify(res.data));
        if (a) {
            store.commit('UPDATE_LOCAL');
            deferred.resolve(a);
        } else {
            window.location.href = Vue.prototype.$getSignLocation(`?openid=${store.state.user.openId}`);
        }
    } else {
        window.location.href = Vue.prototype.$getSignLocation(`?openid=${store.state.user.openId}`);
    }
    return deferred.promise;
};

router.beforeEach(async ({ meta, path }, from, next) => {
    if (!meta.auth) {
        // 不需要授权页面
        next();
    } else {
        // 加载用户基础数据
        if (!store.state.isInit) {
            Indicator.open();
            try {
                await store.dispatch('updateBaseData');
            } catch (error) {}
            Indicator.close();
        }
        if (store.getters.isLogin) {
            next();
        } else if (process.env.NODE_ENV === 'development') {
            next({ name: 'sign-in' });
        } else {
            let res = await checkUser();
            if (res) {
                next();
            } else {
                window.location.href = Vue.prototype.$signLocation;
            }
        }
    }
    try {
        let url = location.href.split('.com')[1];
        if (url) window._hmt.push(['_trackPageview', url]);
    } catch (e) {}
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
