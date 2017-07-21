import request from './request.js';

export default {
    getDrawMoneyDetail(merchantId, drawMoneyId) {
        var url = `/api/wechatbusinessassists/getDrawMoneyDetail/${merchantId}/${drawMoneyId}`;
        return request(url);
    }
};
