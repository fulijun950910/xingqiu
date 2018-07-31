export default {
    namespaced: true,
    state: {
        detail: {}
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
        avatar: state => state.detail.avatarId
    }
};
