import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import customers from './modules/customers';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        customers
    },
    state,
    mutations,
    actions,
    getters
});
