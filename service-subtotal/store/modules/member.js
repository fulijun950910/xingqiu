import * as types from 'store/mutations-types';
import api_member from 'services/api.member';

const SEND_PARAMS_LOCAL_KEY = 'SEND_PARAMS_LOCAL_KEY';
const SEND_CONTENT_LOCAL_KEY = 'SEND_CONTENT_LOCAL_KEY';

const state = {
    sources: [],
    sendParams: JSON.parse(localStorage.getItem(SEND_PARAMS_LOCAL_KEY)) || null,
    sendContent: JSON.parse(localStorage.getItem(SEND_CONTENT_LOCAL_KEY)) || null
};
const getters = {};

const actions = {
    [types.FETCH_MEMBER_SOURCES](context, merchantId) {
        api_member.getSources(merchantId).then(res => {
            context.commit(types.FETCH_MEMBER_SOURCES, res.data);
        });
    }
};

const mutations = {
    [types.FETCH_MEMBER_SOURCES](state, payload) {
        state.sources = payload;
    },
    [types.UPDATA_SEND_SMS_PARAMS](state, payload) {
        state.sendParams = payload;
        localStorage.setItem(SEND_PARAMS_LOCAL_KEY, payload ? JSON.stringify(payload) : null);
    },
    [types.UPDATA_SEND_SMS_CONTENT](state, payload) {
        state.sendContent = payload;
        localStorage.setItem(SEND_CONTENT_LOCAL_KEY, payload ? JSON.stringify(payload) : null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
