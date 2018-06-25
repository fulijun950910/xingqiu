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
    },
    productDetail(id) {
        /**
         * 商品详情
         */
        let url = `/api/goods/${id}`;
        return request(url, 'get');
    },
    addressSearch(parameter) {
        /**
         * 地址列表筛选
         */
        let url = '/api/deliveryAddress/search';
        return request(url, 'post', parameter);
    },
    getProvince() {
        /**
         * 获取省份
         */
        let url = '/api/administrativeArea/topAreas';
        return request(url, 'get');
    },
    getCity(id) {
        /**
         * 获取城市
         */
        let url = `/api/administrativeArea/areas/${id}`;
        return request(url, 'get');
    },
    getTown(id) {
        /**
         * 获取城市
         */
        let url = `/api/administrativeArea/areas/${id}`;
        return request(url, 'get');
    },
    deliveryAddress(parameter) {
        /**
         * 保存收货地址
         */
        let url = '/api/deliveryAddress';
        let type = 'post';
        if (parameter.id) {
            type = 'put';
        };
        return request(url, type, parameter);
    },
    deleteAddress(id) {
        /**
         * 删除收货地址
         */
        let url = `/api/deliveryAddress/${id}`;
        return request(url, 'delete');
    },
    storeList(merchantId, employeeId) {
        /**
         * 查询门店列表
         */
        let url = `/api/store/list/${merchantId}/employee/${employeeId}`;
        return request(url, 'get');
    },
    getAddress(id) {
        // 获取地址详情
        let url = `/api/deliveryAddress/${id}`;
        return request(url, 'get');
    },
    getDefaultAddress(partyId, id) {
        // 默认地址
        let url = `/api/deliveryAddress/getDefault/${partyId}/${id}`;
        return request(url, 'get');
    },
    orderList(parameter) {
        // 订单列表
        let url = '/api/doudouTrade/search';
        return request(url, 'post', parameter);
    },
    getTaskList(partyId) {
        let url = `/api/mission/getListByPartyId/${partyId}`;
        return request(url, 'get');
    },
    addIntroduction(parameter) {
        // 推荐商户保存
        let url = '/api/introduction';
        let type = '';
        if (parameter.id) {
            type = 'put';
        } else {
            type = 'post';
        };
        return request(url, type, parameter);
    },
    searchIndustry() {
        // 行业查询
        let url = '/api/businessScope/list';
        return request(url, 'get');
    },
    serchIntroduction(parameter) {
        // 转介绍列表
        let url = '/api/introduction/search';
        return request(url, 'post', parameter);
    },
    cancelOrder(id) {
        // 取消订单
        let url = `/api/doudouTrade/cancel/${id}`;
        return request(url, 'get');
    },
    confirmOrder(id) {
        // 取消订单
        let url = `/api/doudouTrade/confirm/${id}`;
        return request(url, 'get');
    },
    repay(id) {
        // 再次支付
        let url = `/api/doudouTrade/repay/${id}`;
        return request(url, 'get');
    },
    notShowAds(parameter) {
        // 取消显示广告位
        let url = `/api/party/notShowAds/${parameter.partyId}/${parameter.userId}/${parameter.adsId}`;
        return request(url, 'post');
    },
    listBanner(postion, userId) {
        // 广告位
        let url = `/api/ads/listBanner/${postion}/${userId}`;
        return request(url, 'get');
    }
};
