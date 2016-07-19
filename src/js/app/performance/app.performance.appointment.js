/**
 * Created by wzc on 16/8/3.
 */
app.performance.appointment = {
    appointmentId: null,
    list: function () {
        //日期处理
        var date = new Date();
        date = $('#appointment-query-date').val()||date.format('yyyy-MM-dd');
        if (!$('#appointment-query-date').val())
            $('#appointment-query-date').val(date);
        var data = {
            date: date,
            type: '2',
            employeeId: app.userinfo.getEmployee().id,
        }

        

        app.api.appointment.list({
            data: data,
            success: function (result) {
                if (!result.success || !result.data || result.data.length<=0) {
                    app.tools.show('appointment-list');
                    return;
                }
                var data = {
                    datas: result.data,
                }
                var html = $('#tmpl-appointment-list').html();
                var template = tmpl(html, data);
                $('#appointment-list').html(template);
            }
        })
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