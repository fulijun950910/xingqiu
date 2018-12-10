import request from './request.js';

export default {
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
    }
};