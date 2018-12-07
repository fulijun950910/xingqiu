import request from './request.js';

export default {
    searchForWx(data) {
        let url = `/api/supplierGoods/searchForWx`;
        return request(url, data, 'post');
    }
};
