/**
 * Created by wzc on 16/8/3.
 */
app.performance.appointment = {
    appointmentId: null,
    list: function () {
        var screenHeight=window.screen.height;
        $('body').css('height',screenHeight+'px');
        //日期处理
        var date = new Date();
        date = $('#appointment-query-date').val()||date.format('yyyy-MM-dd');
        if (!$('#appointment-query-date').val())
            $('#appointment-query-date').val(date);
        //获取数据
        app.performance.appointment.queryAppointmentForDate(date);   
    },
    queryAppointmentForDate:function(date){
        var data = {
            date: date,
            type: 2,//1.门店，2.员工
            storeIds: '',//门店ids,分隔
            employeeId: app.userinfo.getEmployee().id,
        }
        //获取当前身份
        var urole = app.performance.userrole_init();
        if(urole == 2){
            //员工,查询当前门店预约订单
            data.type = 2;
            app.performance.appointment.queryAppointmentList(data)
            .then(function(result){
                console.info(result);
            },function(error){
                //异常
            });
        }else if(urole == 1){
            //管理者,查询选择门店预约订单
            data.type=1;
            data.storeIds = app.performance.currentStoreid;
            app.performance.appointment.queryAppointmentList(data)
            .then(function(res){
                console.info(res);
            },function(error){
                //异常
            });
        }
    },
    queryAppointmentList:function(data){
        return new Promise(function(resolve,reject){
            app.startLoading();
            app.api.appointment.list({
                data: data,
                success: function (result) {
                    app.endLoading();
                    if (!result.success || !result.data || result.data.length<=0) {
                        app.tools.show('appointment-list');
                        return false;
                    }else{
                        var html = $('#tmpl-appointment-list').html();
                        var template = tmpl(html, result);
                        $('#scroller').html(template);
                        myScroll = new IScroll('#wrapper', {probeType: 3, mouseWheel: true, tap: true, click: true});
                        myScroll.refresh();
                        resolve(true);
                    }
                },
                error:function(error){
                    app.endLoading();
                    console.info(error);
                    reject('服务器开小差啦~');
                }
            });
        });
    },
    detail: function () {
        var data = {
            appointmentId: app.performance.appointment.appointmentId
        }
        app.api.appointment.find({
            data: data,
            success: function (result) {
                var html = $('#tmpl-appointment-detail').html();
                var template = tmpl(html, result.data);
                $('#appointment_detail').html(template);
            }
        })
    },
    chooseBookingAppointmentId: function (appointmentId) {
        app.performance.appointment.appointmentId = appointmentId;
        location.href="#/booking-order-detail";
    },
    leftDay: function (dom) {
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.appointment.list();
    },
    nextDay: function (dom) {
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() + 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.appointment.list();
    }
}