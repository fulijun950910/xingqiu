app.api.checkTicket = {
    //验券
    verifyTicketInstance: function(settings) {
        app.api.ajax({
            url: '/ticketInstance/verifyTicketInstance',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    //获取券信息
    getTicketDetail: function(settings) {
        app.api.ajax({
            url: '/ticketInstance/getTicketDetail',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    }
}
