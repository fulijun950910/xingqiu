import * as types from 'store/mutations-types';
import api_member from 'services/api.member';

const state = {
    list: []
};
const getters = {};

const actions = {
    [types.FETCH_EMPLOYEES](context, storeId) {
        api_member.getEmployees(storeId).then(res => {
            context.commit(types.FETCH_EMPLOYEES, res.data);
        });
    }
};

const mutations = {
    [types.FETCH_EMPLOYEES](state, payload) {
        state.list = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
