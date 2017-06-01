$(function() {

    var router = new Router({
        container: '#container',
        enterTimeout: 250,
        leaveTimeout: 250
    });

    var tpl_checkTitcket = {
        url: '/checkTicket',
        render: function() {
            return $('#tpl_checkTitcket').html();
        },
        bind: function() {
            // 跳转及权限判断
            if (employee && employee.merchant) {
                var ticketNo=app.getParameter('ticketNo');
                if(employee.merchant.functionVersion == 4) {
                    location.href = this.verifyCouponVersion4Location + ticketNo;
                } else {
                    app.checkTicket.checkTicket();
                    if(ticketNo){
                        this.getTicketDetailInfo(ticketNo);
                    }
                }
            } else {
                location.href = "/userinfo.html#/user_login";
            }
        }
    };
    var tpl_verifyTicketInstance = {
        url: '/verifyTicketInstance',
        render: function() {
            return $('#tpl_verifyTicketInstance').html();
        },
        bind: function() {
            app.checkTicket.init();
        }
    };
    router.push(tpl_checkTitcket).push(tpl_verifyTicketInstance).init();
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function() {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function() {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});
