import request from './request.js';

export default {
    queryCoupon(data) {
        let url = '/api/ticketInstance/getTicketDetail';
        return request(url, data, 'post');
    },
    couponDelay(id) {
        var url = '/api/ticketInstance/delay' + '/' + id + '/forever';
        return request(url, null, 'put');
    },
    verifyTicketInstance(data) {
        let url = '/api/ticketInstance/verifyTicketInstance';
        return request(url, data, 'post');
    }
};
