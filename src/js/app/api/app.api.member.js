app.api.member = {
    //新增会员信息
    getNewMembers: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getNewMembers',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    //到店会员信息
    getConsumers: function(settings) {
        app.api.ajax({
            url: '/wechatbusinessassists/getConsumers',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
};
