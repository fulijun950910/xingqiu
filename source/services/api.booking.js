import request from './request.js';

export default {
    searchItem(data) {
        var url = '/api/serviceItem/search';
        if (data && data.query) {
            for (var i = 0; i < data.query.length; i++) {
                if (!data.query[i].value) {
                    data.query.splice(i, 1);
                    i--;
                }
            }
            return request(url, data, 'post');
        }
    },
    getStoreInfo(id) {
        var url = `/api/store/${id}`;
        return request(url, null, 'get');
    },
    getAppointment(data) {
        // 获取预约详细信息
        var url = `/api/appointment/${data.id}`;
        if (data.search) {
            url += data.search;
        }
        return request(url, null, 'get');
    },
    updateAppointment(data) {
        // 更新预约详细信息
        var url = '/api/appointment/updateByWechat';
        return request(url, data, 'post');
    },
    submitAppointment(appointmentId, type) {
        // 获取预约详细信息
        var url = `/api/appointment/updateStatus/${appointmentId}/${type}`;
        return request(url, null, 'put');
    },
    queryTransferTradeDetail(orderNo) {
        // 获取预约详细信息
        var url = `/api/collect/transferTradeDetail?orderNo=${orderNo}`;
        return request(url, null, 'get');
    },
    submitTransferTrade(data) {
        // 获取预约详细信息
        var url = '/api/collect/transfer';
        return request(url, data, 'post');
    },
    bookingSearch(params) {
        return request('/api/appointment/search', params, 'post');
    },
    getEmployees(storeId) {
        return request(`/api/employee/list/store/${storeId}`);
    },
    getRooms(merchantId, storeId) {
        return request(`/api/room/list/${merchantId}/${storeId}`);
    },
    saveBooking(params) {
        return request('/api/appointment', params, params.appointmentId ? 'put' : 'post');
    },
    memberSearch(params) {
        return request('/api/member/bill/list/search', params, 'post');
    },
    itemCategory(params) {
        return request('/api/serviceItemCategory/selectTree', params, 'post');
    },
    itemSearch(params) {
        return request('/api/serviceItem/search', params, 'post');
    },
    cancelBooking(bookingId) {
        return request(`/api/appointment/updateStatus/${bookingId}/2`, null, 'put');
    },
    confirmBooking(bookingId) {
        return request(`/api/appointment/updateStatus/${bookingId}/1`, null, 'put');
    },
    memberLastConsume(memberId) {
        return request(`/api/member/detail/${memberId}`, null, 'get', false);
    },
    createGeust(data) {
        return request('/api/guest', data, data.id ? 'put' : 'post');
    }
};
