import request from './request.js';

export default {
    getMemberLastOrder(memberId, merchantId) {
        let url = `/api/wechatbusinessassists/getMemberLastOrder/${memberId}/${merchantId}`;
        return request(url);
    },
    getMemberServiceList(data) {
        let url = `/api/wechatbusinessassists/memberServiceList`;
        return request(url, data, 'post');
    }
};
