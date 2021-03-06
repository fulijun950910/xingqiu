import request from './request.js';

export default {
    memberList(data) {
        let url = '/api/member/list/search';
        return request(url, data, 'POST');
    },
    memberDetail(memberId) {
        let url = `/api/member/${memberId}`;
        return request(url);
    },
    memberListSearch(data) {
        let url = '/api/member/bill/list/search';
        return request(url, data, 'POST');
    },
    // 账户资产(卡：cards 券：tickets 赠品：presents)
    memberDetailAssets(memberId) {
        let url = `/api/member/detailInfo/${memberId}`;
        return request(url);
    },
    // 护理记录、关怀回访
    serviceCenter(data) {
        let url = '/api/wechatbusinessassists/messageServiceCenter';
        return request(url, data, 'POST');
    }
};
