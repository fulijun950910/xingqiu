import request from './request.js';

export default {
    queryCoupon(data) {
        let url = '/api/ticketInstance/getTicketDetail';
        return request(url, data, 'post');
    },
    verifyTicketInstance(data) {
        let url = '/api/ticketInstance/verifyTicketInstance';
        return request(url, data, 'post');
    }
};
