import request from './request.js';

export default {
    // 美店首页信息查询
    getPurchaseMerchantIndexInfo(data) {
        let url = `/api/purchaseMallItem/getPurchaseMerchantIndexInfo`;
        return request(url, data, 'post');
    },
    // 查询首页商品列表
    searchForWx(data) {
        let url = `/api/supplierGoods/searchForWx`;
        return request(url, data, 'post');
    },
    // 查询商品详情
    getSupplierGoods(id) {
        let url = `/api/supplierGoods/${id}`;
        return request(url, null, 'get');
    },
    // 下单
    // 查询订单
    supplierOrder(data) {
        let url = `/api/supplierOrder`;
        return request(url, data, 'post');
    },
    // 订单列表查询
    searchSupplierOrderList(data) {
        let url = `/api/supplierOrder/search`;
        return request(url, data, 'post');
    },
    // 发票相关
    // 新增发票
    editInvoice(data) {
        let url = `/api/invoice`;
        let method = 'post';
        if (data.id) {
            method = 'put';
        }
        return request(url, data, method);
    },
    // 发票列表
    queryInvoice(merchantId) {
        let url = `/api/invoice/list/${merchantId}`;
        return request(url, null, 'get');
    }
};
