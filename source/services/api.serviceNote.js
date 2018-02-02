import request from './request.js';
// import Q from 'q';

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
     * 客户关怀添加
     */
    createCustomerConcern: function(data) {
        let url = '/api/wechatbusinessassists/customerConcern';
        return request(url, data, 'post');
    },
    /**
     * 修改客户关怀
     */
    updateCustomerConcern: function(data) {
        let url = '/api/wechatbusinessassists/customerConcernUpdate';
        return request(url, data, 'post');
    },
    /**
     * 删除客户关怀
     */
    deleteCustomerConcern: function(id) {
        let url = `/api/wechatbusinessassists/${id}`;
        return request(url, null, 'DELETE');
    },
    /**
     * 2.7. 编辑页面时查询某个记录或关怀详情
     */
    recordDetail: function(recordId) {
        let url = `/api/wechatbusinessassists/messageCenterDetail/${recordId}`;
        return request(url);
    },

    /**
     * 会员列表查询
     */
    queryMembers(data) {
        let url = '/api/wechatbusinessassists/members';
        return request(url, data, 'post');
    },
    /**
     * 服务记录列表查询
     */
    queryServiceRecord(data) {
        let url = '/api/wechatbusinessassists/serviceRecord';
        return request(url, data, 'post');
    },
    /**
     * 员工查询列表
     * 说明：通用接口，包含员工搜索查询
     */
    employeeList: function(data) {
        let url = '/api/wechatbusinessassists/employeeList';
        return request(url, data, 'post');
    },
    /**
     * 服务动态查询
     * 说明：根据权限，员工看自己，管理员券全部员工
     */
    messageServiceList(parameter) {
        let url = '/api/wechatbusinessassists/messageServiceList';
        return request(url, parameter, 'post');
    },
    /**
     * 已评价未评价总数
     */
    serviceRecordCount(data) {
        let url = '/api/wechatbusinessassists/serviceRecordCount';
        return request(url, data, 'post');
    },
    /**
     * 客户关怀排行
     */
    returnVisitRankingList(data) {
        let url = '/api/wechatbusinessassists/customerConcernRanking';
        return request(url, data, 'post');
    },
    /**
     * 统计数据
     */
    queryStatistics(data) {
        let url = '/api/wechatbusinessassists/statistics';
        return request(url, data, 'post');
    }
};
