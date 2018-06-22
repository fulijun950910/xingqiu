import request from './request.js';

export default {
    // 1. 活动查询
    view(data) {
        var url = `/api/b2bPromotionMobile/view/${data.id}`;
        return request(url, data, 'get');
    },
    // 2.login登陆
    login(data) {
        var url = `/api/party/loginByOpenId/${data.openid}`;
        return request(url, null, 'put');
    },
    // 3.login登陆
    purchase(data) {
        var url = '/api/b2bGroupJoin/purchase';
        return request(url, data, 'post');
    }
};
