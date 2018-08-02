import request from './request.js';

export default {
    // 我的客户资源
    myCustomers(params) {
        var url = '/api/promotionCustomers/search';
        return request(url, params, 'POST');
    },
    // 营销客户统计
    customerCount(params) {
        var url = '/api/promotionCustomers/customerCount';
        return request(url);
    },
    // 标签查询
    customerTags(params) {
        var url = '/api/customerTags';
        return request(url);
    },
    // 添加标签
    customerAddTag(params) {
        var url = '/api/customerTags';
        return request(url, params, 'POST');
    },
    // 分组查询
    customerGroups(params) {
        var url = '/api/promotionCustomerGroups';
        return request(url);
    },
    // 客户打标签
    customerAddTagWithCustomer(params) {
        var url = '/api/promotionCustomerTags';
        return request(url, params, 'POST');
    },
    // 客户删除标签
    customerRemoveTag(tagId) {
        var url = '/api/promotionCustomerTags/' + tagId;
        return request(url, null, 'DELETE');
    },
    // 批量删除客户标签
    customerBatchRemoveTag(tagIds) {
        var url = '/api/promotionCustomerTags/batchDelete';
        return request(url, tagIds, 'DELETE');
    },
    // 客户批量打标签
    customerAddTags(params) {
        var url = '/api/promotionCustomerTags/batchSave';
        return request(url, params, 'POST');
    },
    // 客户详情
    customerInfo(customerId) {
        var url = '/api/promotionCustomers/' + customerId;
        return request(url);
    },
    // 添加客户跟进记录
    customerAddNote(params) {
        var url = '/api/promotionCustomerNotes';
        return request(url, params, 'POST');
    },
    // 删除客户跟进记录
    customerRemoveNote(noteId) {
        var url = '/api/promotionCustomerNotes/' + noteId;
        return request(url, null, 'DELETE');
    },
    // 搜索券
    customerSearchTickets(params) {
        var url = '/api/ticketDefine/searchTicketDefines';
        return request(url, params, 'POST');
    },
    // 短信余量
    customerSmsCount(merchantId) {
        var url = '/api/smsmerchants/find/' + merchantId;
        return request(url);
    },
    // 发短信
    customerSendMessage(params) {
        var url = '/api/messageSendRecords';
        return request(url, params, 'POST');
    },
    // 发券
    customerSendTicket(params) {
        var url = '/api/ticketSendRecords';
        return request(url, params, 'POST');
    },
    // 搜索活动
    customerSearchPromotions(params) {
        var url = '/api/promotions/listmypromotion';
        return request(url, params, 'POST');
    },
    // 发活动
    customerSendPromotion(params) {
        var url = '/api/promotionSendRecords';
        return request(url, params, 'POST');
    },
    // 添加分组
    customerAddGroup(params) {
        var url = '/api/promotionCustomerGroups';
        return request(url, params, 'POST');
    },
    // 批量保存客户标签
    customerTagsBatchSave(params) {
        var url = '/api/promotionCustomerTags/batchSave';
        return request(url, params, 'POST');
    },
    // 更新客户信息
    customerUpdate(customerId, params) {
        var url = '/api/promotionCustomers/' + customerId;
        return request(url, params, 'PATCH');
    },
    // 批量给客户分组
    batchMoveCustomer(groupId, customerIdList) {
        var url = '/api/promotionCustomers/batchMove';
        return request(url, {
            groupId,
            customerIdList
        }, 'PATCH');
    }
};
