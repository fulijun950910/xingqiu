import request from './request.js';

export default {
    collectRecords(data) {
        var url = '/api/wechatBusinessMarketing/collectRecords';
        return request(url, data, 'post');
    },
    accountRecords(data) {
        var url = '/api/wechatBusinessMarketing/accountRecords';
        return request(url, data, 'post');
    },
    verifyTicketOrders(data) {
        var url = '/api/wechatBusinessMarketing/getVerifyTicketOrders';
        return request(url, data, 'post');
    }
};
