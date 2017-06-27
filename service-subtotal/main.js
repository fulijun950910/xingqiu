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
import 'filter/moment-filter';
import 'directives/directive';
import 'styles/fonts/iconfont';
import knife from 'vendor/knife';
import mIcon from 'components/m-icon';
Vue.prototype.$knife = knife;
Vue.component('m-icon', mIcon);

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

store.commit('UPDATE_LOCAL');

router.beforeEach(({ meta, path }, from, next) => {
    if (path == '/sign-in' || store.getters.isLogin) {
        next();
    } else {
        next({name: 'sign-in'});
        // TODO: 调整登录页
        // window.location.href = '';
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
