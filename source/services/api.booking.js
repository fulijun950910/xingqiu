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
            };
            return request(url, data, 'post');
        }
    },
    getStoreInfo(id) {
        var url = `/api/store/${id}`;
        return request(url, null, 'get');
    },
    getBookingDetail(id) {
        var url = '/api/member/detail/1304825151812951';
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
    }
};
