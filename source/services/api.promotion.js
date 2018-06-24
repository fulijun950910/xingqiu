import request from './request_new.js';

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
    },
    // 3.获得活动团列表
    getGroupJoinList(data) {
        var url = '/api/b2bGroupJoin/getGroupJoinList';
        return request(url, data, 'post');
    },
    // 4.获取团详情
    getGroupDetail(groupJoinId) {
        var url = `/api/b2bGroupJoin/getGroupDetail/${groupJoinId}`;
        return request(url, null, 'get');
    },
    // 5.查询我的团拼记录
    getMyGroupJoinList(data) {
        var url = '/api/b2bGroupJoin/getMyGroupJoinList';
        return request(url, data, 'post');
    },
    // 6.查询我的团拼记录
    getOrderList(data) {
        var url = '/api/b2bPromotionMobile/getOrderList';
        return request(url, data, 'post');
    },
    // 7.查询物流信息
    getOrderExpressDetail(data) {
        var url = '/api/b2bPromotionMobile/getOrderExpressDetail';
        return request(url, data, 'post');
    }
};
