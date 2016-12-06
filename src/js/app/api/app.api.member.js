app.api.member= {
    //交班详情
    getIncomeInfo: function (settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getIncomeInfo/'+settings.data.merchantId+"/"+settings.data.storeId+"/"+settings.data.employeeId+"/"+settings.data.exchangeWorkId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
};

