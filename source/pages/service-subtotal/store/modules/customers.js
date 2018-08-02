import apiCustomer from 'services/api.customer';

export default {
    namespaced: true,
    state: {
        // 当前客户
        currentCustomer: {},
        // 商户短信
        smsMerchant: {}
    },
    mutations: {
        UPDATE_STATE(state, data) {
            if (data) {
                Object.assign(state, data);
            }
        },
        REMOVE_TAG(state, tagIds) {
            state.currentCustomer.tags = state.currentCustomer.tags.filter(x => !tagIds.includes(x.id));
        }
    },
    getters: {
        currentCustomerTags: state => state.currentCustomer.tags
    },
    actions: {
        // 加载当前用户详情
        async LOAD_CURRENT_CUSTOMER({ commit, state }, {
            customerId,
            refresh = true
        }) {
            try {
                if (!customerId) {
                    return Promise.reject({
                        message: '执行[customers/LOAD_CURRENT_CUSTOMER]action时缺少客户Id'
                    });
                }
                customerId = window.parseInt(customerId);
                if (state.currentCustomer && state.currentCustomer.id === customerId && !refresh) {
                    return Promise.resolve(state.currentCustomer);
                }
                let { data } = await apiCustomer.customerInfo(customerId);
                commit('UPDATE_STATE', { currentCustomer: data || {} });
                return Promise.resolve(data);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        // 加载客户标签库
        async LOAD_CUSTOMER_TAGS({ commit, state }, customerId) {
            try {
                let { data } = await apiCustomer.customerTags();
                return Promise.resolve(data);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        // 加载客户标签库
        async LOAD_MERCHANT_SMS({ commit, rootGetters }) {
            try {
                let { data } = await apiCustomer.customerSmsCount(rootGetters.merchantId);
                commit('UPDATE_STATE', { smsMerchant: data || {} });
                return Promise.resolve(data);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
};
