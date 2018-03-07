import request from './request.js';

export default {
    getStoreInfo(id) {
        var url = `/api/store/${id}`;
        return request(url, null, 'get');
    },
    getAppointment(id) { // 获取预约详细信息
        var url = `/api/appointment/${id}`;
        return request(url, null, 'get');
    },
    updateAppointment(data) { // 更新预约详细信息
        var url = '/api/appointment/updateByWechat';
        return request(url, data, 'post');
    },
    submitAppointment(appointmentId, type) { // 获取预约详细信息
        var url = `/api/appointment/updateStatus/${appointmentId}/${type}`;
        return request(url, null, 'put');
    },
    queryTransferTradeDetail(orderNo) { // 获取预约详细信息
        var url = `/api/collect/transferTradeDetail/${orderNo}`;
        return request(url, null, 'get');
    },
    submitTransferTrade(data) { // 获取预约详细信息
        var url = '/api/collect/transfer';
        return request(url, data, 'post');
    }
};
