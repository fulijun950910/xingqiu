import request from './request.js';

export default {
    auth: function(data) {
        var url = '/api/auth/form';
        return request(url, data, 'post');
    },
    listEmployee: function(data) {
        var url = '/api/employee/list/account/' + data.userId;
        return request(url, data, 'get');
    },
    bind: function(data) {
        var url = '/api/wechatbusinessassists/bind';
        return request(url, data, 'post');
    },
    findByOpenId: function() {
        var url = '/api/wechat/find';
        return request(url, null, 'get');
    },
    emplogin: function(data) {
        var url = '/api/employee/login/' + data.empid;
        return request(url, data, 'put');
    },
    listEmployeeStoreList: function(data) {
        var url = '/api/store/list/' + data.merchantId + '/employee/' + data.employeeId;
        return request(url, data, 'get');
    },
    getVerificationcode: function(phone) { // 获取验证码
        var url = '/api/wechatBusinessMarketing/verificationcode/' + phone;
        return request(url, null, 'get');
    },
    loginBySaasEmployee: function(id) { // 获取验证码
        var url = `/api/party/loginBySaasEmployee/${id}`;
        return request(url, null, 'PUT');
    }
};
