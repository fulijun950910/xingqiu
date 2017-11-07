import request from './request.js';

export default {
    /**
     * 查询会员和平台标签列表
     */
    getMemberTagList: function(merchantId, memberId) {
        let url = `/api/tagLib/memberTagList/${merchantId}/${memberId}`;
        return request(url);
    },
    /**
     * 添加会员标签
     */
    createMemberTag: function(tag) {
        let url = '/api/tagLib/create';
        return request(url, tag, 'post');
    }
};
