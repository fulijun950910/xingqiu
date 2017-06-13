import request from './request.js';

export default {
    merchantIncome(data) {
        let url = '/api/wechatBusinessMarketing/merchantIncome/' + data.merchantId + '/' + data.storeId;
        return request(url, null, 'get');
    },
    merchantIncomeDetailed(data) {
        let url = '/api/wechatBusinessMarketing/merchantIncomeDetailed/' + data.merchantId + '/' + data.storeId;
        return request(url, null, 'get');
    },
    queryGroupTotal(data) {
        let url = '/api/wechatBusinessMarketing/interveneGroupTotal/' + data.merchantId;
        return request(url, null, 'get');
    },
    interveneGroupList(data) {
        let url = '/api/wechatBusinessMarketing/interveneGroupList/' + data.merchantId;
        return request(url, null, 'get');
    },
    promotionCustomerBuy(data) {
        let url = '/api/wechatBusinessMarketing/promotionCustomerBuy/' + data.merchantId;
        return request(url, null, 'get');
    },
    querySmsMerchant(data) {
        let url = '/api/smsmerchants/find/' + data.merchantId;
        return request(url, null, 'get');
    },
    queryPromotionAmount(data) {
        let url = '/api/wechatBusinessMarketing/promotionAmount/' + data.merchantId;
        return request(url, null, 'get');
    }
};
