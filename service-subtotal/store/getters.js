export default {
    merchantId: state => state.merchant.id,
    merchantName: state => state.merchant.name,
    storeId: state => state.store.id,
    storeName: state => state.store.name,
    isLogin: state => Boolean(state.user.id)
};
