export default {
    merchantId: state => state.merchant.id,
    merchantName: state => state.merchant.name,
    storeId: state => state.store.id,
    storeName: state => state.store.name,
    isLogin: state => Boolean(state.user.id),
    isPersonLogin: state => Boolean(!state.user.id && state.party && state.party.partyId),
    storeIds: state => {
        return state.storeList
            .map(val => {
                return val.id;
            })
            .toString();
    },
    admin: state => {
        try {
            if (state.merchantRole.permissionPackage.permissions.indexOf('wechat_business_admin') != -1) {
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    },
    employeeId: state => state.user.id,
    employeeName: state => state.user.name,
    permissionStoreAll: state => state.merchantRole.permissionPackage && state.merchantRole.permissionPackage.permissionStoreAll,
    queryStoreIds: state => {
        if (state.merchantRole.permissionPackage && state.merchantRole.permissionPackage.permissionStoreAll) {
            return '';
        }
        return state.storeList
            .map(val => {
                return val.id;
            })
            .toString();
    },
    permissions: state => {
        return state.merchantRole.permissionPackage ? state.merchantRole.permissionPackage.permissions : [];
    },
    nounName: state => label => {
        let item = state.nounList.find(val => val.label === label);
        if (item) {
            return item.value;
        }
    }
};
