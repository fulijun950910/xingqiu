import * as types from 'store/mutations-types';

var getLocalInfo = () => {
    let employee = JSON.parse(localStorage.getItem('employee')) || null;
    var data = {
        user: {},
        merchant: {},
        storeList: [],
        organization: {},
        merchantRole: {},
        skills: [],
        store: {}
    };
    if (employee) {
        data.user = {
            id: employee.id,
            userId: employee.userId,
            name: employee.name,
            code: employee.code,
            phone: employee.phone,
            avatarFileId: employee.avatarFileId,
            titleId: employee.titleId,
            openId: employee.openId,
            storeIds: employee.storeIds,
            role: employee.role
        };
        data.merchant = employee.merchant;
        data.storeList = employee.storeList;
        data.organization = employee.organization;
        data.merchantRole = employee.merchantRole;
        data.skills = employee.skills;
        if (employee.store && employee.store.id) {
            data.store = employee.store;
            if (!employee.storeList.length) {
                employee.storeList.push(employee.store);
            }
        } else if (employee.storeList.length) {
            data.store = employee.storeList[0];
        }
    }
    return data;
};

export default {
    [types.UPDATE_LOCAL](state) {
        Object.assign(state, getLocalInfo());
    }, [types.SIGN_OUT](state) {
        state.user = {};
    }, [types.UPDATE_PROMOTION_TYPES](state, payload) {
        if (payload) {
            state.promotionTypes = payload;
        } else {
            state.promotionTypes = [];
        }
    }, [types.UPDATE_STORE_DETAIL](state, payload) {
        let employee = JSON.parse(localStorage.employee);
        if (payload && payload.id && employee.storeList) {
            if (employee && employee.store && employee.store.id == payload.id) {
                Object.assign(employee.store, payload);
            };
            let i = employee.storeList.findIndex(function(value) {return value.id == payload.id;});
            if (i || i === 0) {
                Object.assign(employee.storeList[i], payload);
            };
            localStorage.setItem('employee', JSON.stringify(employee));
            Object.assign(state, getLocalInfo());
        }
    }
};
