import request from './request.js';

export default {
    // 1. 活动查询
    view(data) {
        var url = '/api/promotionMobile/view';
        return request(url, data, 'POST');
    }
};
