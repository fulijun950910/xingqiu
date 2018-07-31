import apiCustomer from 'services/api.customer';

export default {
    namespaced: true,
    state: {
        currentCustomer: {}
    },
    mutations: {
        UPDATE_STATE(state, data) {
            console.info(state);
            if (data) {
                Object.assign(state, data);
            }
        }
    },
    getters: {
    },
    actions: {
        async LOAD_CURRENT_CUSTOMER({ commit, state }, customerId) {
            try {
                let { data } = await apiCustomer.customerInfo(customerId);
                commit('UPDATE_STATE', { currentCustomer: data || {} });
                return Promise.resolve(data);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
};
