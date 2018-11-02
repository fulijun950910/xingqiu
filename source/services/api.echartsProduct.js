import request from './request.js';

export default {
    // 查询业绩
    getEchartsProduct(data) {
        let url = '/api/report/show';
        return request(url, data, 'post');
    },
    getEchartsEmployee(data) {
        let url = '/api/report/orderEmployeePerformanceList';
        return request(url, data, 'post');
    }
};
