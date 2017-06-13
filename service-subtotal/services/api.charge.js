import request from './request.js';

export default {
    getPayUrl: function(data) {
        var url = '/api/wechatBusinessMarketing/payUrl/' + data.merchantId + '/' + data.storeId;
        return request(url, null, 'get', false);
    },
    accountRecordsCreate: function(data) {
        var url = '/api/wechatBusinessMarketing/accountRecordsCreate';
        return request(url, data, 'post');
    }
};
