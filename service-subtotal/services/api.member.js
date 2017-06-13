import request from 'services/request.js';
import api_file from 'services/api.file';
import Q from 'q';

export default {
    // 会员列表
    getMembers: function(data) {
        var url = '/api/wechatBusinessMarketing/getMemberList';
        return request(url, data, 'post');
    },
    // 筛选条件(标签和来源)
    getTagAndSourceList: function(merchantId) {
        var url = `/api/wechatBusinessMarketing/tagAndSourceList/${merchantId}`;
        return request(url);
    },
    // 会员详情
    getMember: function(memberId) {
        var url = `/api/wechatBusinessMarketing/getMemberDetail/${memberId}`;
        return request(url);
    },
    // 更新/新增会员
    updateMember: function(data, avatar) {
        var deferred = Q.defer();
        api_file.uploadImage(avatar).then(function(res) {
            data.avatarId = res.data;
            var url = '/api/member';
            var method = 'post';
            if (data.id) {
                url = '/api/wechatBusinessMarketing/updateMember';
            }
            request(url, data, method).then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    // 删除会员
    delMember: function(memberId) {
        var url = `/api/member/${memberId}`;
        return request(url, null, 'delete');
    },
    // 员工列表
    getEmployees: function(storeId) {
        var url = `/api/employee/list/store/${storeId}`;
        return request(url);
    },
    // 渠道列表
    getSources: function(merchantId) {
        var url = `/api/source/list/${merchantId}`;
        return request(url);
    },
    // 标签列表
    getTags: function(merchantId) {
        var url = `/api/wechatBusinessMarketing/tagList/${merchantId}`;
        return request(url);
    },
    // 标签新增
    createTag: function(data) {
        var url = '/';
        return request(url, data, 'post');
    },
    // 员工新增
    createEmployee: function(data) {
        var url = '/';
        return request(url, data, 'post');
    },
    // 发送短信
    smssends: function(data) {
        var url = '/api/smssends/submit';
        return request(url, data, 'post');
    },
    // 商户短信信息
    smsmerchants: merchantId => {
        var url = `/api/smsmerchants/find/${merchantId}`;
        return request(url);
    },
    // 短信购买 type 0 1000 98, 1 3000 240, 2 6000 480, 3 10000 800
    smspurchases: (merchantId, type) => {
        var url = `/api/smspurchases/paywxqr/${merchantId}/${type}?url=${encodeURIComponent(window.location.href)}`;
        return request(url);
    }
};
