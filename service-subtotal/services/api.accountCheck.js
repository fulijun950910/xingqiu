import request from './request.js';

export default {
    merchantAccountCheck(data) {
        var url = '/api/wechatBusinessMarketing/merchantAccountCheck/' + data.merchantId + '/' + data.storeId;
        return request(url, null, 'get');
    }
};
