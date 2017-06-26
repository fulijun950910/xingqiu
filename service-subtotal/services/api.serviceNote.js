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
    },
    /**
     * 服务动态查询
     * 说明：根据权限，员工看自己，管理员券全部员工
     */
    messageServiceList(parameter) {
        let url = 'api/messageServiceList';
        return request(url, parameter, 'post');
    },
    /**
     *缩略图
     *width 缩略图最大宽度
     *height 缩略图最大高度
     */
    getThumbnails(id, width, height) {
        let url = 'api/image/' + id + '/' + width + '/' + height;
        return request(url, 'get');
    },
    /**
     *压缩图
     *quality 新图的图片质量。取值范围为1-100，如75
     */
    getCompression(id, quality) {
        let url = 'api/image/' + id + '/' + quality;
        return request(url, 'get');
    }
};
