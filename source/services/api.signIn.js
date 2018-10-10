import request from './request_new.js';

export default {
    auth: function(data) {
        var url = '/api/auth/form';
        return request(url, 'post', data);
    },
    listEmployee: function(data) {
        var url = '/api/employee/list/account/' + data.userId;
        return request(url, 'get', data);
    },
    bind: function(data) {
        var url = '/api/wechatbusinessassists/bind';
        return request(url, 'post', data);
    },
    findByOpenId: function() {
        var url = '/api/wechat/find';
        return request(url, 'get');
    },
    emplogin: function(data) {
        var url = '/api/employee/login/' + data.empid;
        return request(url, 'put', data);
    },
    listEmployeeStoreList: function(data) {
        var url = '/api/store/list/' + data.merchantId + '/employee/' + data.employeeId;
        return request(url, 'get', data);
    },
    getVerificationcode: function(phone) { // 获取验证码
        var url = '/api/wechatBusinessMarketing/verificationcode/' + phone;
        return request(url, 'get');
    },
    loginBySaasEmployee: function(id) { //
        var url = `/api/party/loginBySaasEmployee/${id}`;
        return request(url, 'PUT');
    },
    getEmployeeInfo: function(searchData) {
        var url = '/api/employeeInfo';
        return request(url, 'get', null, true, { searchData: searchData });
    },
    getPermission(employeeId) {
        return request(`/api/employee/permission/${employeeId}`);
    },
    getNounConfig(merchantId) {
        return request(`/api/nounConfig/list/${merchantId}`);
    }
};
