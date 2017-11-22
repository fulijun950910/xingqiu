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
    }
};
