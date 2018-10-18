export default {
    state: {
        detail: null
    },
    mutations: {
        customerDetailUpdate(state, customerInfo) {
            state.detail = customerInfo;
        }
    },
    getters: {}
};
