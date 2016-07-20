/**
 * Created by wzc on 16/7/8.
 */
app.api.sign = {
    //获取签到信息
    queryClockin: function (settings) {
        app.api.ajax({
            async: true,
            url: '/wechatbusinessassists/attendanceRecord/'+settings.data.employeeId,
            type: 'GET',
            success: settings.success,
            error: settings.error,
        });
    },
    //查询后台签名信息
    queryWxSignInfo:function(settings){
        app.api.ajax({
            async: true,
            url: '/wechat/signature',
            type: 'POST',
            success: settings.success,
            error: settings.error,
            data: settings.data
        });
    }
}