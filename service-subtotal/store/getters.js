export default {
    merchantId: state => state.merchant.id,
    merchantName: state => state.merchant.name,
    storeId: state => state.store.id,
    storeName: state => state.store.name,
    isLogin: state => Boolean(state.user.id),
    storeIds: state => {
        var storeIds = [];
        for (var i = 0, len = state.storeList.length; i < len; i++) {
            storeIds.push(state.storeList[i].id);
        }
        return storeIds.toString();
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
    permissionStoreAll: state => state.merchantRole.permissionPackage.permissionStoreAll,
    queryStoreIds: state => {
        if (this.permissionStoreAll) {
            return '';
        }
        return this.storeIds;
    }
};
