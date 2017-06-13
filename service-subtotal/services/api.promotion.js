import request from 'services/request.js';

export default {
    // 商户短信信息
    updatePromotion: data => {
        var url = '/api/promotions/applypromotion';
        var method = 'post';
        if (data.id) {
            url = '/api/promotions/update';
            method = 'put';
        }
        return request(url, data, method);
    },
    getPromotions: data => {
        var url = '/api/promotions/listmypromotion';
        return request(url, data, 'post');
    },
    // 活动模板列表
    promotiontemplates: merchantId => {
        var url = '/api/promotiontemplates/listpromotiontemplate';
        return request(url, { merchantId: merchantId }, 'post');
    },
    // 活动详情
    getPromotionView: promotionId => {
        var url = `/api/promotions/view/${promotionId}`;
        return request(url);
    },
    updatePromotionStatus: (promotionId, status) => {
        var url = `/api/promotions/audit/${promotionId}/${status}`;
        return request(url);
    },
    getTickets: data => {
        var tempData = {
            query: [{
                field: 'merchantId',
                value: data.merchantId
            }],
            page: data.page,
            size: data.size
        };
        if (data.keyword) {
            tempData.query.push({
                field: 'keyword',
                value: data.keyword,
                operation: 'like'
            });
        }
        var url = '/api/ticketDefine/searchTicketDefines';
        return request(url, tempData, 'post');
    },
    deletePromotion: promotionId => {
        var url = `/api/promotions/delete/${promotionId}`;
        return request(url, null, 'post');
    },
    recordItem: data => {
        var url = '/api/promotions/myrecorditem';
        return request(url, data, 'post');
    },
    recordTicketList: data => {
        var url = '/api/promotions/myrecordticketlist';
        return request(url, data, 'post');
    }
};
