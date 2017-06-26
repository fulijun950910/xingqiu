import request from './request.js';

export default {
    /**
     * 服务小计添加
     * 说明：服务小计添加接口；包含会员标签管理，打标签功能；包含日期提醒功能，即定时提醒推送功能；
     */
    createServiceNote: function(data) {
        let url = '/api/wechatbusinessassists/serviceNote';
        return request(url, data, 'post');
    },
    /**
     * 修改小计添加
     * 说明：服务小计修改接口；修改会员标签，标签热度变更；包含日期提醒功能，即定时提醒推送功能；（需考虑修改提醒时是否变更提醒条件，如果已执行过的提醒任务的状态处理）
     */
    updateServiceNote: function(data) {
        let url = '/api/wechatbusinessassists/serviceNoteUpdate';
        return request(url, data, 'post');
    },
    /**
     * 员工查询列表
     * 说明：通用接口，包含员工搜索查询
     */
    employeeList: function(data) {
        let url = '/api/wechatbusinessassists/serviceNoteUpdate';
        return request(url, data, 'post');
    }
};
