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
    getStoreInfo(data) {
        var url = '/api/store/1203373529866090';
        return request(url, data, 'get');
    },
    getBookingDetail() {
        var url = '/api/member/detail/1304825151812951';
        return request(url, null, 'get');
    }
};
