import request from './request.js';

export default {
    // 查询业绩
    getEmployee(data) {
        let url = '/api/wechatbusinessassists/orderEmployeePerformanceDetail';
        return request(url, data, 'post');
    },
    getechartsMember(data) {
        let url = '/api/wechatbusinessassists/getMemberStatistics';
        return request(url, data, 'post');
    }
};
