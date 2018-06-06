import * as types from './mutations-types';

var getLocalInfo = () => {
    let employee = null;
    try {
        employee = JSON.parse(localStorage.getItem('employee'));
    } catch (e) {
        employee = null;
    }

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
        data.party = employee.party;
        data.merchant = employee.merchant;
        data.storeList = employee.storeList;
        data.storeList.forEach((item) => {
            item.value = item.id;
        });
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
    }
};
