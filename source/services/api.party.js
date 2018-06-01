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
    getBbsList(data) {
        let url = `/api/bbs/list/${data.partyId}/${data.page}/${data.size}`;
        return request(url, 'get');
    },
    getMissionList(partyId) {
        let url = `/api/mission/getListByPartyId/${partyId}`;
        return request(url, 'get');
    },
    firstLoginGift(data) {
        let url = `/api/party/firstLoginGift/${data.partyId}/${data.userId}`;
        return request(url, 'post');
    },
    goodsList(type) {
        /**
         * 获取充值列表
         * 商品类型 1：短信充值 2：购买短信签名 3：购买沙龙入场券 4：购买硬件 5：购买服务 6：充值豆豆
         * **/
        let url = '/api/goods/list/' + type;
        return request(url, 'get');
    },
    doudouTrade(data) {
        /**
         * 豆豆消费
         */
        let url = '/api/doudouTrade';
        return request(url, 'post', data);
    },
    doudouAccount(partyId) {
        /**
         * 查询豆豆余额
         */
        let url = `/api/account/${partyId}`;
        return request(url, 'get');
    }
};
