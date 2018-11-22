import request from './request.js';

export default {
    // 查询会员详情
    getMemberById: function(id) {
        var url = `/api/wechatbusinessassists/member/${id}`;
        return request(url);
    },
    // 到店客人列表
    getArrivalMember(data) {
        let url = '/api/wechatbusinessassists/getConsumers';
        return request(url, data, 'post');
    },
    //
    getMemberDetail(data) {
        let url = '/api/member/' + data;
        return request(url, data);
    },
    getMemberLastOrder(memberId, merchantId) {
        let url = `/api/wechatbusinessassists/getMemberLastOrder/${memberId}/${merchantId} `;
        return request(url);
    }
};
