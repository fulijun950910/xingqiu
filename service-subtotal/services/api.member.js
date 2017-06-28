import request from './request.js';

export default {
    // 查询会员详情
    getMemberById: function(id) {
        var url = `/api/wechatbusinessassists/member/${id}`;
        return request(url);
    }
};
