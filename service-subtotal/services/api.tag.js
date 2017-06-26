import request from './request.js';

export default {
    /**
     * 查询会员标签列表
     */
    getMemberTagList: function(merchantId, memberId) {
        let url = `/api/tagLib/memberTagList/${merchantId}/${memberId}`;
        return request(url);
    }
};
