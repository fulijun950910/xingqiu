/**
 * Created by wzc on 16/7/8.
 */
app.api.sign = {
    //获取签到信息
    queryClockin: function (settings) {
        var url =  '/wechatbusinessassists/attendanceRecord/'+settings.data.employeeId + "/" + settings.data.firstResult+"/" + settings.data.maxResult;
        if (window.location.search) {
            url += window.location.search;
        }
        app.api.ajax({
            async: true,
            url: url,
            type: 'GET',
            success: settings.success,
            error: settings.error,
        });
    },
    //查询后台签名信息
    queryWxSignInfo:function(settings){
        app.api.ajax({
                async: true,
                url: '/wechat/signature?url='+settings.data.url,
                type: 'GET',
                success: settings.success,
                error: settings.error,
                data: settings.data
        });
    }
}