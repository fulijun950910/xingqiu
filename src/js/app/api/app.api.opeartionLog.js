app.api.operationLog= {
    //交班详情
    getIncomeInfo: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getIncomeInfo/'+settings.data.merchantId+"/"+settings.data.storeId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getOperatorStore: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/operator/record/merchant/',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getOperatorDetail: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/operator/record/store/',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },


};

