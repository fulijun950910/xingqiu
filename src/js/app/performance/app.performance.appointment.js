/**
 * Created by wzc on 16/8/3.
 */
app.performance.appointment = {
    appointmentId: null,
    list: function () {
        var data = {
            type: '2',
            employeeId: app.userinfo.getEmployee().id,
        }
        app.api.appointment.list({
            data: data,
            success: function (result) {
                var data = {
                    datas: result.data,
                }
                var html = $('#tmpl-appointment-list').html();
                var template = tmpl(html, data);
                $('#appointment_list').html(template);
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
    }
}