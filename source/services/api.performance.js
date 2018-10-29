import request from './request.js';

export default {
    getPerformance(data) {
        let url = '/api/wechatbusinessassists/orderList';
        return request(url, data, 'post');
    },
    getOrderDetail(data) {
        let url = '/api/order/' + data;
        return request(url, 'get');
    }
};
