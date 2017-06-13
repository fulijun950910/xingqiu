import request from './request.js';

export default {
    queryCollectDetailed(data) {
        let url = '/api/wechatBusinessMarketing/collectDetailed/' + data.merchantId + '/' + data.storeId + '/' + data.collectId;
        return request(url, data, 'get');
    },
    queryAccoundRecordsDetailed(data) {
        let url = '/api/wechatBusinessMarketing/accoundRecordsDetailed/' + data.merchantId + '/' + data.storeId + '/' + data.accountId;
        return request(url, data, 'get');
    },
    queryVerifyTicketDetailed(data) {
        let url = '/api/wechatBusinessMarketing/verifyTicketDetailed/' + data.merchantId + '/' + data.storeId + '/' + data.accountId;
        return request(url, data, 'get');
    },
    recordOrder(data) {
        let url = '/api/wechatBusinessMarketing/recordOrder';
        return request(url, data, 'post');
    },
    updateRecordOrder(data) {
        let url = '/api/wechatBusinessMarketing/orderUpdate';
        return request(url, data, 'post');
    }
};
