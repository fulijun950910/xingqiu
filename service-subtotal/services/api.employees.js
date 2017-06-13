import request from './request.js';

export default {
    queryEmployees(data) {
        let url = '/api/wechatBusinessMarketing/getEmployees/' + data.merchantId;
        return request(url, null, 'get');
    }
};
