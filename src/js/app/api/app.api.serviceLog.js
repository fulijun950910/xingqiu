app.api.serviceLog= {
    //小计列表
    getServiceList: function (settings) {
        app.api.ajax({
            url: '/photo/getMembersPhoto/'+settings.data.merchantId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    getMemberServiceList: function (settings) {
        app.api.ajax({
            url: '/photo/list/'+settings.data.merchantId+"/"+settings.data.memberId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    searchMember: function (settings) {
        app.api.ajax({
            url: '/photo/getMembers',
            type: 'post',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    searchMemberDetail: function (settings) {
        app.api.ajax({
            url: '/member/'+settings.data.memberId,
            type: 'get',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },


};

