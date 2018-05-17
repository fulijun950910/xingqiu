import request from './request_new.js';
export default {
    listLastUserSign(partyId) {
        let url = `/api/party/listLastUserSign/${partyId}`;
        return request(url, 'GET');
    },
    userSign(partyId, userId) {
        let url = `/api/party/userSign/${partyId}/${userId}`;
        return request(url, 'PUT');
    },
    getAccount(partyId) {
        let url = `/api/account/${partyId}`;
        return request(url, 'GET');
    },
    getAccountList(data) {
        let url = '/api/accountChangeRecord/search';
        return request(url, 'post', data);
    },
    getEmployee(employeeId) {
        let url = `/api/employee/${employeeId}`;
        return request(url, 'get');
    },
    newPassword(data) {
        let url = '/api/authUser/newPassword';
        return request(url, 'put', data);
    },
    changeEmpData(data) {
        let url = '/api/employee/simple';
        return request(url, 'put', data);
    },
    unbind(data) {
        let url = '/api/wechatbusinessassists/unbind';
        return request(url, 'post', data);
    },
    getBbsList(partyId) {
        let url = `/api/bbs/list/${partyId}`;
        return request(url, 'get');
    },
    getMissionList(partyId) {
        let url = `/api/mission/getListByPartyId/${partyId}`;
        return request(url, 'get');
    }
};
