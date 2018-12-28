import request from './request.js';

export default {
    // 获取考勤处理条数统计
    getcount() {
        let url = `/api/EmployeeAttendanceHandles/count`;
        return request(url, 'get');
    }
};
