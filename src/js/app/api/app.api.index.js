/**
 * Created by jiosn on 16/8/3.
 */
app.api.index = {
    performanceReport: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/performanceReport',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    empPerformance: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/employeePerformance',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    queryGroupTotal: function(settings) {
        app.api.ajax({
            url: '/wechatBusinessMarketing/interveneGroupTotal/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    promotionCustomerBuy: function(settings) {
        app.api.ajax({
            url: '/wechatBusinessMarketing/promotionCustomerBuy/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    getIncomeSource: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getIncomeSource',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    },
    showPayNotes: function(settings) {
        app.api.ajax({
            url: '/subscription/list',
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    checkMerchant: function(settings) {
        app.api.ajax({
            url: '/merchantContract/maturity/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    baseNoun: function(personalNoun) {
        var baseNoun = [
            { name: '技师', value: 'worker' },
            { name: '疗程卡', value: 'treatmentCard' },
            { name: '项目', value: 'project' }
        ];
        return fomartPersonalNoun(personalNoun);

        function fomartPersonalNoun(backData) {
            var baseData = [];
            var result = {};
            baseNoun.map(function(item, index) {
                baseData.push(item);
            });
            if (!backData.length) {
                baseData.map(function(item, index) {
                    result[item.value] = item.name;
                });
                return result;
            }
            backData.map(function(item, index) {
                baseData.map(function(item1, index1) {
                    if (item.nounCode == item1.value) {
                        if (item.targetNoun) {
                            result[item.nounCode] = item.targetNoun;
                        } else {
                            result[item1.value] = item1.name;
                        }
                    }
                });
            });
            return result;
        }
    },
    getAdlistBanner: function(settings) {
        app.api.ajax({
            url: '/ads/listBanner/' + settings.data.postion + '/' + settings.data.userId,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    },
    personalNoun: function(settings) {
        app.api.ajax({
            url: '/nounConfig/list/' + settings.data,
            type: 'get',
            success: settings.success,
            error: settings.error
        });
    }
};
